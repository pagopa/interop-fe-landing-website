import React from 'react'
import { Box, Stack } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import uniq from 'lodash/uniq'
import { TopProducersBySubscribersMetric } from '@/models/numbers_new.models'
import GovItLink from './GovItLink'
import { formatThousands } from '@/utils/formatters.utils'

const TopProducersBySubscribers = ({ data }: { data: TopProducersBySubscribersMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')

  const currentData = data[timeframe]

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const names = uniq(
      currentData.flatMap((x) => [x.producerName, ...x.macroCategories.map((y) => y.name)])
    ).map((x) => ({ name: x }))

    const links = currentData.flatMap((x) =>
      x.macroCategories.map((y) => ({
        source: x.producerName,
        target: y.name,
        value: y.subscribersCount,
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
  }, [currentData])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Ente erogatore', 'Ente fruitore', 'Numero di richieste']
    const body = currentData.flatMap((x) =>
      x.macroCategories.map((y) => [
        x.producerName,
        y.name,
        formatThousands(y.subscribersCount).toString(),
      ])
    )

    return { head, body }
  }, [currentData])

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
        <GovItLink />
      </Stack>
    </ChartAndTableWrapper>
  )
}

export default TopProducersBySubscribers
