import { MacroCategory, Timeframe, TopEservicesMetric } from '@/models/numbers.models'
import { Typography, useTheme } from '@mui/material'
import * as ECharts from 'echarts'
import React from 'react'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
import { ChartAndTableWrapper } from './ChartAndTableWrapper'
import { MacroCategorySelectInput } from './MacroCategorySelectInput'
import { TimeframeSelectInput } from './TimeframeSelectInput'
// import GovItLink from './GovItLink'
import {
  BAR_CHART_NUMERIC_LABEL_COLOR,
  MACROCATEGORIES_MAP,
  NUMBERS_OF_ELEMENTS_TO_SHOW,
  PRIMARY_BLUE,
} from '@/configs/constants.config'
import { formatThousands } from '@/utils/formatters.utils'
import { FiltersStack } from './FiltersStack'
import { MacroCategoryMultipleSelectInput } from './MacroCategoryMultipleSelectInput'
import { MacrocategoriesLink } from './MacrocategoriesLink'

const TopEServices = ({ data }: { data: TopEservicesMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('fromTheBeginning')
  const [providersCategory, setProviderCategory] = React.useState<MacroCategory['id'][]>([
    '9',
    '12',
  ])
  const [consumerCategory, setConsumerCategory] = React.useState<MacroCategory['id']>('0')

  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    providersCategory: MacroCategory['id'][]
    consumerCategory: MacroCategory['id']
  }>({ timeframe, providersCategory: providersCategory, consumerCategory: consumerCategory })

  const mediaQuerySm = useTheme().breakpoints.values.sm
  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const midGrey = useTheme().palette.grey[500]

  const currentData = React.useMemo(() => {
    const currentSelection = data[currentSearch.timeframe]
      .filter((x) => currentSearch.providersCategory.includes(x.id as MacroCategory['id']))
      .flatMap((it) => it.data)
      .filter((c) => c.id === currentSearch.consumerCategory)
      .flatMap((it) => it.mostConsumedEServices)
      .filter((it) => it.subscribersCount > 0)
      .sort((a, b) => b.subscribersCount - a.subscribersCount)
      .slice(0, NUMBERS_OF_ELEMENTS_TO_SHOW)

    return currentSelection
  }, [currentSearch, data])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const sortedData = [...currentData].reverse()
    const yAxisData = sortedData.map((x) => `${x.eserviceName} (${x.producerName})`)
    const seriesData = sortedData.map((x) => x.subscribersCount)

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
        extraCssText: 'white-space: normal',
        show: true,
        confine: true,
        valueFormatter: (value) => `${formatThousands(value as number)} enti fruitori attivi`,
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
        name: 'Enti fruitori attivi',
        nameGap: 40,
        nameLocation: 'middle',
        nameTextStyle: {
          fontSize: 14,
          fontWeight: 800,
          align: 'center',
          verticalAlign: 'middle',
        },
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
            formatter: ({ value }) => formatThousands(value ? Number(value) : 0),
          },
        },
      ],
      grid: {
        right: 30,
        left: 5,
        top: 20,
        bottom: 55,
      },
    }
  }, [currentData, fontFamily, textColorPrimary, mediaQuerySm, midGrey])

  const tableData: TableData = React.useMemo(() => {
    const head = ['E-service', 'Numero di richieste']
    const body = currentData.map((x) => [
      `${x.eserviceName} (${x.producerName})`,
      formatThousands(x.subscribersCount).toString(),
    ])

    return { head, body }
  }, [currentData])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({
      timeframe,
      providersCategory: providersCategory,
      consumerCategory: consumerCategory,
    })
  }
  return (
    <ChartAndTableWrapper
      title="E-service più utilizzati, per enti fruitori attivi"
      description="Gli e-service ordinati per numero di enti che hanno attivato almeno una sessione di scambio nel periodo selezionato"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack>
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
          <MacroCategoryMultipleSelectInput
            values={providersCategory}
            onChange={setProviderCategory}
          />
          <MacroCategorySelectInput value={consumerCategory} onChange={setConsumerCategory} />
        </FiltersStack>
      </form>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        info={Info}
        ariaLabel={`Grafico che mostra la top 10 degli e-service più utilizzati per enti fruitori attivi, filtrabile per macrocategoria di ente erogatore e ente fruitore. Macrocategoria ente fruitore attiva: ${
          MACROCATEGORIES_MAP[consumerCategory]
        }. Macrocategoria enti erogatori attiva: ${providersCategory
          .map((x) => MACROCATEGORIES_MAP[x])
          .join('; ')}.\n ${tableData.body.map((i) => `${i[0]} con ${i[1]} iscritti`).join('; ')}`}
      />
      {/* <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <GovItLink metricName="eServicePiuRichiesti" timeframe={currentSearch.timeframe} />
      </Stack> */}
    </ChartAndTableWrapper>
  )
}

const Info = (
  <Typography color="text.secondary" variant="body2">
    Il valore per ogni e-service è calcolato contando gli enti fruitori attivi, cioè che hanno
    attivato almeno 1 sessione di scambio (richiesta di voucher) nel periodo selezionato. Le
    categorie di erogatori e fruitori sono riportate nel <MacrocategoriesLink />.
  </Typography>
)
export default TopEServices
