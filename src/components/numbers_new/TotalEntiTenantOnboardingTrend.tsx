/* eslint-disable */
import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { SerieDataLineChart, SeriesDataLineChart, Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import { TenantOnboardingTrendMetric } from '@/models/numbers_new.models'
import {
  formatThousands,
  toFormattedLongDate,
  toFormattedNumericDate,
} from '@/utils/formatters.utils'
import GovItLink from './GovItLink'
import { optionLineChart } from '@/utils/charts.utils'
import { PRIMARY_BLUE } from '@/configs/constants.config'

const TotalEntiTenantOnboardingTrend = ({ data }: { data: TenantOnboardingTrendMetric }) => {
  const timeframe: Timeframe = 'fromTheBeginning'
  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const midGrey = useTheme().palette.grey[500]
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const newTable: string[][] = []
  const dateForList: string[] = []
  const dateTimeArray: string[] = []
  const totalData: number[] = []
  const seriesData: SeriesDataLineChart = []

  data[timeframe][0].data.map((el) => {
    dateTimeArray.push(el.date)
    dateForList.push(toFormattedNumericDate(new Date(el.date)))
  })

  dateTimeArray.map((itemDate: string) => {
    const count = data[timeframe].reduce((sum, item) => {
      const find = item.data.find((el) => el.date === itemDate)
      return sum + (find ? find.count : 0)
    }, 0)

    newTable.push([toFormattedNumericDate(new Date(itemDate)), formatThousands(count)])
    totalData.push(count)
  })

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
        <GovItLink />
      </Stack>
    </React.Fragment>
  )
}

const Info = (
  <Typography color="text.secondary">
    Il numero degli enti aderenti è dato dalla somma degli enti pubblici e degli enti privati che
    hanno aderito alla piattaforma. Il dato è cumulativo.
  </Typography>
)

export default TotalEntiTenantOnboardingTrend
