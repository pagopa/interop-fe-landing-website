/* eslint-disable */
import React from 'react'
import { Alert, FormControlLabel, Stack, Switch, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '../ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { PlatformActivitiesMetric, SeriesDataLineChart, Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import GovItLink from '../GovItLink'
import { PRIMARY_BLUE } from '@/configs/constants.config'
import { formatThousands, toFormattedNumericDate } from '@/utils/formatters.utils'
import { FiltersStack } from '../FiltersStack'
import { optionLineChart } from '@/utils/charts.utils'

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
    stack: 'Total',
    name: 'Richieste di accesso',
    showSymbol: false,
    data: currentSearch.showCumulatedData ? totalCumulativeData : totalData,
    color: PRIMARY_BLUE,
  }

  const seriesData: SeriesDataLineChart = [singleChartTotal]

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
      <div style="display:flex; padding-bottom:15px;">
                    <strong>${data[0].axisValueLabel}</strong>            
                </div>
      <div style="display:flex; justify-content: start;">
      <div style="display:flex;  margin-right:5px;  display: flex; align-items: center;justify-content: center;">
        <div style=" width: 10px;height: 10px;background: ${
          data[0].color
        }; border-radius:10px;"></div>
        </div>
        <div>
          <span>
           Totale ${formatThousands(data[0].value)}
          </span>
        </div>
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

  const onCumulativeDataChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
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
        info={<Alert severity="info">Questa sezione è attualmente in sviluppo.</Alert>}
        ariaLabel="Grafico che mostra il numero di richieste giornaliere d'accesso ai dati"
      />
      <Stack direction="row" justifyContent="space-between">
        <GovItLink metricName="statoDiCompletamentoAdesioni" timeframe={currentSearch.timeframe} />
      </Stack>
    </ChartAndTableWrapper>
  )
}

// const Info = (
//   <Typography color="text.secondary">
//     Ogni categoria è composta dal totale dei relativi enti aggregati secondo le macrocategorie
//     presenti nel <MacrocategoriesLink />. Calcolo per ogni categoria: enti che aderiscono a
//     PDND/totale degli enti presenti su IPA *100.
//   </Typography>
// )

export default UsageTrend
