import React from 'react'
import { Stack } from '@mui/material'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { formatThousands } from '@/utils/formatters.utils'
import { pack, hierarchy } from 'd3-hierarchy'
import GovItLink from './GovItLink'
import { EServicesByMacroCategoriesMetric } from '@/models/numbers_new.models'
import * as echarts from 'echarts'
import sortBy from 'lodash/sortBy'
import { MACROCATEGORIES_COLORS } from '@/configs/constants.config'

const PACK_SIZE = 300

const EServicesByMacroCategories = ({ data }: { data: EServicesByMacroCategoriesMetric }) => {
  const filteredData = data.filter((d) => d.count > 0)

  const tableData: TableData = React.useMemo(() => {
    const head = ["Categoria d'ente", 'E-service pubblicati']
    const sortedData = [...sortBy(filteredData, 'count')].reverse()
    const body = sortedData.map(({ name, count }) => [name, formatThousands(count).toString()])
    return { head, body }
  }, [filteredData])

  type EchartsDatum = [string, string, number, number, number, number]

  const bubbles: Array<EchartsDatum> = React.useMemo(() => {
    const packing = pack<{ children: EServicesByMacroCategoriesMetric }>().size([
      PACK_SIZE,
      PACK_SIZE,
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
    legend: {
      icon: 'circle',
      show: true,
      data: bubbles.map((d) => ({
        name: d[0]?.toString() as string,
        itemStyle: {
          color: MACROCATEGORIES_COLORS[Number(d[1]) as keyof typeof MACROCATEGORIES_COLORS],
        },
      })),
      bottom: 0,
    },
    tooltip: {
      formatter: (n) => {
        const macroCategoryName = (n as unknown as { data: EchartsDatum }).data[0]
        const count = (n as unknown as { data: EchartsDatum }).data[4]
        return `${macroCategoryName} <strong>${formatThousands(count)}</strong>`
      },
    },
    series: [
      ...bubbles.map<echarts.CustomSeriesOption>((d) => {
        return {
          coordinateSystem: 'none',
          type: 'custom',
          name: d[0],
          renderItem: (_, api) => {
            const id = api.value(1) as keyof typeof MACROCATEGORIES_COLORS
            const fill = MACROCATEGORIES_COLORS[id]
            const cx = api.value(2) as number
            const cy = api.value(3) as number
            const r = api.value(4) as number
            const value = api.value(5) as number
            return {
              type: 'circle',
              shape: { cx, cy, r },
              style: {
                fill,
                textPosition: 'inside',
                textFill: '#000000',
                text: formatThousands(value),
              },
            }
          },
          label: {
            show: true,
          },
          dimensions: ['name, x, y, r, value'],
          data: [d],
        }
      }),
    ],
  }

  return (
    <React.Fragment>
      <ChartAndTableTabs chartOptions={chartOptions} tableData={tableData} chartHeight={480} />
      <Stack direction="row" justifyContent="space-between">
        <GovItLink />
      </Stack>
    </React.Fragment>
  )
}

export default EServicesByMacroCategories
