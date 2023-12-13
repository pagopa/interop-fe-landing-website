/* eslint-disable */
import React from 'react'
import { Typography, useTheme } from '@mui/material'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import { TenantOnboardingTrendMetric } from '@/models/numbers_new.models'
import { formatThousands } from '@/utils/formatters.utils'

const TotalEntiTenantOnboardingTrend = ({ data }: { data: TenantOnboardingTrendMetric }) => {
  const timeframe: Timeframe = 'fromTheBeginning'
  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const midGrey = useTheme().palette.grey[500]
  const mediaQuerySm = useTheme().breakpoints.values.sm

  let newTable: any = []
  let dateList: any = []
  let dateArray: any = []
  data[timeframe][0].data.forEach((el) => {
    dateArray.push(el.date)
    dateList.push(
      new Date(el.date).getDate() +
        '/' +
        (new Date(el.date).getMonth() + 1) +
        '/' +
        new Date(el.date).getFullYear()
    )
  })

  let totalData: any = []
  dateArray.forEach((itemDate: string) => {
    let count = 0
    data[timeframe].forEach((item: any) => {
      let find = item.data.find((el: any) => el.date === itemDate)
      count += find ? find.count : 0
    })
    newTable.push([
      new Date(itemDate).getDate() +
        '/' +
        (new Date(itemDate).getMonth() + 1) +
        '/' +
        new Date(itemDate).getFullYear(),
      formatThousands(count),
    ])
    totalData.push(count)
  })

  let newData: any = []
  let d = {
    type: 'line',
    stack: 'Total',
    name: 'Enti Totali',
    showSymbol: false,
    data: totalData,
  }
  newData.push(d)

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    return {
      title: {
        // text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (n: any) => {
          let tooltip = `<div style="display:flex; padding-bottom:15px;  ">Periodo: ${n[0].axisValueLabel}</div>`
          n.forEach((item: any) => {
            tooltip += `
            <div style="display:flex; justify-content: start;">
            <div style="display:flex;  margin-right:5px;  display: flex; align-items: center;justify-content: center;">
              <div style=" width: 10px;height: 10px;background: ${
                item.color
              }; border-radius:10px;"></div>
              </div>
              <div>${item.seriesName}<span><strong style="margin-left:5px;">${
                item.value ? formatThousands(item.value) : 0
              } </strong></span></div> </div>`
          })

          return tooltip
        },
      },
      legend: {
        show: true,
        bottom: '0',
        left: 'left',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '18%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dateList,
      },
      yAxis: {
        type: 'value',
      },
      series: newData.sort((one: any, two: any) => (one.name > two.name ? 1 : -1)),
    }
  }, [textColorPrimary, mediaQuerySm, midGrey, fontFamily])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Data', 'Adesioni']

    const body: any = newTable
    return { head, body }
  }, [])

  return (
    <ChartAndTableTabs
      chartOptions={chartOptions}
      tableData={tableData}
      chartHeight={480}
      info={Info}
    />
  )
}

const Info = (
  <Typography color="text.secondary">
    Il numero degli enti aderenti è dato dalla somma degli enti pubblici e degli enti privati che
    hanno aderito alla piattaforma. Il dato è cumulativo.
  </Typography>
)

export default TotalEntiTenantOnboardingTrend
