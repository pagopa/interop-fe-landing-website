import React from 'react'
import { Stack, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import { TopProducersMetric } from '@/models/numbers_new.models'
import GovItLink from './GovItLink'

const TopProducers = ({ data }: { data: TopProducersMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')

  const barColor = useTheme().palette.primary.main
  const currentData = React.useMemo(() => {
    return data[timeframe]
  }, [data, timeframe])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const sortedData = [...currentData].reverse()
    const yAxisData = sortedData.map((x) => x.producerName)
    const seriesData = sortedData.map((x) => x.count)

    return {
      tooltip: {
        trigger: 'item',
      },
      yAxis: {
        type: 'category',
        data: yAxisData,
        axisTick: {
          show: false,
        },
        axisLabel: {
          align: 'left',
          verticalAlign: 'bottom',
          margin: -10,
          width: 400,
          height: 20,
          rich: {
            a: {
              color: 'black',
            },
            b: {
              color: 'darkGrey',
            },
          },
          overflow: 'truncate',
        },
      },
      xAxis: {
        type: 'value',
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          color: barColor,
          itemStyle: {
            borderRadius: [0, 20, 20, 0],
          },
          barWidth: 12,
        },
      ],
      grid: {
        right: 30,
        left: 5,
      },
    }
  }, [currentData, barColor])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Erogatore', 'Numero di iscritti']
    const body = currentData.map((x) => [x.producerName, x.count.toString()])

    return { head, body }
  }, [currentData])

  return (
    <ChartAndTableWrapper
      title="Enti che pubblicano più e-service"
      description="I 10 enti erogatori con più e-service pubblicati"
    >
      <Stack sx={{ mb: 3 }} direction="row" spacing={3}>
        <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
      </Stack>
      <ChartAndTableTabs chartOptions={chartOptions} tableData={tableData} />
      <Stack direction="row" justifyContent="space-between">
        <GovItLink />
      </Stack>
    </ChartAndTableWrapper>
  )
}

export default TopProducers
