// @ts-nocheck
import React from 'react'
import { Grid, Stack } from '@mui/material'
import { ChartAndTableTabs } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { formatThousands } from '@/utils/formatters.utils'
import { pack, hierarchy } from 'd3-hierarchy'
import GovItLink from './GovItLink'
import { DataCard } from '../numbers/DataCard'

const PACK_SIZE = 300

const PublishedEServices = ({ mockData }) => {
  const tableData: TableData = React.useMemo(() => {
    const head = ["Categoria d'ente", 'E-service pubblicati']
    const body = mockData.macroCategoriesPublishedEServicesMetric.map((x) => [
      x.name,
      formatThousands(x.publishedEServicesCount).toString(),
    ])

    return { head, body }
  }, [mockData.macroCategoriesPublishedEServicesMetric])

  const bubbles = React.useMemo(() => {
    const packing = pack().size([PACK_SIZE, PACK_SIZE])
    const computed = packing(
      hierarchy({ children: mockData.macroCategoriesPublishedEServicesMetric }).sum(
        (d) => d.publishedEServicesCount
      )
    )
    const leaves = computed.leaves()

    return leaves.map((l) => {
      const { x, y, r, value, data } = l
      const { name } = data
      return [name, x, y, r, value]
    })
  }, [mockData.macroCategoriesPublishedEServicesMetric])

  const chartOptions = {
    // width: PACK_SIZE,
    // height: PACK_SIZE,
    legend: {
      show: true,
      data: bubbles.map((d) => d[0]),
      bottom: 0,
    },
    tooltip: {
      formatter: (d) => `${d.data[0]} <strong>${d.data[4]}</strong>`,
    },
    series: [
      ...bubbles.map((d) => {
        return {
          coordinateSystem: 'none',
          type: 'custom',
          name: d[0],
          renderItem: (_, api) => {
            console.log(api.style())
            const cx = api.value(1)
            const cy = api.value(2)
            const r = api.value(3)
            const value = api.value(4)
            return {
              type: 'circle',
              shape: { cx, cy, r },
              style: {
                fill: api.style().fill,
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
    <Grid spacing={3} container>
      <Grid item xs={12} lg={4}>
        <TotalEServicesCard mockData={mockData} />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ChartAndTableWrapper
          title="Categorie di erogatori"
          description="Numeri di e-service per categoria di ente erogatore"
        >
          <ChartAndTableTabs chartOptions={chartOptions} tableData={tableData} chartHeight={480} />
          <Stack direction="row" justifyContent="space-between">
            <GovItLink />
          </Stack>
        </ChartAndTableWrapper>
      </Grid>
    </Grid>
  )
}

const TotalEServicesCard = ({ mockData }) => {
  const totalCount = mockData.publishedEServicesMetric.publishedEServicesCount
  const lastMonthCount = mockData.publishedEServicesMetric.lastMonthPublishedEServicesCount
  const variationPercentage = mockData.publishedEServicesMetric.variation

  return (
    <DataCard
      label="E-service pubblicati"
      value={formatThousands(totalCount)}
      variation={{
        value: formatThousands(lastMonthCount),
        percentage: variationPercentage,
        label: 'rispetto al mese precedente',
      }}
    />
  )
}

export default PublishedEServices
