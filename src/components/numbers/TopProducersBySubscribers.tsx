/* eslint-disable */
import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { MacroCategory, Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import uniq from 'lodash/uniq'
import { TopProducersBySubscribersMetric } from '@/models/numbers.models'
// import GovItLink from './GovItLink'
import { formatThousands } from '@/utils/formatters.utils'
import { MACROCATEGORIES_COLORS, NUMBERS_OF_ELEMENTS_TO_SHOW } from '@/configs/constants.config'
import { FiltersStack } from './FiltersStack'
import { MacrocategoriesLink } from './MacrocategoriesLink'
import { MacroCategoryMultipleSelectInput } from './MacroCategoryMultipleSelectInput'

const LABEL_SIZE_DESKTOP = 200
const LABEL_SIZE_MOBILE = 120

const TopProducersBySubscribers = ({ data }: { data: TopProducersBySubscribersMetric }) => {
  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [providersCategory, setProvidersCategory] = React.useState<MacroCategory['id'][]>([
    '5',
    '12',
  ])
  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    providersCategory: MacroCategory['id'][]
  }>({ timeframe, providersCategory: providersCategory })

  const currentData = data[currentSearch.timeframe]

  const filteredCurrentData = React.useMemo(() => {
    return data[currentSearch.timeframe]
      .filter((x) => currentSearch.providersCategory.includes(x.id as MacroCategory['id']))
      .flatMap((x) => {
        return x.data
      })
  }, [data, currentSearch])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const links = filteredCurrentData
      .flatMap((x) =>
        x.macroCategories.map((y) => ({
          source: x.producerName,
          target: y.name,
          value: y.subscribersCount,
          lineStyle: {
            color: MACROCATEGORIES_COLORS[Number(y.id) as keyof typeof MACROCATEGORIES_COLORS],
          },
        }))
      )
      .sort((a, b) => b.value - a.value)
      .slice(0, NUMBERS_OF_ELEMENTS_TO_SHOW)

    const names = uniq(
      links.reduce(
        (a, currentValue) => [...a, currentValue.source, currentValue.target],
        [] as string[]
      )
    ).map((x) => ({ name: x }))
    return {
      media: [
        {
          query: {
            minWidth: mediaQuerySm,
          },
          option: {
            series: {
              right: LABEL_SIZE_DESKTOP,
              label: {
                width: LABEL_SIZE_DESKTOP,
              },
            },
          },
        },
      ],
      textStyle: {
        fontFamily,
      },
      tooltip: {
        show: true,
        borderColor: '#000000',
        formatter: (n: any) => {
          // @ts-ignore-next-line
          const { source, target, value } = n.data
          const subscribersString = `<strong style="margin-left: 12px;">${formatThousands(
            n.value
          )} connessioni</strong>`
          const case1 = `${source} — ${target}`
          const case2 = n.name

          return `${value ? case1 : case2} ${subscribersString}`
        },
      },
      series: {
        type: 'sankey',
        left: 0,
        right: LABEL_SIZE_MOBILE,
        top: 10,
        bottom: 20,
        nodeWidth: 5,
        nodeGap: 14,
        draggable: false,
        layout: 'none',
        emphasis: {
          focus: 'adjacency',
        },
        itemStyle: {
          color: '#000000',
        },
        lineStyle: {
          color: 'target',
        },
        data: names,
        links,
        label: {
          formatter: (a) => a.name,
          fontSize: 14,
          color: textColorPrimary,
          width: LABEL_SIZE_MOBILE,
          overflow: 'truncate',
        },
      },
    }
  }, [currentData, textColorPrimary, mediaQuerySm, fontFamily, filteredCurrentData])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Ente erogatore', 'Ente fruitore', 'Numero di richieste']
    const body = filteredCurrentData.flatMap((x) =>
      x.macroCategories.map((y) => [
        x.producerName,
        y.name,
        formatThousands(y.subscribersCount).toString(),
      ])
    )

    return { head, body }
  }, [currentData, filteredCurrentData])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({
      timeframe,
      providersCategory: providersCategory,
    })
  }

  return (
    <ChartAndTableWrapper
      title="Enti con più connessioni abilitate"
      description="Gli enti erogatori che hanno abilitato più enti fruitori"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack>
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
          <MacroCategoryMultipleSelectInput
            values={providersCategory}
            onChange={setProvidersCategory}
          />
        </FiltersStack>
      </form>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        chartHeight={600}
        tableData={tableData}
        info={Info}
        childrenPosition="top"
        ariaLabel="Grafico che mostra i flussi di richieste da enti erogatori a macrocategorie di fruitori"
      >
        <Stack direction="row" justifyContent="space-between" sx={{ my: 3 }}>
          <Typography variant="body2" aria-hidden={true} sx={{ fontWeight: 600 }} component="span">
            EROGATORI
          </Typography>
          <Typography
            variant="body2"
            aria-hidden={true}
            sx={{
              fontWeight: 600,
              width: { xs: `${LABEL_SIZE_MOBILE}px`, sm: `${LABEL_SIZE_DESKTOP}px` },
            }}
            component="span"
          >
            FRUITORI
          </Typography>
        </Stack>
      </ChartAndTableTabs>

      <Stack direction="column" sx={{ mt: 3 }}>
        <Typography variant="caption" sx={{ mb: 2, fontWeight: 600 }}>
          Legenda
        </Typography>
        <Stack direction="row">
          <LegendSVG />
          <Typography variant="caption" sx={{ mb: 2, fontWeight: 300 }}>
            = 1 connessione
          </Typography>
        </Stack>
      </Stack>

      {/* <Stack direction="row" justifyContent="space-between">
        <GovItLink metricName="connessioniFraEnti" timeframe={currentSearch.timeframe} />
      </Stack> */}
    </ChartAndTableWrapper>
  )
}

const Info = (
  <React.Fragment>
    <Typography color="text.secondary" variant="body2">
      La connessione si stabilisce se l’ente fruitore ha fatto almeno 1 richiesta di abilitazione
      (richiesta di fruizione) ad almeno 1 e-service dell’ente erogatore, e la richiesta è stata
      accettata.
    </Typography>
    <Typography color="text.secondary" variant="body2">
      Le categorie di fruitori sono riportate nel <MacrocategoriesLink />.
    </Typography>
  </React.Fragment>
)

const LegendSVG = () => {
  return (
    <svg width="25" height="49" viewBox="0 0 45 49" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" x2="20" y1="0" y2="0" stroke="#E69000" strokeWidth="1" />
    </svg>
  )
}

export default TopProducersBySubscribers
