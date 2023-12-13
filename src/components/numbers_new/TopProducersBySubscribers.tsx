/* eslint-disable */
import React from 'react'
import { Button, Link, Stack, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import uniq from 'lodash/uniq'
import { TopProducersBySubscribersMetric } from '@/models/numbers_new.models'
import GovItLink from './GovItLink'
import { formatThousands } from '@/utils/formatters.utils'
import { MACROCATEGORIES_COLORS, MACROCATEGORIES_LINK_HREF } from '@/configs/constants.config'

const LABEL_SIZE_DESKTOP = 200
const LABEL_SIZE_MOBILE = 120

const TopProducersBySubscribers = ({ data }: { data: TopProducersBySubscribersMetric }) => {
  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
  }>({ timeframe })

  const currentData = data[currentSearch.timeframe]

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const names = uniq(
      currentData.flatMap((x) => [x.producerName, ...x.macroCategories.map((y) => y.name)])
    ).map((x) => ({ name: x }))

    const links = currentData.flatMap((x) =>
      x.macroCategories.map((y) => ({
        source: x.producerName,
        target: y.name,
        value: y.subscribersCount,
        lineStyle: {
          color: MACROCATEGORIES_COLORS[Number(y.id) as keyof typeof MACROCATEGORIES_COLORS],
        },
      }))
    )

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

          let case1 = `Erogatore: <strong>${source}</strong><br/>
          Macrocategoria di fruitore: <strong>${target}</strong><br/>
          Numero di enti iscritti: <strong>${formatThousands(value)}</strong>`

          let case2 = `Erogatore: <strong>${n.name}</strong><br/>
          Numero di enti iscritti: <strong>${formatThousands(n.value)}</strong>`

          return value ? case1 : case2
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
  }, [currentData, textColorPrimary, mediaQuerySm, fontFamily])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Ente erogatore', 'Ente fruitore', 'Numero di richieste']
    const body = currentData.flatMap((x) =>
      x.macroCategories.map((y) => [
        x.producerName,
        y.name,
        formatThousands(y.subscribersCount).toString(),
      ])
    )

    return { head, body }
  }, [currentData])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({ timeframe })
  }

  return (
    <ChartAndTableWrapper
      title="Flussi di richieste tra enti"
      description="I 10 enti con maggior numero di richieste di fruizione suddivise per categoria di enti fruitori"
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
        chartHeight={800}
        tableData={tableData}
        info={Info}
        childrenPosition="top"
      >
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
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
      <Stack direction="row" justifyContent="space-between">
        <GovItLink />
      </Stack>
    </ChartAndTableWrapper>
  )
}

const Info = (
  <React.Fragment>
    <Typography color="text.secondary">
      La relazione si stabilisce se l’ente fruitore ha fatto almeno 1 richiesta di abilitazione ad
      almeno 1 e-service dell’ente erogatore, e la richiesta è stata accettata.
    </Typography>
    <Typography color="text.secondary">
      Le categorie di fruitori sono riportate nel{' '}
      <Link underline="hover" href={MACROCATEGORIES_LINK_HREF} target="_blank">
        file
      </Link>
      .
    </Typography>
  </React.Fragment>
)

export default TopProducersBySubscribers
