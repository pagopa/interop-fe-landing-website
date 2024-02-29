/* eslint-disable */
import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { MacroCategory, Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import { MacrocategoriesOnboardingTrendMetric } from '@/models/numbers.models'
import GovItLink from './GovItLink'
import { MACROCATEGORIES_COLORS_MAP } from '@/configs/constants.config'
import { toFormattedLongDate, toFormattedNumericDate } from '@/utils/formatters.utils'
import { FiltersStack } from './FiltersStack'
import { MacrocategoriesLink } from './MacrocategoriesLink'
import { optionLineChart } from '@/utils/charts.utils'
import { useMobileDetection } from '@/hooks/useMobileDetection'
import { MacroCategorySelectInput } from './MacroCategorySelectInput'

const values: Array<{ value: MacroCategory['id']; label: MacroCategory['name'] }> = [
  { value: '1', label: 'Altre Pubbliche Amministrazioni locali' },
  { value: '2', label: 'Aziende Ospedaliere e ASL' },
  { value: '3', label: 'Comuni' },
  { value: '4', label: 'Province e città metropolitane' },
  { value: '5', label: 'Pubbliche Amministrazioni Centrali' },
  { value: '6', label: 'Enti Nazionali di Previdenza ed Assistenza Sociale' },
  { value: '7', label: 'Regioni e Province autonome' },
  { value: '8', label: 'Consorzi e associazioni regionali' },
  { value: '9', label: 'Scuole' },
  { value: '10', label: 'Università e AFAM' },
  { value: '11', label: 'Istituti di Ricerca' },
  { value: '12', label: 'Stazioni Appaltanti e Gestori di pubblici servizi' },
  { value: '13', label: 'Privati' },
]

const TenantOnboardingTrend = ({ data }: { data: MacrocategoriesOnboardingTrendMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [macroCategory, setMacroCategory] = React.useState<MacroCategory['id']>('1')

  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    macroCategory: MacroCategory['id']
  }>({ timeframe, macroCategory })

  const fontFamily = useTheme().typography.fontFamily
  const mediaQuerySm = useTheme().breakpoints.values.sm
  const isMobile = useMobileDetection()
  const currentDataFilteredByCategories = data[currentSearch.timeframe].find(
    (it) => it.id === currentSearch.macroCategory
  )

  const dateList: Array<string> = data[timeframe][0].data.map((el) =>
    toFormattedNumericDate(new Date(el.date))
  )

  const seriesData = currentDataFilteredByCategories
    ? [
        {
          type: 'line',
          name: currentDataFilteredByCategories?.name,
          data: currentDataFilteredByCategories?.data.map(
            (element) => (element.count / currentDataFilteredByCategories.totalCount!) * 100
          ),
          color: MACROCATEGORIES_COLORS_MAP.get(currentDataFilteredByCategories?.name),
        },
      ]
    : []

  const tableDataValue = currentDataFilteredByCategories?.data.map((element) => [
    currentDataFilteredByCategories.name,
    toFormattedNumericDate(new Date(element.date)),
    element.count,
  ])
  const grid = {
    left: !isMobile ? 70 : 10,
    right: 30,
    bottom: isMobile ? 220 : 0,
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
            <span style="margin-left: 16px">${(n.value || 0).toFixed(1)}%</span>
          </div>`
    },
  }

  const legendSelectedMode = true
  const chartOptions: ECharts.EChartsOption = optionLineChart(
    fontFamily,
    dateList,
    seriesData,
    mediaQuerySm,
    grid,
    yAxis,
    tooltip,
    legendSelectedMode
  )

  const head = ['Macrocategoria', 'Data', 'Adesioni (%)']
  const body: any = tableDataValue
  const tableData: TableData = { head, body }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({ timeframe, macroCategory })
  }

  return (
    <ChartAndTableWrapper
      title="Stato di completamento delle adesioni per categoria di ente pubblico"
      description="Percentuale di adesione degli enti sul totale della categoria"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack>
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
          <MacroCategorySelectInput
            values={values}
            value={macroCategory}
            onChange={setMacroCategory}
          />
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
        <GovItLink metricName="statoDiCompletamentoAdesioni" timeframe={currentSearch.timeframe} />
      </Stack>
    </ChartAndTableWrapper>
  )
}

const Info = (
  <Typography color="text.secondary" variant="body2">
    Ogni categoria è composta dal totale dei relativi enti aggregati secondo le macrocategorie
    presenti nel <MacrocategoriesLink />. Calcolo per ogni categoria: enti che aderiscono a
    PDND/totale degli enti presenti su IPA *100.
  </Typography>
)

export default TenantOnboardingTrend
