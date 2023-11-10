import React from 'react'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import { TopProducersMetric } from '@/models/numbers_new.models'
import GovItLink from './GovItLink'
import { formatThousands } from '@/utils/formatters.utils'
import { CHART_BASE_COLOR } from '@/configs/constants.config'

const TopProducers = ({ data }: { data: TopProducersMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
  }>({ timeframe })

  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const midGrey = useTheme().palette.grey[500]

  const currentData = React.useMemo(() => {
    return data[currentSearch.timeframe]
  }, [data, currentSearch])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const sortedData = [...currentData].reverse()
    const yAxisData = sortedData.map((x) => x.producerName)
    const seriesData = sortedData.map((x) => x.count)

    return {
      tooltip: {
        trigger: 'item',
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
          color: CHART_BASE_COLOR,
          barWidth: 12,
          label: {
            show: true,
            position: 'insideRight',
            distance: -5,
            align: 'left',
            backgroundColor: 'white',
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
  }, [currentData, textColorPrimary, midGrey, fontFamily])

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
        <Stack sx={{ mb: 3 }} direction="row" spacing={3} alignItems="flex-end">
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
          <Button type="submit" variant="outlined" size="small">
            Filtra
          </Button>
        </Stack>
      </form>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={480}
        info={Info}
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
