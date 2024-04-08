import React, { useState } from 'react'
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
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

const EServicesByMacroCategories = ({ data }: { data: EServicesByMacroCategoriesMetric }) => {
  const fontFamily = useTheme().typography.fontFamily
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))

  const filteredData = data.filter((d) => d.count > 0)
  const [selectedCategoriesData, setSelectedCategoriesData] = useState(filteredData)

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

    let count = 0
    let row = 2

    const maxDataSize = maxBy(filteredData, 'count')?.count
    const minDataSize = minBy(filteredData, 'count')?.count

    filteredData
      .sort((a, b) => b.count - a.count)
      .map((item, index) => {
        result.push({
          value: [count, row, item.count, item.name, item.id],
          label: {
            show: true,
            formatter: () => item.count,
          },
          itemStyle: {
            color: MACROCATEGORIES_COLORS_MAP.get(MACROCATEGORIES[item.id as any])!,
          },
        })
        if (count === 3) {
          count = 0
          row--
        } else count++

        return [index, 0, item.count]
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
          return scale(value, minDataSize, maxDataSize, outMin, outMax)
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
      top: 100,
      left: isMobile ? 40 : 100,
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
      top: 30,
      padding: 0,
      left: 0,
      bottom: 0,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 8,
      itemStyle: {
        borderWidth: 0,
      },
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

    series: bubblesData,
    xAxis: {
      show: false,
      type: 'category',
      data: ['1x', '2x', '3x', '4x'],
      boundaryGap: false,
    },
    yAxis: {
      show: false,
      type: 'category',
      data: ['1y', '2y', '3y'],
    },
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLegendChangeCallback = (params: any) => {
    const data = filteredData.filter((item) => params.selected[item.name] == true)
    setSelectedCategoriesData(data)
  }

  return (
    <React.Fragment>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={600}
        info={Info}
        onLegendChangeCallback={onLegendChangeCallback}
        childrenPosition="bottom"
        ariaLabel={`Grafico che mostra il numero di e-service pubblicati per ogni macrocategoria di ente. ${tableData.body
          .map((i) => `${i[0]}: ${i[1]} e-service`)
          .join('; ')}`}
      >
        <Stack direction="column" sx={{ mt: 3 }}>
          <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 600 }}>
            Dimensione = n° di e-service
          </Typography>
          <Stack direction="row">
            <LegendSVG />
            <Stack direction="column" justifyContent="space-between">
              <Typography variant="caption">
                {maxBy(selectedCategoriesData, 'count')?.count}
              </Typography>
              <Typography variant="caption">
                {minBy(selectedCategoriesData, 'count')?.count}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </ChartAndTableTabs>

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

const LegendSVG = () => {
  return (
    <svg width="58" height="49" viewBox="0 0 60 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24.3198" r="23.5" stroke="#D9D9D9" />
      <circle cx="24.5" cy="40.8198" r="7" stroke="#D9D9D9" />
    </svg>
  )
}

export default EServicesByMacroCategories
