import React from 'react'
import { Typography, useMediaQuery, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { MacroCategory, Timeframe, TopEservicesByTokenMetric } from '@/models/numbers.models'
import * as ECharts from 'echarts'
// import GovItLink from './GovItLink'
import { formatThousands, formatThousandsForMobile } from '@/utils/formatters.utils'
import {
  BAR_CHART_NUMERIC_LABEL_COLOR,
  NUMBERS_OF_ELEMENTS_TO_SHOW,
  PRIMARY_BLUE,
} from '@/configs/constants.config'
import { FiltersStack } from './FiltersStack'
import { MacroCategorySelectInput } from './MacroCategorySelectInput'
import { MacrocategoriesLink } from './MacrocategoriesLink'

const ToopEservicesByToken = ({ data }: { data: TopEservicesByTokenMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [consumerCategory, setConsumerCategory] = React.useState<MacroCategory['id']>('0')

  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    consumerCategory: MacroCategory['id']
  }>({ timeframe, consumerCategory: consumerCategory })

  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary

  const midGrey = useTheme().palette.grey[500]
  const mediaQuerySm = useTheme().breakpoints.values.sm
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))

  const tooltip = {
    trigger: 'item',
    formatter: (data: { name: string; color: string; value: number }) => {
      const splittedName = data.name.split('(')
      const eServiceName = splittedName[0]
      const providerName = splittedName[1].replace(')', '')

      return `
      <div style="display:flex; flex-direction:column; padding-bottom:5px;">
        <strong>${eServiceName}</strong>      
        <span>${providerName}</span>      
      </div>
      <div style="display:flex; justify-content: start; flex-direction :column;">
        <div style="display:flex;  margin-right:5px;  align-items: center;justify-content: start;">
          <div style=" width: 10px;height: 10px;background: 
          ${data.color}; border-radius:10px; margin-right:6px;">
          </div>
          <div>
            <span>
               ${formatThousands(data.value)} enti abilitati
            </span>
          </div>
        </div>
      </div>`
    },
  }

  const currentData = React.useMemo(() => {
    return data[currentSearch.timeframe]
      .filter((x) => currentSearch.consumerCategory === x.id)
      .flatMap((it) => it.data)
      .sort((a, b) => b.tokenCount - a.tokenCount)
      .slice(0, NUMBERS_OF_ELEMENTS_TO_SHOW)
  }, [data, currentSearch])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const sortedData = currentData?.reverse()
    const yAxisData = sortedData?.map((x) => `${x.eserviceName} (${x.producerName})`)
    const seriesData = sortedData?.map((x) => x.tokenCount)

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
      tooltip: tooltip,
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
        name: 'Sessioni di scambio',
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
          formatter: (val: number) =>
            isMobile ? formatThousandsForMobile(val) : formatThousands(val),
        },
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          color: PRIMARY_BLUE,
          barWidth: 12,
          label: {
            formatter: (val: { data: number }) =>
              isMobile ? formatThousandsForMobile(val.data) : formatThousands(val.data),
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
        bottom: 55,
      },
    } as any //eslint-disable-line
  }, [currentData, textColorPrimary, mediaQuerySm, midGrey, fontFamily])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Erogatore', 'Sessioni di scambio']
    const body =
      currentData
        ?.sort((a, b) => b.tokenCount - a.tokenCount)
        .map((x) => [x.producerName, formatThousands(x.tokenCount).toString()]) || []
    return { head, body }
  }, [currentData])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({ timeframe, consumerCategory: consumerCategory })
  }

  return (
    <ChartAndTableWrapper
      title="E-service più utilizzati, per sessioni di scambio"
      description="Gli e-service ordinati per numero di sessioni di scambio nel periodo selezionato"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack>
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
          <MacroCategorySelectInput value={consumerCategory} onChange={setConsumerCategory} />{' '}
        </FiltersStack>
      </form>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        info={Info}
        ariaLabel={`Grafico che mostra la top 10 degli enti che pubblicano più e-service. ${tableData.body
          .map((i) => `${i[0]} con ${i[1]} iscritti`)
          .join('; ')}`}
      />
      {/* <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <GovItLink metricName="entiChePubblicanoPiuEService" timeframe={currentSearch.timeframe} />
      </Stack> */}
    </ChartAndTableWrapper>
  )
}

const Info = (
  <Typography color="text.secondary" variant="body2">
    Il valore per ogni e-service è calcolato contando il numero di sessioni di scambio (numero
    totale di voucher) nel periodo selezionato. Le categorie di fruitori sono riportate nel{' '}
    <MacrocategoriesLink />.
  </Typography>
)

export default ToopEservicesByToken
