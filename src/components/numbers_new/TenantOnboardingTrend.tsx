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
import { toFormattedLongDate, toFormattedNumericDate } from '@/utils/formatters.utils'
import { FiltersStack } from './FiltersStack'
import { MacrocategoriesLink } from './MacrocategoriesLink'
import { optionLineChart } from '@/utils/charts.utils'

const TenantOnboardingTrend = ({ data }: { data: TenantOnboardingTrendMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
  }>({ timeframe })

  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const midGrey = useTheme().palette.grey[500]
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const dateList: Array<string> = []
  const newTable: Array<Array<string>> = []
  const seriesData: any = []

  const currentData = React.useMemo(() => {
    return data[currentSearch.timeframe]
  }, [data, currentSearch])

  data[timeframe][0].data.map((el) => {
    dateList.push(toFormattedNumericDate(new Date(el.date)))
  })

  data[timeframe].map((el: any) => {
    const arrayData: any = []
    el.data.map((element: any) => {
      newTable.push([
        el.name,
        toFormattedNumericDate(new Date(el.date)),
        el.totalCount > 0 ? `${((element.count / el.totalCount) * 100).toFixed(2)}%` : '0%',
      ])
      arrayData.push((element.count / el.totalCount) * 100)
    })
    let singleChart = {
      type: 'line',
      showSymbol: false,
      name: el.name,
      data: arrayData,
      color: MACROCATEGORIES_COLORS_MAP.get(el.name),
    }

    seriesData.push(singleChart)
  })

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
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

    return optionLineChart(fontFamily, dateList, seriesData, mediaQuerySm, grid, yAxis)
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
