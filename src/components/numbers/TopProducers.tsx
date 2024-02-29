import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { MacroCategory, Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import { TopProducersMetric } from '@/models/numbers.models'
import GovItLink from './GovItLink'
import { formatThousands } from '@/utils/formatters.utils'
import { BAR_CHART_NUMERIC_LABEL_COLOR, PRIMARY_BLUE } from '@/configs/constants.config'
import { FiltersStack } from './FiltersStack'
import { MacroCategorySelectInput } from './MacroCategorySelectInput'

const mockData = {
  lastSixMonths: [
    {
      id: '0',
      name: 'Totale',
      data: [
        {
          producerName: 'Comune di Milano',
          count: 6189,
        },
        {
          producerName: 'PagoPA S.p.A.',
          count: 1209,
        },
        {
          producerName: "Agenzia per L'Italia Digitale",
          count: 996,
        },
        {
          producerName: 'Comune di Firenze',
          count: 1,
        },
      ],
    },
    {
      id: '1',
      name: 'Altre Pubbliche Amministrazioni locali',
      data: [
        {
          producerName: "Agenzia per L'Italia Digitale",
          count: 996,
        },
      ],
    },
    {
      id: '2',
      name: 'Aziende Ospedaliere e ASL',
      data: [],
    },
    {
      id: '3',
      name: 'Comuni',
      data: [
        {
          producerName: 'Comune di Milano',
          count: 6189,
        },
        {
          producerName: 'Comune di Firenze',
          count: 1,
        },
      ],
    },
    {
      id: '4',
      name: 'Province e Città Metropolitane',
      data: [],
    },
    {
      id: '5',
      name: 'Pubbliche Amministrazioni Centrali',
      data: [],
    },
    {
      id: '6',
      name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
      data: [],
    },
    {
      id: '7',
      name: 'Regioni e Province autonome',
      data: [],
    },
    {
      id: '8',
      name: 'Consorzi e associazioni regionali',
      data: [],
    },
    {
      id: '9',
      name: 'Scuole',
      data: [],
    },
    {
      id: '10',
      name: 'Università e AFAM',
      data: [],
    },
    {
      id: '11',
      name: 'Istituti di Ricerca',
      data: [],
    },
    {
      id: '12',
      name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
      data: [
        {
          producerName: 'PagoPA S.p.A.',
          count: 1209,
        },
      ],
    },
    {
      id: '13',
      name: 'Privati',
      data: [],
    },
  ],
  lastTwelveMonths: [
    {
      id: '0',
      name: 'Totale',
      data: [
        {
          producerName: 'Comune di Milano',
          count: 6189,
        },
        {
          producerName: 'PagoPA S.p.A.',
          count: 1209,
        },
        {
          producerName: "Agenzia per L'Italia Digitale",
          count: 996,
        },
        {
          producerName: 'Comune di Firenze',
          count: 1,
        },
      ],
    },
    {
      id: '1',
      name: 'Altre Pubbliche Amministrazioni locali',
      data: [
        {
          producerName: "Agenzia per L'Italia Digitale",
          count: 996,
        },
      ],
    },
    {
      id: '2',
      name: 'Aziende Ospedaliere e ASL',
      data: [],
    },
    {
      id: '3',
      name: 'Comuni',
      data: [
        {
          producerName: 'Comune di Milano',
          count: 6189,
        },
        {
          producerName: 'Comune di Firenze',
          count: 1,
        },
      ],
    },
    {
      id: '4',
      name: 'Province e Città Metropolitane',
      data: [],
    },
    {
      id: '5',
      name: 'Pubbliche Amministrazioni Centrali',
      data: [],
    },
    {
      id: '6',
      name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
      data: [],
    },
    {
      id: '7',
      name: 'Regioni e Province autonome',
      data: [],
    },
    {
      id: '8',
      name: 'Consorzi e associazioni regionali',
      data: [],
    },
    {
      id: '9',
      name: 'Scuole',
      data: [],
    },
    {
      id: '10',
      name: 'Università e AFAM',
      data: [],
    },
    {
      id: '11',
      name: 'Istituti di Ricerca',
      data: [],
    },
    {
      id: '12',
      name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
      data: [
        {
          producerName: 'PagoPA S.p.A.',
          count: 1209,
        },
      ],
    },
    {
      id: '13',
      name: 'Privati',
      data: [],
    },
  ],
  fromTheBeginning: [
    {
      id: '0',
      name: 'Totale',
      data: [
        {
          producerName: 'Comune di Milano',
          count: 6189,
        },
        {
          producerName: 'PagoPA S.p.A.',
          count: 1209,
        },
        {
          producerName: "Agenzia per L'Italia Digitale",
          count: 996,
        },
        {
          producerName: 'Comune di Firenze',
          count: 1,
        },
      ],
    },
    {
      id: '1',
      name: 'Altre Pubbliche Amministrazioni locali',
      data: [
        {
          producerName: "Agenzia per L'Italia Digitale",
          count: 996,
        },
      ],
    },
    {
      id: '2',
      name: 'Aziende Ospedaliere e ASL',
      data: [],
    },
    {
      id: '3',
      name: 'Comuni',
      data: [
        {
          producerName: 'Comune di Milano',
          count: 6189,
        },
        {
          producerName: 'Comune di Firenze',
          count: 1,
        },
      ],
    },
    {
      id: '4',
      name: 'Province e Città Metropolitane',
      data: [],
    },
    {
      id: '5',
      name: 'Pubbliche Amministrazioni Centrali',
      data: [],
    },
    {
      id: '6',
      name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
      data: [],
    },
    {
      id: '7',
      name: 'Regioni e Province autonome',
      data: [],
    },
    {
      id: '8',
      name: 'Consorzi e associazioni regionali',
      data: [],
    },
    {
      id: '9',
      name: 'Scuole',
      data: [],
    },
    {
      id: '10',
      name: 'Università e AFAM',
      data: [],
    },
    {
      id: '11',
      name: 'Istituti di Ricerca',
      data: [],
    },
    {
      id: '12',
      name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
      data: [
        {
          producerName: 'PagoPA S.p.A.',
          count: 1209,
        },
      ],
    },
    {
      id: '13',
      name: 'Privati',
      data: [],
    },
  ],
}

const TopProducers = ({ data }: { data: TopProducersMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [macroCategory, setMacroCategory] = React.useState<MacroCategory['id']>('5')

  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    macroCategory: MacroCategory['id']
  }>({ timeframe, macroCategory })

  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const midGrey = useTheme().palette.grey[500]
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const currentData = React.useMemo(() => {
    return mockData[currentSearch.timeframe].find((x) => x.id === currentSearch.macroCategory)
  }, [data, currentSearch])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const sortedData = currentData?.data.reverse()
    const yAxisData = sortedData?.map((x) => x.producerName)
    const seriesData = sortedData?.map((x) => x.count)

    return {
      media: [
        {
          query: {
            minWidth: mediaQuerySm,
          },
          option: {
            yAxis: {
              axisLabel: {
                width: 1200,
                overflow: 'none',
              },
            },
          },
        },
      ],
      tooltip: {
        show: true,
        valueFormatter: (value) => `${value} e-service`,
      },
      textStyle: {
        fontFamily: fontFamily,
      },
      yAxis: {
        type: 'category',
        data: yAxisData,
        axisTick: {
          show: false,
        },
        axisLabel: {
          backgroundColor: 'white',
          align: 'left',
          margin: -8,
          padding: [0, 0, 10, 0],
          verticalAlign: 'bottom',
          color: textColorPrimary,
          fontSize: 14,
          width: 280,
          overflow: 'truncate',
        },
      },
      xAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: midGrey,
          },
        },
        axisLabel: {
          color: midGrey,
          fontSize: 14,
        },
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          color: PRIMARY_BLUE,
          barWidth: 12,
          label: {
            show: true,
            position: 'insideRight',
            distance: -5,
            align: 'left',
            backgroundColor: 'white',
            color: BAR_CHART_NUMERIC_LABEL_COLOR,
          },
        },
      ],
      grid: {
        right: 30,
        left: 5,
        top: 20,
        bottom: 20,
      },
    }
  }, [currentData, textColorPrimary, mediaQuerySm, midGrey, fontFamily])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Erogatore', 'Numero di iscritti']
    const body =
      currentData?.data.map((x) => [x.producerName, formatThousands(x.count).toString()]) || []
    return { head, body }
  }, [currentData])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({ timeframe, macroCategory })
  }

  return (
    <ChartAndTableWrapper
      title="Enti che pubblicano più e-service"
      description="I 10 enti erogatori con più e-service pubblicati"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack>
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
          <MacroCategorySelectInput value={macroCategory} onChange={setMacroCategory} />
        </FiltersStack>
      </form>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={480}
        info={Info}
        ariaLabel={`Grafico che mostra la top 10 degli enti che pubblicano più e-service. ${tableData.body
          .map((i) => `${i[0]} con ${i[1]} iscritti`)
          .join('; ')}`}
      />
      <Stack direction="row" justifyContent="space-between">
        <GovItLink metricName="entiChePubblicanoPiuEService" timeframe={currentSearch.timeframe} />
      </Stack>
    </ChartAndTableWrapper>
  )
}

const Info = (
  <Typography color="text.secondary" variant="body2">
    Il conto degli e-service include tutti quelli pubblicati a catalogo.
  </Typography>
)

export default TopProducers
