import React from 'react'
import { Stack, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { MacroCategory, Timeframe } from '@/models/numbers.models'
import { MacroCategorySelectInput } from '@/components/numbers/MacroCategorySelectInput'
import * as ECharts from 'echarts'
import { MostSubscribedEServicesMetric } from '@/models/numbers_new.models'
import GovItLink from './GovItLink'
import { formatThousands } from '@/utils/formatters.utils'

const MostSubscribedEServices = ({ data }: { data: MostSubscribedEServicesMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [macroCategory, setMacroCategory] = React.useState<MacroCategory['id']>('0')

  const barColor = useTheme().palette.primary.main

  const currentData = React.useMemo(() => {
    const macroCategoryData = data.find((x) => x.id === macroCategory)!
    return macroCategoryData.mostSubscribedEServices[timeframe]
  }, [timeframe, macroCategory, data])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const sortedData = [...currentData].reverse()
    const yAxisData = sortedData.map((x) => `{a|${x.eserviceName}} {b|(${x.producerName})}`)
    const seriesData = sortedData.map((x) => x.subscribersCount)

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
    const head = ['E-service', 'Numero di richieste']
    const body = currentData.map((x) => [
      `${x.eserviceName} (${x.producerName})`,
      formatThousands(x.subscribersCount as unknown as number).toString(),
    ])

    return { head, body }
  }, [currentData])

  return (
    <ChartAndTableWrapper
      title="E-service più richiesti"
      description="E-service ordinati per numero di richieste di fruizione, totale e per categoria di ente erogatore"
    >
      <Stack sx={{ mb: 3 }} direction="row" spacing={3}>
        <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
        <MacroCategorySelectInput value={macroCategory} onChange={setMacroCategory} />
      </Stack>
      <ChartAndTableTabs chartOptions={chartOptions} tableData={tableData} />
      <Stack direction="row" justifyContent="space-between">
        <GovItLink />
      </Stack>
    </ChartAndTableWrapper>
  )
}

export default MostSubscribedEServices
