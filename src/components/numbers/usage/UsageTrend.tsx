/* eslint-disable */
import React from 'react'
import { FormControlLabel, Switch, Typography, useMediaQuery, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '../ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { PlatformActivitiesMetric, SerieDataLineChart, Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
// import GovItLink from '../GovItLink'
import { AVERAGE_COLOR, PRIMARY_BLUE } from '@/configs/constants.config'
import {
  formatThousands,
  toFormattedLongDate,
  toFormattedNumericDate,
} from '@/utils/formatters.utils'
import { FiltersStack } from '../FiltersStack'
import { optionLineChart } from '@/utils/charts.utils'
import { calculateSimpleMovingAverage } from '@/utils/common.utils'

const INTERVAL_SMA_AVERAGE = {
  lastSixMonths: 5,
  lastTwelveMonths: 3,
  fromTheBeginning: 1,
} as const

enum SeriesDataEnum {
  TotalDataCharts = 1,
  SmaDataCharts = 2,
}
const initialValue = 0

const UsageTrend = ({ data }: { data: PlatformActivitiesMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    showCumulatedData: boolean
  }>({ timeframe, showCumulatedData: false })

  const fontFamily = useTheme().typography.fontFamily
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const currentData = data[currentSearch.timeframe]
  const dateList: Array<string> = currentData.map((el) => toFormattedNumericDate(new Date(el.date)))
  const totalData: number[] = currentData.map((d) => d.count)
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))

  // This function add each value passed within the function with "initialValue" (sum)
  const cumulativeSum = (
    (sum) => (value: number) =>
      (sum += value)
  )(initialValue)

  const totalCumulativeData = currentData.map((d) => cumulativeSum(d.count))

  const singleChartTotal: SerieDataLineChart = {
    id: SeriesDataEnum.TotalDataCharts,
    type: 'line',
    name: 'Richieste di accesso',
    data: currentSearch.showCumulatedData ? totalCumulativeData : totalData,
    color: PRIMARY_BLUE,
  }

  const averageChart: SerieDataLineChart = {
    id: SeriesDataEnum.SmaDataCharts,
    type: 'line',
    name: 'Media mensile',
    data: calculateSimpleMovingAverage(
      totalData,
      INTERVAL_SMA_AVERAGE[currentSearch.timeframe]
    ) as number[],
    color: AVERAGE_COLOR,
  }

  let seriesData = [averageChart, singleChartTotal]

  // Show SMA line only if <Switch/> is not enabled
  if (currentSearch.showCumulatedData)
    seriesData = seriesData.filter((d) => d.id !== SeriesDataEnum.SmaDataCharts)

  const tableDataValue = data[currentSearch.timeframe].flatMap((el) => [
    [toFormattedNumericDate(new Date(el.date)), formatThousands(el.count)],
  ])
  const grid = {
    left: isMobile ? 20 : 70,
    right: 30,
    bottom: 140,
    containLabel: true,
  }

  const yAxis = {
    type: 'value',
    axisLabel: {
      formatter: (val: number) => formatThousands(val),
    },
    nameLocation: 'middle',
    name: isMobile ? '' : "Richieste d'accesso",
    nameGap: 100,
    nameTextStyle: {
      fontWeight: 600,
      align: 'center',
      verticalAlign: 'middle',
    },
  }

  const tooltip = {
    trigger: 'item',
    formatter: (data: any) => {
      return `
      <div style="display:flex; padding-bottom:5px;">
        <strong>${toFormattedLongDate(data.name)}</strong>            
      </div>
      <div style="display:flex; justify-content: start; flex-direction :column;">
        <div style="display:flex;  margin-right:5px;  align-items: center;justify-content: start;">
          <div style=" width: 10px;height: 10px;background: 
          ${data.color}; border-radius:10px; margin-right:6px;">
          </div>
          <div>
            <span>
              ${formatThousands(Math.round(data.value))} richieste di accesso 
            </span>
          </div>
        </div>
      </div>`
    },
  }

  const legendSelectedMode = true
  const legend: ECharts.LegendComponentOption = {
    padding: 0,
    left: 0,
    bottom: 20,
    icon: 'rect',
    itemWidth: 12,
    itemHeight: 12,
    itemGap: 25,
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
  const body: string[][] = tableDataValue
  const tableData: TableData = { head, body }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({ ...currentSearch, timeframe: timeframe })
  }

  const onCumulativeDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch({ timeframe, showCumulatedData: e.target.checked })
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
              control={
                <Switch value={currentSearch.showCumulatedData} onChange={onCumulativeDataChange} />
              }
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
        notMergeData={true}
        ariaLabel="Grafico che mostra il numero di richieste giornaliere d'accesso ai dati"
      />
      {/* <Stack direction="row" justifyContent="space-between">
        <GovItLink
          metricName="andamentoDelleAdesioniPerCategoria"
          timeframe={currentSearch.timeframe}
        />
      </Stack> */}
    </ChartAndTableWrapper>
  )
}

const Info = (
  <Typography color="text.secondary" variant="body2">
    Il numero di richieste d’accesso ai dati è calcolato come somma delle richieste fatte dagli enti
    fruitori. La media è calcolata sui 30 giorni precedenti.
  </Typography>
)

export default UsageTrend
