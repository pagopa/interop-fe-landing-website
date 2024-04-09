/* eslint-disable */
import {
  MacroCategory,
  TimeMetricKeys,
  Timeframe,
  TopEServiceMetricItem,
  TopEservicesData,
  TopEservicesMetric,
} from '@/models/numbers.models'
import { ChartAndTableWrapper } from './ChartAndTableWrapper'
import React from 'react'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
import { FiltersStack } from './FiltersStack'
import { TimeframeSelectInput } from './TimeframeSelectInput'
import { MacroCategorySelectInput } from './MacroCategorySelectInput'
import {
  macroCategoriesOptions,
  MACROCATEGORIES,
  MACROCATEGORIES_COLORS_MAP,
  BAR_CHART_NUMERIC_LABEL_COLOR,
} from '@/configs/constants.config'
import { Typography, useMediaQuery, useTheme } from '@mui/material'
import { formatThousands } from '@/utils/formatters.utils'
import * as echarts from 'echarts'
import { MacrocategoriesLink } from './MacrocategoriesLink'

type TopEServicesProps = {
  data: TopEservicesMetric
}
const TopEservices = ({ data }: TopEServicesProps) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [consumerCategory, setConsumerCategory] = React.useState<MacroCategory['id']>('5')
  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    consumerCategory: MacroCategory['id']
  }>({
    timeframe: timeframe,
    consumerCategory: consumerCategory,
  })
  const fontFamily = useTheme().typography.fontFamily
  const midGrey = useTheme().palette.grey[500]
  const xAxisColorLabel = useTheme().palette.grey[800]
  const mediaQuerySm = useTheme().breakpoints.values.sm
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))
  const textColorPrimary = useTheme().palette.text.primary

  const formattedChartsData = React.useMemo(() => {
    const result: TopEservicesMetric = {
      lastSixMonths: [],
      lastTwelveMonths: [],
      fromTheBeginning: [],
    }
    Object.keys(data).forEach((key: string) => {
      const timeframesData = data[key as TimeMetricKeys]
      result[key as TimeMetricKeys] = timeframesData.map((item) => {
        return {
          ...item,
          data: item.data.map((d) => {
            return {
              ...d,
              activeConsumersByMacroCategory: macroCategoriesOptions.map((mc) => {
                const obj = d.activeConsumersByMacroCategory.find((o) => o.id == mc.value)
                return obj
                  ? obj
                  : {
                      id: mc.value,
                      name: mc.label,
                      count: null,
                    }
              }),
            }
          }),
        }
      }) as TopEServiceMetricItem[]
    })

    return result
  }, [data])

  const currentData = React.useMemo(() => {
    return formattedChartsData[currentSearch.timeframe].find(
      (it) => it.id === currentSearch.consumerCategory
    )!
  }, [formattedChartsData, currentSearch])

  const tableData: TableData = React.useMemo(() => {
    const head = ['E-service', 'Numero di richieste']
    const body = currentData.data
      .sort((a, b) => b.totalActiveConsumers - a.totalActiveConsumers)
      .map((item) => [
        `${item.eserviceName} (${item.producerName})`,
        formatThousands(item.totalActiveConsumers).toString(),
      ])

    return { head, body }
  }, [currentData])

  const tooltip = {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: (data: any) => {
      const splittedName = data[0].name.split('(')
      const eServiceName = splittedName[0]
      const providerName = splittedName[1].replace(')', '')
      const total: number = data.reduce(
        (acc: number, currentValue: { value: number }) => (acc = acc + (currentValue.value || 0)),
        0
      )
      const res: string = data
        .map((d: any) =>
          d.value
            ? `<div style="display:flex; flex-direction:row;">
                <div style=" width: 10px;height: 10px;background: ${d.color}; border-radius:10px; margin-right:6px;margin-top:6px;">
                </div>
                  <div style="width: 85%; text-wrap:wrap;">${d.seriesName}</div>
                  <div style="margin-left:auto;">${d.value}</div>
                </div>`
            : null
        )
        .filter(Boolean)
        .join('')

      return `
      <div style="display:flex; flex-direction:column; padding-bottom:5px;">
        <strong>E-service: ${eServiceName}</strong>  
        <span style="margin-bottom:8px;">Erogatore: ${providerName}</span> 
          <div style="display:flex; flex-direction:column">
              ${res}
          </div>  
          <div style="display:flex; flex-direction:row; margin-top:8px;">
            <strong>Totale</strong>
            <div style="margin-left:auto;">${total}</div>
          </div>    
      </div>
      `
    },
  }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({
      timeframe: timeframe,
      consumerCategory: consumerCategory,
    })
  }

  /**
   * This method split out count value for each macro-categories
   * @param data
   * @returns
   */
  const groupingActiveConsumersByMacroCategories = (data: TopEservicesData[]) => {
    const response: Record<MacroCategory['id'], (number | null)[]> = {} as any
    data.forEach((it) => {
      it.activeConsumersByMacroCategory.forEach((test) => {
        if (!response[test.id]) {
          response[test.id] = []
        }
        response[test.id].push(test.count)
      })
      return it
    })

    return response
  }

  const chartOptions = React.useMemo(() => {
    const sortedDataByActiveConsumers = currentData.data.sort(
      (a, b) => a.totalActiveConsumers - b.totalActiveConsumers
    )
    const yAxisData = sortedDataByActiveConsumers?.map(
      (x) => `${x.eserviceName} (${x.producerName})`
    )

    const groupedDataByMacroCategories = groupingActiveConsumersByMacroCategories(
      sortedDataByActiveConsumers
    )

    const seriesData = Object.keys(groupedDataByMacroCategories).map((key) => {
      return {
        name: MACROCATEGORIES[key as MacroCategory['id']],
        type: 'bar',
        stack: 'total',
        label: {
          show: false,
          position: 'insideRight',
          distance: -5,
          align: 'left',
          backgroundColor: 'white',
          color: BAR_CHART_NUMERIC_LABEL_COLOR,
        },
        color: MACROCATEGORIES_COLORS_MAP.get(MACROCATEGORIES[key as MacroCategory['id']]),
        emphasis: {
          focus: 'series',
        },
        barWidth: 12,
        data: groupedDataByMacroCategories[key as MacroCategory['id']],
      }
    })

    const legend: echarts.LegendComponentOption = {
      show: isMobile ? false : true,
      bottom: 0,
      left: 'left',
      selectedMode: false,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 8,
    }

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
          color: xAxisColorLabel,
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
          fontSize: 12,
        },
      },
      series: seriesData,
      grid: {
        right: 30,
        left: 5,
        top: 20,
        bottom: 100,
      },
      legend: legend,
      legendSelectedMode: true,
    } as echarts.EChartsOption
  }, [currentData])

  return (
    <ChartAndTableWrapper
      title="E-service più utilizzati, per enti fruitori attivi"
      description="Gli e-service ordinati per numero di enti che hanno attivato almeno una sessione di scambio nel periodo selezionato"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack>
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
          <MacroCategorySelectInput value={consumerCategory} onChange={setConsumerCategory} />{' '}
        </FiltersStack>
      </form>
      <ChartAndTableTabs
        notMergeData
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={580}
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
    Il valore per ogni e-service è calcolato contando gli enti fruitori attivi, cioè che hanno
    attivato almeno 1 sessione di scambio (richiesta di voucher) nel periodo selezionato. Le
    categorie di fruitori sono riportate nel <MacrocategoriesLink />.
  </Typography>
)

export default TopEservices
