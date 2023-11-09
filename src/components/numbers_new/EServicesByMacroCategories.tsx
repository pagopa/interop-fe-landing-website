import React from 'react'
import { Stack } from '@mui/material'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { formatThousands } from '@/utils/formatters.utils'
import { pack, hierarchy } from 'd3-hierarchy'
import GovItLink from './GovItLink'
import { EServicesByMacroCategoriesMetric } from '@/models/numbers_new.models'
import * as echarts from 'echarts'

const PACK_SIZE = 300

const EServicesByMacroCategories = ({ data }: { data: EServicesByMacroCategoriesMetric }) => {
  const tableData: TableData = React.useMemo(() => {
    const head = ["Categoria d'ente", 'E-service pubblicati']
    const body = data.map(({ name, count }) => [name, formatThousands(count).toString()])
    return { head, body }
  }, [data])

  type EchartsDatum = [string, number, number, number, number]

  const bubbles: Array<EchartsDatum> = React.useMemo(() => {
    const packing = pack<{ children: EServicesByMacroCategoriesMetric }>().size([
      PACK_SIZE,
      PACK_SIZE,
    ])
    const children = hierarchy({ children: data })
    const computed = packing(
      children.sum((d) => (d as unknown as EServicesByMacroCategoriesMetric[number]).count)
    )
    const leaves = computed.leaves()

    return leaves.map((l) => {
      const { x, y, r, value, data } = l
      const { name } = data as unknown as EServicesByMacroCategoriesMetric[number]
      return [name, x, y, r, value as number]
    })
  }, [data])

  const chartOptions: echarts.EChartsOption = {
    legend: {
      show: true,
      data: bubbles.map((d) => d[0]?.toString() as string),
      bottom: 0,
    },
    tooltip: {
      formatter: (n) =>
        `${(n as unknown as { data: EchartsDatum }).data[0]} <strong>${
          (n as unknown as { data: EchartsDatum }).data[4]
        }</strong>`,
    },
    series: [
      ...bubbles.map<echarts.CustomSeriesOption>((d) => {
        return {
          coordinateSystem: 'none',
          type: 'custom',
          name: d[0],
          renderItem: (_, api) => {
            const cx = api.value(1) as number
            const cy = api.value(2) as number
            const r = api.value(3) as number
            const value = api.value(4)
            return {
              type: 'circle',
              shape: { cx, cy, r },
              style: {
                fill: '#000000',
                textPosition: 'inside',
                textFill: '#000000',
                text: value,
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
