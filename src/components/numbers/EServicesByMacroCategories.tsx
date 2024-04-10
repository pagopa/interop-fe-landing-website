import React from 'react'
import { Typography, useMediaQuery, useTheme } from '@mui/material'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
import { formatThousands } from '@/utils/formatters.utils'
// import GovItLink from './GovItLink'
import { EServicesByMacroCategoriesMetric } from '@/models/numbers.models'
import * as echarts from 'echarts'
import sortBy from 'lodash/sortBy'
import {
  MACROCATEGORIES,
  MACROCATEGORIES_COLORS,
  MACROCATEGORIES_COLORS_MAP,
} from '@/configs/constants.config'
import { MacrocategoriesLink } from './MacrocategoriesLink'
import maxBy from 'lodash/maxBy'
import minBy from 'lodash/minBy'
import { scale } from '@/utils/common.utils'

// describe number of elements on x axis
const XAXIS_ELEMENT = 3
const EServicesByMacroCategories = ({ data }: { data: EServicesByMacroCategoriesMetric }) => {
  const fontFamily = useTheme().typography.fontFamily
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))

  const filteredData = data.filter((d) => d.count > 0)

  // describe number of elements on y axis based on number of elements
  const YAXIS_ELEMENT = React.useMemo(() => {
    return Math.ceil(filteredData.length / XAXIS_ELEMENT)
  }, [filteredData])

  const tableData: TableData = React.useMemo(() => {
    const head = ["Categoria d'ente", 'E-service pubblicati']
    const sortedData = [...sortBy(filteredData, 'count')].reverse()
    const body = sortedData.map(({ name, count }) => [name, formatThousands(count).toString()])
    return { head, body }
  }, [filteredData])

  type EchartsDatum = [number, number, number, string, string]

  const bubblesData = React.useMemo(() => {
    const result: Array<{
      value: EchartsDatum
      label: { show: boolean; formatter: () => number }
      itemStyle: { color: string }
    }> = []

    let xIterator = 0
    let rowIterator = YAXIS_ELEMENT - 1

    const maxDataSize = maxBy(filteredData, 'count')?.count
    const minDataSize = minBy(filteredData, 'count')?.count

    filteredData
      .sort((a, b) => b.count - a.count)
      .forEach((item) => {
        result.push({
          value: [xIterator, rowIterator, item.count, item.name, item.id],
          label: {
            show: true,
            formatter: () => item.count,
          },
          itemStyle: {
            color: MACROCATEGORIES_COLORS_MAP.get(MACROCATEGORIES[item.id as unknown as number])!,
          },
        })
        // If elementPerRowInterator is equal to XAXIS_ELEMENT, go to next row
        if (xIterator === XAXIS_ELEMENT - 1) {
          xIterator = 0
          // Row count start's from 0, so we need to decrease the rowIterator, in order to go to next row
          rowIterator--
        } else xIterator++
      })

    const r = result.map((it) => {
      return {
        name: it.value[3],
        type: 'scatter',
        symbol: 'circle',
        symbolSize: function (val: EchartsDatum) {
          const value = val[2]

          const outMin = isMobile ? 30 : 20
          const outMax = isMobile ? 80 : 200
          return scale(value, minDataSize!, maxDataSize!, outMin, outMax)
        },

        animationDelay: function (idx: number) {
          return idx * 5
        },

        data: [it],
      }
    })

    return r
  }, [filteredData])

  const chartOptions: echarts.EChartsOption = {
    textStyle: {
      fontFamily: fontFamily,
    },
    grid: {
      top: 40,
      left: isMobile ? 50 : 120,
      right: isMobile ? 50 : 120,
    },

    legend: {
      icon: 'circle',
      show: true,
      data: bubblesData.map((d) => {
        return {
          name: d.name,
          itemStyle: {
            color: MACROCATEGORIES_COLORS_MAP.get(d.name),
          },
        }
      }),
      left: 0,
      bottom: 10,
      padding: 0,
      itemWidth: 15,
      selectedMode: false,
      itemHeight: 12,
    },
    tooltip: {
      padding: 0,
      borderRadius: 0,
      borderWidth: 0,
      borderColor: 'transparent',
      shadowColor: 'transparent',
      backgroundColor: 'transparent',
      formatter: (n) => {
        const item = n as unknown as { value: EchartsDatum }
        const macroCategoryName = item.value[3]
        const color =
          MACROCATEGORIES_COLORS[Number(item.value[4]) as keyof typeof MACROCATEGORIES_COLORS]
        const count = item.value[2]
        return `<div style="min-width: 120px; box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px; background: white; border: 1px solid ${color}; padding: 10px; border-radius: 8px;">
          <p style="margin: 0;"> <strong>${macroCategoryName} </strong></p>
          <p style="margin: 0; display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
            <span style="display: inline-block; background-color: ${color}; width: 10px; height: 10px; border-radius: 100%;"></span>
           ${formatThousands(count)} e-service
          </p>
        </div>`
      },
    },

    series: bubblesData as echarts.SeriesOption[],
    xAxis: {
      show: false,
      type: 'category',
      data: Array.from(Array(XAXIS_ELEMENT).keys()),
      boundaryGap: false,
    },
    yAxis: {
      show: false,
      type: 'category',
      data: Array.from(Array(YAXIS_ELEMENT).keys()),
    },
  }

  return (
    <React.Fragment>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={600}
        info={Info}
        childrenPosition="bottom"
        ariaLabel={`Grafico che mostra il numero di e-service pubblicati per ogni macrocategoria di ente. ${tableData.body
          .map((i) => `${i[0]}: ${i[1]} e-service`)
          .join('; ')}`}
      />

      {/* <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <GovItLink metricName="entiErogatoriDiEService" />
      </Stack> */}
    </React.Fragment>
  )
}

const Info = (
  <React.Fragment>
    <Typography color="text.secondary" variant="body2">
      Il totale per categoria è calcolato aggregando il numero di e-service pubblicati.
    </Typography>
    <Typography color="text.secondary" variant="body2">
      Le categorie sono riportate nel <MacrocategoriesLink />.
    </Typography>
  </React.Fragment>
)

export default EServicesByMacroCategories
