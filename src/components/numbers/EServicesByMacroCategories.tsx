import React, { useState } from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
import { formatThousands } from '@/utils/formatters.utils'
import { pack, hierarchy } from 'd3-hierarchy'
import GovItLink from './GovItLink'
import { EServicesByMacroCategoriesMetric } from '@/models/numbers.models'
import * as echarts from 'echarts'
import sortBy from 'lodash/sortBy'
import { MACROCATEGORIES_COLORS } from '@/configs/constants.config'
import { MacrocategoriesLink } from './MacrocategoriesLink'
import maxBy from 'lodash/maxBy'
import minBy from 'lodash/minBy'

const PACK_SIZE = 340

const EServicesByMacroCategories = ({ data }: { data: EServicesByMacroCategoriesMetric }) => {
  const fontFamily = useTheme().typography.fontFamily

  const filteredData = data.filter((d) => d.count > 0)
  const [selectedCategoriesData, setSelectedCategoriesData] = useState(filteredData)

  const tableData: TableData = React.useMemo(() => {
    const head = ["Categoria d'ente", 'E-service pubblicati']
    const sortedData = [...sortBy(filteredData, 'count')].reverse()
    const body = sortedData.map(({ name, count }) => [name, formatThousands(count).toString()])
    return { head, body }
  }, [filteredData])

  type EchartsDatum = [string, string, number, number, number, number]

  const bubbles: Array<EchartsDatum> = React.useMemo(() => {
    const packing = pack<{ children: EServicesByMacroCategoriesMetric }>().size([
      PACK_SIZE - 60,
      PACK_SIZE - 60,
    ])
    const children = hierarchy({ children: filteredData })
    const computed = packing(
      children.sum((d) => (d as unknown as EServicesByMacroCategoriesMetric[number]).count)
    )
    const leaves = computed.leaves()

    return leaves.map((l) => {
      const { x, y, r, value, data } = l
      const { name, id } = data as unknown as EServicesByMacroCategoriesMetric[number]
      return [name, id, x, y, r, value as number]
    })
  }, [filteredData])

  const chartOptions: echarts.EChartsOption = {
    textStyle: {
      fontFamily: fontFamily,
    },
    grid: {
      top: 0,
    },
    legend: {
      icon: 'circle',
      show: true,
      data: bubbles.map((d) => ({
        name: d[0]?.toString() as string,
        itemStyle: {
          color: MACROCATEGORIES_COLORS[Number(d[1]) as keyof typeof MACROCATEGORIES_COLORS],
        },
      })),
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
        const item = n as unknown as { data: EchartsDatum }
        const macroCategoryName = item.data[0]
        const color =
          MACROCATEGORIES_COLORS[Number(item.data[1]) as keyof typeof MACROCATEGORIES_COLORS]
        const count = (n as unknown as { data: EchartsDatum }).data[5]
        return `<div style="min-width: 120px; box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px; background: white; border: 1px solid ${color}; padding: 10px; border-radius: 8px;">
          <p style="margin: 0;"> <strong>${macroCategoryName} </strong></p>
          <p style="margin: 0; display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
            <span style="display: inline-block; background-color: ${color}; width: 10px; height: 10px; border-radius: 100%;"></span>
           ${formatThousands(count)} e-service
          </p>
        </div>`
      },
    },
    series: [
      ...bubbles.map<echarts.CustomSeriesOption>((d) => {
        return {
          coordinateSystem: 'none',
          type: 'custom',
          name: d[0],

          renderItem: (_, api) => {
            const width = api.getWidth()
            const id = api.value(1) as keyof typeof MACROCATEGORIES_COLORS
            const fill = MACROCATEGORIES_COLORS[id]
            const xPos = api.value(2) as number
            const cy = api.value(3) as number
            const r = api.value(4) as number
            const value = api.value(5) as number
            const leftCenterPadding = 25
            // Center the chart items
            const cx = xPos + leftCenterPadding + width / 2 - PACK_SIZE / 2

            return {
              type: 'circle',
              shape: { cx, cy, r },
              style: {
                fill,

                color: fill,
                borderColor: fill,
                textPosition: 'inside',
                textFill: '#F6F6F6',
                text: value > 20 ? formatThousands(value) : '',
              },
            }
          },
          dimensions: ['name, x, y, r, value'],
          data: [d],
        }
      }),
    ],
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
        chartHeight={PACK_SIZE}
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
                {minBy(selectedCategoriesData, 'count')?.count}
              </Typography>
              <Typography variant="caption">
                {maxBy(selectedCategoriesData, 'count')?.count}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </ChartAndTableTabs>

      <Stack direction="row" justifyContent="space-between">
        <GovItLink metricName="entiErogatoriDiEService" />
      </Stack>
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
