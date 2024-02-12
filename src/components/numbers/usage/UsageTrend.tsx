/* eslint-disable */
import React from 'react'
import { FormControlLabel, Stack, Switch, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '../ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { PlatformActivitiesMetric, SeriesDataLineChart, Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import GovItLink from '../GovItLink'
import { AVERAGE_COLOR, PRIMARY_BLUE, WINDOW_SMA_AVERAGE } from '@/configs/constants.config'
import { formatThousands, toFormattedNumericDate } from '@/utils/formatters.utils'
import { FiltersStack } from '../FiltersStack'
import { optionLineChart } from '@/utils/charts.utils'
import { simpleMovingAverage } from '@/utils/calculation.utils'

const UsageTrend = ({ data }: { data: PlatformActivitiesMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [isCumulativeDataActive, setIsCumulativeDataActive] = React.useState<boolean>(false)
  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    showCumulatedData: boolean
  }>({ timeframe, showCumulatedData: isCumulativeDataActive })

  const fontFamily = useTheme().typography.fontFamily
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const currentData = data[currentSearch.timeframe]

  const dateList: Array<string> = currentData.map((el) => toFormattedNumericDate(new Date(el.date)))
  const totalData: number[] = currentData.map((d) => d.count)

  const cumulativeSum = (
    (sum) => (value: number) =>
      (sum += value)
  )(0)

  const totalCumulativeData = currentData.map((d) => cumulativeSum(d.count))

  const singleChartTotal = {
    type: 'line',
    name: 'Richieste di accesso',
    data: currentSearch.showCumulatedData ? totalCumulativeData : totalData,
    color: PRIMARY_BLUE,
  }

  const averageChart = {
    type: 'line',
    name: 'Media mensile',
    data: simpleMovingAverage(totalData, WINDOW_SMA_AVERAGE[timeframe]) as number[],
    color: AVERAGE_COLOR,
  }

  const seriesData: SeriesDataLineChart = [averageChart, singleChartTotal]

  const tableDataValue = data[timeframe].flatMap((el) => [
    [toFormattedNumericDate(new Date(el.date)), formatThousands(el.count)],
  ])
  const grid = {
    left: 70,
    right: 30,
    bottom: 140,
    containLabel: true,
  }

  const yAxis = {
    type: 'value',
    nameLocation: 'middle',
    name: "Richieste d'accesso",
    nameGap: 80,
    nameTextStyle: {
      fontWeight: 600,
      align: 'center',
      verticalAlign: 'middle',
    },
  }

  const tooltip = {
    trigger: 'axis',
    formatter: (data: any) => {
      return `
      <div style="display:flex; padding-bottom:5px;">
        <strong>${data[0].axisValueLabel}</strong>            
      </div>
      <div style="display:flex; justify-content: start; flex-direction :column;">
        <div style="display:flex;  margin-right:5px;  align-items: center;justify-content: start;">
          <div style=" width: 10px;height: 10px;background: 
              ${data[1].color}; border-radius:10px; margin-right:6px;">
          </div>
          <div>
            <span>
              Totale ${formatThousands(data[1].value)}
            </span>
          </div>
        </div>
       ${
         data[0].value != null
           ? `<div style="display:flex;  margin-right:5px;  display: flex; align-items: center;justify-content: start;">
          <div style=" width: 10px;height: 10px;background: ${
            data[0].color
          }; border-radius:10px; margin-right:6px;">
          </div>
          <div>
            <span>
            Media ${formatThousands(data[0].value)}
            </span>
          </div>`
           : ``
       }
      </div>`
    },
  }

  const legendSelectedMode = true

  const legend: ECharts.LegendComponentOption = {
    padding: 0,
    left: 0,
    bottom: 0,
    icon: 'rect',
    itemWidth: 12,
    itemHeight: 12,
    itemGap: 8,
    borderType: 'solid',
  }
  const chartOptions: ECharts.EChartsOption = optionLineChart(
    fontFamily,
    dateList,
    seriesData,
    mediaQuerySm,
    grid,
    yAxis,
    tooltip,
    legendSelectedMode,
    legend
  )

  const head = ['Data', 'Numero accessi']
  const body: any = tableDataValue
  const tableData: TableData = { head, body }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({ timeframe, showCumulatedData: isCumulativeDataActive })
  }

  const onCumulativeDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCumulativeDataActive(e.target.checked)
  }

  return (
    <ChartAndTableWrapper
      title="Attività della piattaforma"
      description="Numero di richieste giornaliere d'accesso ai dati"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack
          additionalFilterNode={
            <FormControlLabel
              control={<Switch value={isCumulativeDataActive} onChange={onCumulativeDataChange} />}
              label={
                <Typography sx={{ mt: 0.5 }} variant="body2" color="text.secondary">
                  Dato cumulato
                </Typography>
              }
            />
          }
        >
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
        </FiltersStack>
      </form>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={480}
        info={Info}
        ariaLabel="Grafico che mostra il numero di richieste giornaliere d'accesso ai dati"
      />
      <Stack direction="row" justifyContent="space-between">
        <GovItLink metricName="statoDiCompletamentoAdesioni" timeframe={currentSearch.timeframe} />
      </Stack>
    </ChartAndTableWrapper>
  )
}

const Info = (
  <Typography color="text.secondary">
    Il numero di richieste d'accesso è dato dalla somma delle richieste d'accesso fatte dagli enti
    fruitori. La media è calcolata sui 30 giorni precedenti.
  </Typography>
)

export default UsageTrend
