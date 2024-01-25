import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import { TopProducersMetric } from '@/models/numbers_new.models'
import GovItLink from './GovItLink'
import { formatThousands } from '@/utils/formatters.utils'
import { PRIMARY_BLUE } from '@/configs/constants.config'
import { FiltersStack } from './FiltersStack'

const TopProducers = ({ data }: { data: TopProducersMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
  }>({ timeframe })

  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const midGrey = useTheme().palette.grey[500]
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const currentData = React.useMemo(() => {
    return data[currentSearch.timeframe]
  }, [data, currentSearch])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const sortedData = [...currentData].reverse()
    const yAxisData = sortedData.map((x) => x.producerName)
    const seriesData = sortedData.map((x) => x.count)

    return {
      media: [
        {
          query: {
            minWidth: mediaQuerySm,
          },
          option: {
            yAxis: {
              axisLabel: {
                width: 1200,
                overflow: 'none',
              },
            },
          },
        },
      ],
      tooltip: {
        show: true,
        valueFormatter: (value) => `${value} e-service`,
      },
      textStyle: {
        fontFamily: fontFamily,
      },
      yAxis: {
        type: 'category',
        data: yAxisData,
        axisTick: {
          show: false,
        },
        axisLabel: {
          backgroundColor: 'white',
          align: 'left',
          margin: -8,
          padding: [0, 0, 10, 0],
          verticalAlign: 'bottom',
          color: textColorPrimary,
          fontSize: 14,
          width: 280,
          overflow: 'truncate',
        },
      },
      xAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: midGrey,
          },
        },
        axisLabel: {
          color: midGrey,
          fontSize: 14,
        },
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          color: PRIMARY_BLUE,
          barWidth: 12,
          label: {
            show: true,
            position: 'insideRight',
            distance: -5,
            align: 'left',
            backgroundColor: 'white',
            color: midGrey,
          },
        },
      ],
      grid: {
        right: 30,
        left: 5,
        top: 20,
        bottom: 20,
      },
    }
  }, [currentData, textColorPrimary, mediaQuerySm, midGrey, fontFamily])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Erogatore', 'Numero di iscritti']
    const body = currentData.map((x) => [x.producerName, formatThousands(x.count).toString()])

    return { head, body }
  }, [currentData])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({ timeframe })
  }

  return (
    <ChartAndTableWrapper
      title="Enti che pubblicano più e-service"
      description="I 10 enti erogatori con più e-service pubblicati"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack>
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
        </FiltersStack>
      </form>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={480}
        info={Info}
        ariaLabel={`Grafico che mostra la top 10 degli enti che pubblicano più e-service. ${tableData.body
          .map((i) => `${i[0]} con ${i[1]} iscritti`)
          .join('; ')}`}
      />
      <Stack direction="row" justifyContent="space-between">
        <GovItLink />
      </Stack>
    </ChartAndTableWrapper>
  )
}

const Info = (
  <Typography color="text.secondary">
    Il conto degli e-service esclude i cloni (stesso e-service per differenti utenti) e le diverse
    versioni.
  </Typography>
)

export default TopProducers
