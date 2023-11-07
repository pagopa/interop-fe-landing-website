// @ts-nocheck
import React from 'react'
import { Box, Link, Stack, Typography } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import uniq from 'lodash/uniq'
import { IconLink } from '@/components/IconLink'
import DownloadIcon from '@mui/icons-material/Download'

const ProvidersSubscribers = ({ mockData }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')

  const data = mockData.top10ProviderWithMostSubscriberMetric[timeframe]

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const names = uniq(data.flatMap((x) => [x.name, ...x.topSubscribers.map((y) => y.name)])).map(
      (x) => ({ name: x })
    )

    const links = data.flatMap((x) =>
      x.topSubscribers.map((y) => ({
        source: x.name,
        target: y.name,
        value: y.agreementsCount,
      }))
    )

    return {
      series: {
        left: 0,
        right: 50,
        top: 0,
        bottom: 20,
        type: 'sankey',
        layout: 'none',
        emphasis: {
          focus: 'adjacency',
        },
        nodeGap: 20,
        data: names,
        links,
        label: {
          formatter: (a) => {
            return `${a.name}`
          },
          width: 50,
          overflow: 'truncate',
          // position: 'right',
        },
        edgeLabel: {
          color: '#ff0000',
        },
      },
    }
  }, [data])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Ente erogatore', 'Ente fruitore', 'Numero di richieste']
    const body = data.flatMap((x) =>
      x.topSubscribers.map((y) => [x.name, y.name, y.agreementsCount.toString()])
    )

    return { head, body }
  }, [data])

  return (
    <ChartAndTableWrapper
      title="Flussi di richieste tra enti"
      description="I 10 enti con maggior numero di richieste di fruizione suddivise per categoria di enti fruitori"
    >
      <Box sx={{ mb: 3 }}>
        <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
      </Box>
      <ChartAndTableTabs chartOptions={chartOptions} chartHeight={800} tableData={tableData} />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2">
          Fonte:{' '}
          <Link href="https://dati.gov.it" target="_blank">
            dati.gov.it
          </Link>
        </Typography>
        <IconLink
          component="button"
          alignSelf="end"
          onClick={() => console.log('TODO handle download')}
          endIcon={<DownloadIcon />}
        >
          Scarica CSV
        </IconLink>
      </Stack>
    </ChartAndTableWrapper>
  )
}

export default ProvidersSubscribers
