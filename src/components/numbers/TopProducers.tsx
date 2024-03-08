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
import {
  BAR_CHART_NUMERIC_LABEL_COLOR,
  NUMBERS_OF_ELEMENTS_TO_SHOW,
  PRIMARY_BLUE,
} from '@/configs/constants.config'
import { FiltersStack } from './FiltersStack'
import { MacroCategoryMultipleSelectInput } from './MacroCategoryMultipleSelectInput'

const mockData = {
  lastSixMonths: [
    {
      id: '0',
      name: 'Totale',
      data: [
        {
          producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
          count: 102,
        },
        {
          producerName: 'Comune di Torino',
          count: 13,
        },
        {
          producerName: 'Regione Liguria',
          count: 13,
        },
        {
          producerName: 'Comune di Brescia',
          count: 13,
        },
        {
          producerName: 'PagoPA S.p.A.',
          count: 10,
        },
        {
          producerName: 'Regione Piemonte',
          count: 9,
        },
        {
          producerName: 'Comune di Ancona',
          count: 9,
        },
        {
          producerName: 'Comune di San Giovanni Rotondo',
          count: 9,
        },
        {
          producerName: 'Comune di Massa',
          count: 9,
        },
        {
          producerName: 'Ministero delle infrastrutture e dei trasporti',
          count: 9,
        },
      ],
    },
    {
      id: '1',
      name: 'Altre Pubbliche Amministrazioni locali',
      data: [
        {
          producerName: "Agenzia per L'Italia Digitale",
          count: 3,
        },
        {
          producerName: 'Ispettorato Nazionale del Lavoro',
          count: 1,
        },
        {
          producerName:
            'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
          count: 1,
        },
        {
          producerName: 'Consorzio Comuni Bacino Imbrifero Montano di Valle Camonica',
          count: 1,
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
          producerName: 'Comune di Brescia',
          count: 13,
        },
        {
          producerName: 'Comune di Torino',
          count: 13,
        },
        {
          producerName: 'Comune di San Giovanni Rotondo',
          count: 9,
        },
        {
          producerName: 'Comune di Massa',
          count: 9,
        },
        {
          producerName: 'Comune di Ancona',
          count: 9,
        },
        {
          producerName: 'ROMA CAPITALE',
          count: 8,
        },
        {
          producerName: 'Comune di Olbia',
          count: 8,
        },
        {
          producerName: 'Comune di Oncino',
          count: 7,
        },
        {
          producerName: 'Comune di Firenze',
          count: 7,
        },
        {
          producerName: 'Comune di Trento',
          count: 7,
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
      data: [
        {
          producerName: 'Ministero delle infrastrutture e dei trasporti',
          count: 9,
        },
        {
          producerName: 'Agenzia delle Entrate',
          count: 7,
        },
        {
          producerName: "MINISTERO DELL'UNIVERSITA' E DELLA RICERCA",
          count: 6,
        },
        {
          producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
          count: 4,
        },
        {
          producerName: 'Ministero della Giustizia',
          count: 3,
        },
        {
          producerName: "Ministero dell'Interno",
          count: 3,
        },
        {
          producerName: 'Ministero del Lavoro e delle Politiche Sociali',
          count: 2,
        },
        {
          producerName: 'Presidenza del Consiglio dei Ministri',
          count: 1,
        },
      ],
    },
    {
      id: '6',
      name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
      data: [
        {
          producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
          count: 102,
        },
      ],
    },
    {
      id: '7',
      name: 'Regioni e Province autonome',
      data: [
        {
          producerName: 'Regione Liguria',
          count: 13,
        },
        {
          producerName: 'Regione Piemonte',
          count: 9,
        },
        {
          producerName: 'Regione Autonoma Friuli-Venezia Giulia',
          count: 5,
        },
        {
          producerName: 'Regione Marche',
          count: 3,
        },
        {
          producerName: 'Regione Emilia-Romagna',
          count: 2,
        },
        {
          producerName: 'Provincia Autonoma di Trento',
          count: 1,
        },
      ],
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
      data: [
        {
          producerName: 'Conservatorio Statale di Musica G. Rossini',
          count: 2,
        },
        {
          producerName: "Universita' degli Studi di Messina",
          count: 1,
        },
      ],
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
          count: 10,
        },
        {
          producerName: "Azienda Regionale per l'Innovazione egli Acquisti - ARIA SpA",
          count: 3,
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
          producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
          count: 122,
        },
        {
          producerName: "Ministero dell'Interno",
          count: 37,
        },
        {
          producerName: 'Regione Liguria',
          count: 29,
        },
        {
          producerName: 'PagoPA S.p.A.',
          count: 28,
        },
        {
          producerName: 'Comune di San Giovanni Rotondo',
          count: 19,
        },
        {
          producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
          count: 14,
        },
        {
          producerName: 'Comune di Torino',
          count: 13,
        },
        {
          producerName: 'Comune di Brescia',
          count: 13,
        },
        {
          producerName: 'Comune di Cavalese',
          count: 11,
        },
        {
          producerName: 'Regione Piemonte',
          count: 11,
        },
      ],
    },
    {
      id: '1',
      name: 'Altre Pubbliche Amministrazioni locali',
      data: [
        {
          producerName:
            'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
          count: 8,
        },
        {
          producerName: "Agenzia per L'Italia Digitale",
          count: 7,
        },
        {
          producerName: 'Ispettorato Nazionale del Lavoro',
          count: 1,
        },
        {
          producerName: 'Consiglio Nazionale Forense',
          count: 1,
        },
        {
          producerName: 'Consorzio Comuni Bacino Imbrifero Montano di Valle Camonica',
          count: 1,
        },
        {
          producerName: "Autorita' di sistema portuale del Mare Adriatico settentrionale",
          count: 1,
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
          producerName: 'Comune di San Giovanni Rotondo',
          count: 19,
        },
        {
          producerName: 'Comune di Torino',
          count: 13,
        },
        {
          producerName: 'Comune di Brescia',
          count: 13,
        },
        {
          producerName: 'Comune di Cavalese',
          count: 11,
        },
        {
          producerName: 'Comune di Massa',
          count: 10,
        },
        {
          producerName: 'Comune di Ancona',
          count: 9,
        },
        {
          producerName: 'Comune di Olbia',
          count: 8,
        },
        {
          producerName: 'ROMA CAPITALE',
          count: 8,
        },
        {
          producerName: 'Comune di Trento',
          count: 7,
        },
        {
          producerName: 'Comune di Oncino',
          count: 7,
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
      data: [
        {
          producerName: "Ministero dell'Interno",
          count: 37,
        },
        {
          producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
          count: 14,
        },
        {
          producerName: 'Ministero della Giustizia',
          count: 10,
        },
        {
          producerName: 'Ministero delle infrastrutture e dei trasporti',
          count: 10,
        },
        {
          producerName: 'Agenzia delle Entrate',
          count: 9,
        },
        {
          producerName: 'Presidenza del Consiglio dei Ministri',
          count: 9,
        },
        {
          producerName: "MINISTERO DELL'UNIVERSITA' E DELLA RICERCA",
          count: 6,
        },
        {
          producerName: 'Ministero del Lavoro e delle Politiche Sociali',
          count: 2,
        },
      ],
    },
    {
      id: '6',
      name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
      data: [
        {
          producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
          count: 122,
        },
      ],
    },
    {
      id: '7',
      name: 'Regioni e Province autonome',
      data: [
        {
          producerName: 'Regione Liguria',
          count: 29,
        },
        {
          producerName: 'Regione Piemonte',
          count: 11,
        },
        {
          producerName: 'Regione Autonoma Friuli-Venezia Giulia',
          count: 5,
        },
        {
          producerName: 'Provincia Autonoma di Trento',
          count: 4,
        },
        {
          producerName: 'Regione Marche',
          count: 3,
        },
        {
          producerName: 'Regione Emilia-Romagna',
          count: 2,
        },
        {
          producerName: "Regione Autonoma Valle D'Aosta",
          count: 1,
        },
        {
          producerName: 'Regione Toscana',
          count: 1,
        },
      ],
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
      data: [
        {
          producerName: 'Conservatorio Statale di Musica G. Rossini',
          count: 2,
        },
        {
          producerName: "Universita' degli Studi di Messina",
          count: 1,
        },
      ],
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
          count: 28,
        },
        {
          producerName: "Azienda Regionale per l'Innovazione egli Acquisti - ARIA SpA",
          count: 8,
        },
        {
          producerName: 'GEROPA SRL',
          count: 6,
        },
        {
          producerName: 'Poste Italiane Spa',
          count: 3,
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
          producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
          count: 129,
        },
        {
          producerName: "Ministero dell'Interno",
          count: 67,
        },
        {
          producerName: 'PagoPA S.p.A.',
          count: 43,
        },
        {
          producerName: 'Regione Liguria',
          count: 29,
        },
        {
          producerName: "Agenzia per L'Italia Digitale",
          count: 24,
        },
        {
          producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
          count: 22,
        },
        {
          producerName: 'Comune di San Giovanni Rotondo',
          count: 19,
        },
        {
          producerName: 'Agenzia delle Entrate',
          count: 14,
        },
        {
          producerName: 'Comune di Brescia',
          count: 13,
        },
        {
          producerName: 'Comune di Torino',
          count: 13,
        },
      ],
    },
    {
      id: '1',
      name: 'Altre Pubbliche Amministrazioni locali',
      data: [
        {
          producerName: "Agenzia per L'Italia Digitale",
          count: 24,
        },
        {
          producerName:
            'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
          count: 10,
        },
        {
          producerName: 'Ispettorato Nazionale del Lavoro',
          count: 1,
        },
        {
          producerName: 'Consiglio Nazionale Forense',
          count: 1,
        },
        {
          producerName: 'Consorzio Comuni Bacino Imbrifero Montano di Valle Camonica',
          count: 1,
        },
        {
          producerName: "Autorita' di sistema portuale del Mare Adriatico settentrionale",
          count: 1,
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
          producerName: 'Comune di San Giovanni Rotondo',
          count: 19,
        },
        {
          producerName: 'Comune di Torino',
          count: 13,
        },
        {
          producerName: 'Comune di Brescia',
          count: 13,
        },
        {
          producerName: 'Comune di Cavalese',
          count: 11,
        },
        {
          producerName: 'Comune di Massa',
          count: 10,
        },
        {
          producerName: 'Comune di Ancona',
          count: 9,
        },
        {
          producerName: 'Comune di Olbia',
          count: 8,
        },
        {
          producerName: 'ROMA CAPITALE',
          count: 8,
        },
        {
          producerName: 'Comune di Trento',
          count: 7,
        },
        {
          producerName: 'Comune di Oncino',
          count: 7,
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
      data: [
        {
          producerName: "Ministero dell'Interno",
          count: 67,
        },
        {
          producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
          count: 22,
        },
        {
          producerName: 'Agenzia delle Entrate',
          count: 14,
        },
        {
          producerName: 'Ministero della Giustizia',
          count: 10,
        },
        {
          producerName: 'Ministero delle infrastrutture e dei trasporti',
          count: 10,
        },
        {
          producerName: 'Ministero del Lavoro e delle Politiche Sociali',
          count: 9,
        },
        {
          producerName: 'Presidenza del Consiglio dei Ministri',
          count: 9,
        },
        {
          producerName: "MINISTERO DELL'UNIVERSITA' E DELLA RICERCA",
          count: 6,
        },
        {
          producerName: 'Agenzia delle Entrate - Riscossione',
          count: 3,
        },
      ],
    },
    {
      id: '6',
      name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
      data: [
        {
          producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
          count: 129,
        },
        {
          producerName:
            "Istituto Nazionale per l'Assicurazione contro gli Infortuni sul Lavoro - INAIL",
          count: 2,
        },
      ],
    },
    {
      id: '7',
      name: 'Regioni e Province autonome',
      data: [
        {
          producerName: 'Regione Liguria',
          count: 29,
        },
        {
          producerName: 'Regione Piemonte',
          count: 11,
        },
        {
          producerName: 'Regione Autonoma Friuli-Venezia Giulia',
          count: 5,
        },
        {
          producerName: 'Provincia Autonoma di Trento',
          count: 4,
        },
        {
          producerName: 'Regione Marche',
          count: 4,
        },
        {
          producerName: 'Regione Lombardia',
          count: 3,
        },
        {
          producerName: 'Regione Emilia-Romagna',
          count: 2,
        },
        {
          producerName: 'Regione Toscana',
          count: 2,
        },
        {
          producerName: "Regione Autonoma Valle D'Aosta",
          count: 1,
        },
      ],
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
      data: [
        {
          producerName: 'Conservatorio Statale di Musica G. Rossini',
          count: 2,
        },
        {
          producerName: "Universita' degli Studi di Messina",
          count: 1,
        },
      ],
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
          count: 43,
        },
        {
          producerName: "Azienda Regionale per l'Innovazione egli Acquisti - ARIA SpA",
          count: 8,
        },
        {
          producerName: 'GEROPA SRL',
          count: 6,
        },
        {
          producerName: 'Poste Italiane Spa',
          count: 3,
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
  const [providersCategory, setProvidersCategory] = React.useState<MacroCategory['id'][]>(['5'])

  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    providersCategory: MacroCategory['id'][]
  }>({ timeframe, providersCategory: providersCategory })

  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const midGrey = useTheme().palette.grey[500]
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const currentData = React.useMemo(() => {
    return mockData[currentSearch.timeframe]
      .filter((x) => providersCategory.includes(x.id as MacroCategory['id']))
      .flatMap((it) => it.data)
      .sort((a, b) => b.count - a.count)
      .slice(0, NUMBERS_OF_ELEMENTS_TO_SHOW)
  }, [data, currentSearch])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const sortedData = currentData?.reverse()
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
      currentData?.map((x) => [x.producerName, formatThousands(x.count).toString()]) || []
    return { head, body }
  }, [currentData])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({ timeframe, providersCategory: providersCategory })
  }

  return (
    <ChartAndTableWrapper
      title="Enti che pubblicano più e-service"
      description="I 10 enti erogatori con più e-service pubblicati"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack>
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
          <MacroCategoryMultipleSelectInput
            values={providersCategory}
            onChange={setProvidersCategory}
          />{' '}
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
