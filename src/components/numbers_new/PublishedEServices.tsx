// @ts-nocheck
import React from 'react'
import { linearScale } from '@/utils/common.utils'
import { Grid, Stack } from '@mui/material'
import { DataCard } from '@/components/numbers/DataCard'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import * as ECharts from 'echarts'
import { formatThousands } from '@/utils/formatters.utils'
import GovItLink from './GovItLink'

const PublishedEServices = ({ mockData }) => {
  console.log(mockData)
  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const filteredData = mockData.macroCategoriesPublishedEServicesMetric.filter(
      (x) => x.publishedEServicesCount > 0
    )
    const max = Math.max(...filteredData.map((x) => x.publishedEServicesCount))
    const scale = linearScale([0, max], [20, 100])

    return {
      tooltip: {},
      legend: {
        show: true,
        bottom: 0,
        icon: 'circle',
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          animation: false,
          data: filteredData.map((x) => ({
            category: x.name,
            name: x.name,
            symbolSize: scale(x.publishedEServicesCount) / 0.5,
            value: formatThousands(x.publishedEServicesCount),
          })),
          categories: filteredData.map(({ name }) => ({ name })),
          roam: false,
          label: {
            show: true,
            formatter: ({ value }) => formatThousands(value),
          },
          emphasis: {
            scale: false,
          },
          force: {
            repulsion: max / 10,
            layoutAnimation: false,
          },
        },
      ],
    }
  }, [])

  const tableData: TableData = React.useMemo(() => {
    const head = ["Categoria d'ente", 'E-service pubblicati']
    const body = mockData.macroCategoriesPublishedEServicesMetric.map((x) => [
      x.name,
      formatThousands(x.publishedEServicesCount).toString(),
    ])

    return { head, body }
  }, [mockData.macroCategoriesPublishedEServicesMetric])

  const totalCount = mockData.publishedEServicesMetric.publishedEServicesCount
  const lastMonthCount = mockData.publishedEServicesMetric.lastMonthPublishedEServicesCount
  const variationPercentage = mockData.publishedEServicesMetric.variation

  return (
    <Grid spacing={3} container>
      <Grid item xs={12} lg={4}>
        <DataCard
          label="E-service pubblicati"
          value={formatThousands(totalCount)}
          variation={{
            value: formatThousands(lastMonthCount),
            percentage: variationPercentage,
            label: 'rispetto al mese precedente',
          }}
        />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ChartAndTableWrapper
          title="Categorie di erogatori"
          description="Numeri di e-service per categoria di ente erogatore"
        >
          <ChartAndTableTabs chartOptions={chartOptions} tableData={tableData} chartHeight={280} />
          <Stack direction="row" justifyContent="space-between">
            <GovItLink />
          </Stack>
        </ChartAndTableWrapper>
      </Grid>
    </Grid>
  )
}

export default PublishedEServices
