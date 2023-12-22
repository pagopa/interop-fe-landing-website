/* eslint-disable */
import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import { TenantOnboardingTrendMetric } from '@/models/numbers_new.models'
import GovItLink from './GovItLink'
import { MACROCATEGORIES_COLORS_MAP } from '@/configs/constants.config'
import { toFormattedLongDate } from '@/utils/formatters.utils'
import { FiltersStack } from './FiltersStack'
import { MacrocategoriesLink } from './MacrocategoriesLink'

const TenantOnboardingTrend = ({ data }: { data: TenantOnboardingTrendMetric }) => {
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
        el.totalCount > 0 ? `${((element.count / el.totalCount) * 100).toFixed(2)}%` : '0%',
      ])
      arrayData.push((element.count / el.totalCount) * 100)
    })
    let d = {
      type: 'line',
      showSymbol: false,
      name: el.name,
      data: arrayData,
      color: MACROCATEGORIES_COLORS_MAP.get(el.name),
    }

    newData.push(d)
  })

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    return {
      textStyle: {
        fontFamily,
      },
      media: [
        {
          query: {
            minWidth: mediaQuerySm,
          },
          option: {
            grid: {
              bottom: 100,
            },
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter: (n: any) => {
          const formattedDate = toFormattedLongDate(n[0].axisValueLabel)
          let tooltip = `<div style="display:flex; padding-bottom:15px;">
            <strong>${formattedDate}</strong>
          </div>`
          n.forEach((item: any) => {
            tooltip += `<div style="display:flex; justify-content: space-between;">
                <div style="display: flex; align-items: center; flex-shrink: 0;">
                  <div style="margin-right: 5px; width: 10px; height: 10px; background: ${
                    item.color
                  }; border-radius: 100%"></div>
                  ${item.seriesName}
                </div>
                <span style="margin-left: 16px">${(item.value || 0).toFixed(2)}%</span>
              </div>`
          })

          return tooltip
        },
      },
      grid: {
        left: 70,
        right: 30,
        bottom: 140,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dateList,
      },
      yAxis: {
        type: 'value',
        nameLocation: 'middle',
        name: '% enti aderenti',
        nameGap: 80,
        nameTextStyle: {
          fontWeight: 600,
          align: 'center',
          verticalAlign: 'middle',
        },
      },
      legend: {
        padding: 0,
        left: 0,
        bottom: 0,
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 8,
        itemStyle: {
          borderWidth: 0,
        },
      },
      series: newData.sort((one: any, two: any) => (one.name > two.name ? 1 : -1)),
    }
  }, [currentData, textColorPrimary, mediaQuerySm, midGrey, fontFamily])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Macrocategoria', 'Data', 'Adesioni (%)']
    const body: any = newTable
    return { head, body }
  }, [currentData])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({ timeframe })
  }

  return (
    <ChartAndTableWrapper
      title="Stato di completamento delle adesioni per categoria di ente pubblico"
      description="Percentuale di adesione degli enti sul totale della categoria"
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
        ariaLabel="Grafico che mostra lo stato di adesione percentuale per macrocategoria di ente."
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
    presenti nel <MacrocategoriesLink />. Calcolo per ogni categoria: Enti che aderiscono a
    PDND/totale degli enti presenti su IPA *100.
  </Typography>
)

export default TenantOnboardingTrend
