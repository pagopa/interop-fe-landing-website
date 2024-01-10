/* eslint-disable */
import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import { TenantOnboardingTrendMetric } from '@/models/numbers_new.models'
import {
  formatThousands,
  toFormattedLongDate,
  toFormattedNumericDate,
} from '@/utils/formatters.utils'
import GovItLink from './GovItLink'

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
  const seriesData: any = []

  data[timeframe][0].data.forEach((el) => {
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
  }
  seriesData.push(singleChartTotal)

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    return {
      textStyle: {
        fontFamily,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (n: any) => {
          const formattedDate = toFormattedLongDate(n[0].axisValueLabel)
          let tooltip = `<div style="display:flex; padding-bottom:15px;">
            <strong>${formattedDate}</strong>            
          </div>`
          n.map((item: any) => {
            tooltip += `
            <div style="display:flex; justify-content: start;">
            <div style="display:flex;  margin-right:5px;  display: flex; align-items: center;justify-content: center;">
              <div style=" width: 10px;height: 10px;background: ${
                item.color
              }; border-radius:10px;"></div>
              </div>
              <div>
                <span>
                  ${item.value ? formatThousands(item.value) : 0} enti totali
                </span>
              </div>
            </div>`
          })

          return tooltip
        },
      },
      legend: {
        show: true,
        bottom: '0',
        left: 'left',
        selectedMode: false,
      },
      grid: {
        left: 10,
        right: 30,
        bottom: 60,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dateForList,
      },
      yAxis: {
        type: 'value',
      },
      series: seriesData.sort((one: any, two: any) => (one.name > two.name ? 1 : -1)),
    }
  }, [textColorPrimary, mediaQuerySm, midGrey, fontFamily])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Data', 'Adesioni']

    const body: any = newTable
    return { head, body }
  }, [])

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
