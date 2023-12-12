/* eslint-disable */
import React, { useState } from 'react'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import { TenantOnboardingTrendMetric } from '@/models/numbers_new.models'
import GovItLink from './GovItLink'
import { MACROCATEGORIES_COLORS_MAP } from '@/configs/constants.config'

const TenantOnboardingTrend = ({ data }: { data: TenantOnboardingTrendMetric }) => {
  const head: Array<string> = []
  data['lastTwelveMonths'].forEach((el) => {
    head.push(el.name)
  })

  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [headChart, setHeadChart] = useState<string[]>()
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

  const dateList: Array<string> = []
  data[timeframe][0].data.forEach((el) => {
    dateList.push(
      new Date(el.date).getDate() +
        '/' +
        (new Date(el.date).getMonth() + 1) +
        '/' +
        new Date(el.date).getFullYear()
    )
  })
  const newData: any = []
  const newTable: Array<Array<string>> = []
  data[timeframe].map((el: any) => {
    const arrayData: any = []
    el.data.forEach((element: any) => {
      newTable.push([
        el.name,
        new Date(element.date).getDate() +
          '/' +
          (new Date(element.date).getMonth() + 1) +
          '/' +
          new Date(element.date).getFullYear(),
        element.count,
      ])
      arrayData.push(element.count / el.totalCount)
    })
    let d = {
      type: 'line',
      stack: 'Total',
      showSymbol: false,
      name: el.name,
      data: arrayData,
      color: MACROCATEGORIES_COLORS_MAP.get(el.name),
    }

    newData.push(d)
  })

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    return {
      title: {
        // text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (n: any) => {
          let tooltip = `<div style="display:flex; padding-bottom:15px;">Periodo: ${n[0].axisValueLabel}</div>`
          n.forEach((item: any) => {
            tooltip += `
            <div style="display:flex; justify-content: start;">
            <div style="display:flex;  margin-right:5px;  display: flex; align-items: center;justify-content: center;">
              <div style=" width: 10px;height: 10px;background: ${
                item.color
              }; border-radius:10px;"></div>
              </div>
              <div">${item.seriesName}<span "><strong style="margin-left:5px;">${
                item.value ? item.value.toFixed(2) : 0
              }% </strong></span></div> </div>`
          })

          return tooltip
        },
      },

      grid: {
        left: '3%',
        right: '4%',
        bottom: '18%',
        containLabel: true,
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dateList,
      },
      yAxis: {
        type: 'value',
      },
      legend: {
        show: true,
        bottom: '0',
        left: 'left',
      },
      series: newData.sort((one: any, two: any) => (one.name > two.name ? 1 : -1)),
    }
  }, [currentData, textColorPrimary, mediaQuerySm, midGrey, fontFamily])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Macrocategoria', 'Data', 'Adesioni']
    const body: any = newTable
    return { head, body }
  }, [currentData])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    generateHeadTrend()
    setCurrentSearch({ timeframe })
  }

  function generateHeadTrend() {
    let head: any = []
    data[timeframe].forEach((el) => {
      head.push(el.name)
    })
    setHeadChart(head)
  }

  return (
    <ChartAndTableWrapper
      title="Stato di completamento delle adesioni per categoria di ente pubblico"
      description="Percentuale di adesione degli enti sul totale della categoria"
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
    Ogni categoria è composta dal totale dei relativi enti aggregati secondo le macrocategorie
    presenti nel file. Calcolo per ogni categoria: Enti che aderiscono a PDND/totale degli enti
    presenti su IPA *100. Ogni categoria è composta dal totale dei relativi enti aggregati secondo
    le macrocategorie presenti nel file. Calcolo per ogni categoria: Enti che aderiscono a
    PDND/totale degli enti presenti su IPA *100.
  </Typography>
)

export default TenantOnboardingTrend
