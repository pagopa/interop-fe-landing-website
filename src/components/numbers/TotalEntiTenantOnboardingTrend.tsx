/* eslint-disable */
import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
import { SerieDataLineChart, SeriesDataLineChart, Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import { TenantOnboardingTrendMetric } from '@/models/numbers.models'
import {
  formatThousands,
  toFormattedLongDate,
  toFormattedNumericDate,
} from '@/utils/formatters.utils'
import GovItLink from './GovItLink'
import { optionLineChart } from '@/utils/charts.utils'
import { PRIMARY_BLUE } from '@/configs/constants.config'

const TotalEntiTenantOnboardingTrend = ({ data }: { data: TenantOnboardingTrendMetric }) => {
  const fontFamily = useTheme().typography.fontFamily
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const newTable: string[][] = data.map((d) => [
    toFormattedNumericDate(new Date(d.date)),
    formatThousands(d.count),
  ])
  const dateForList: string[] = data.map((d) => toFormattedNumericDate(new Date(d.date)))
  const totalData: number[] = data.map((d) => d.count)
  const seriesData: SeriesDataLineChart = []

  const singleChartTotal = {
    type: 'line',
    stack: 'Total',
    name: 'Enti Totali',
    showSymbol: false,
    data: totalData,
    color: PRIMARY_BLUE,
  }
  seriesData.push(singleChartTotal)

  const chartOptions: ECharts.EChartsOption = optionLineChart(
    fontFamily,
    dateForList,
    seriesData,
    mediaQuerySm
  )

  const head = ['Data', 'Adesioni']
  const body = newTable
  const tableData: TableData = { head, body }

  return (
    <React.Fragment>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={480}
        info={Info}
        ariaLabel="Grafico che mostra l'andamento nel tempo delle adesioni a PDND Interoperabilità."
      />
      <Stack direction="row" justifyContent="space-between">
        <GovItLink metricName="andamentoDelleAdesioni" />
      </Stack>
    </React.Fragment>
  )
}

const Info = (
  <Typography color="text.secondary" variant="body2">
    Il numero degli enti aderenti è dato dalla somma degli enti pubblici e degli enti privati che
    hanno aderito alla piattaforma. Il dato è cumulativo.
  </Typography>
)

export default TotalEntiTenantOnboardingTrend
