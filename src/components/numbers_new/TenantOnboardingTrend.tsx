/* eslint-disable */
import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { SeriesDataLineChart, Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import { MacrocategoriesOnboardingTrendMetric } from '@/models/numbers_new.models'
import GovItLink from './GovItLink'
import { MACROCATEGORIES_COLORS_MAP } from '@/configs/constants.config'
import { toFormattedLongDate, toFormattedNumericDate } from '@/utils/formatters.utils'
import { FiltersStack } from './FiltersStack'
import { MacrocategoriesLink } from './MacrocategoriesLink'
import { optionLineChart } from '@/utils/charts.utils'

const TenantOnboardingTrend = ({ data }: { data: MacrocategoriesOnboardingTrendMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
  }>({ timeframe })

  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const midGrey = useTheme().palette.grey[500]
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const newTable: Array<Array<string>> = []

  const currentData = data[currentSearch.timeframe]

  const dateList: Array<string> = data[timeframe][0].data.map((el) =>
    toFormattedNumericDate(new Date(el.date))
  )

  const seriesData: SeriesDataLineChart = data[timeframe].map((el) => ({
    type: 'line',
    name: el.name,
    data: el.data.map((element) => (element.count / el.totalCount!) * 100),
    color: MACROCATEGORIES_COLORS_MAP.get(el.name),
  }))

  const tableDataValue = data[timeframe].flatMap((el) =>
    el.data.map((element) => [
      el.name,
      toFormattedNumericDate(new Date(element.date)),
      element.count,
    ])
  )
  const grid = {
    left: 70,
    right: 30,
    bottom: 140,
    containLabel: true,
  }

  const yAxis = {
    type: 'value',
    nameLocation: 'middle',
    name: '% enti aderenti',
    nameGap: 80,
    nameTextStyle: {
      fontWeight: 600,
      align: 'center',
      verticalAlign: 'middle',
    },
  }

  const tooltip = {
    trigger: 'item',
    formatter: (n: any) => {
      const formattedDate = toFormattedLongDate(n.name)
      return `<div style="display:flex; padding-bottom:15px;">
            <strong>${formattedDate}</strong>
          </div>
          <div style="display:flex; justify-content: space-between;">
            <div style="display: flex; align-items: center; flex-shrink: 0;">
              <div style="margin-right: 5px; width: 10px; height: 10px; background: ${
                n.color
              }; border-radius: 100%"></div>
              ${n.seriesName}
            </div>
            <span style="margin-left: 16px">${(n.value || 0).toFixed(2)}%</span>
          </div>`
    },
  }

  const chartOptions: ECharts.EChartsOption = optionLineChart(
    fontFamily,
    dateList,
    seriesData,
    mediaQuerySm,
    grid,
    yAxis,
    tooltip
  )

  const head = ['Macrocategoria', 'Data', 'Adesioni (%)']
  const body: any = tableDataValue
  const tableData: TableData = { head, body }

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
