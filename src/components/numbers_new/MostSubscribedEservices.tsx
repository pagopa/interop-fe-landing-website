import React from 'react'
import { Link, Stack, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { MacroCategory, Timeframe } from '@/models/numbers.models'
import { MacroCategorySelectInput } from '@/components/numbers/MacroCategorySelectInput'
import * as ECharts from 'echarts'
import { IconLink } from '@/components/IconLink'
import DownloadIcon from '@mui/icons-material/Download'
import { MostSubscribedEServicesMetric } from '@/models/numbers_new.models'

const MostSubscribedEServices = ({ data }: { data: MostSubscribedEServicesMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [macroCategory, setMacroCategory] = React.useState<MacroCategory['id']>('0')

  const barColor = useTheme().palette.primary.main

  const currentData = React.useMemo(() => {
    const macroCategoryData = data.find((x) => x.id === macroCategory)!
    return macroCategoryData.mostSubscribedEServices[timeframe]
  }, [timeframe, macroCategory, data])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const yAxisData = currentData.map((x) => `{a|${x.eserviceName}} {b|(${x.producerName})}`)
    const seriesData = currentData.map((x) => x.subscribersCount)

    // return {
    //   tooltip: {
    //     trigger: 'item',
    //   },
    //   yAxis: {
    //     type: 'category',
    //     data: yAxisData,
    //     axisLabel: {
    //       width: 400,
    //       overflow: 'truncate',
    //       rich: {
    //         a: {
    //           color: 'black',
    //         },
    //         b: {
    //           color: 'darkGrey',
    //         },
    //       },
    //     },
    //   },
    //   xAxis: {
    //     type: 'value',
    //   },
    //   series: [
    //     {
    //       data: seriesData,
    //       type: 'bar',
    //       color: barColor,
    //       itemStyle: {
    //         borderRadius: [0, 20, 20, 0],
    //       },
    //       barWidth: 12,
    //     },
    //   ],
    //   grid: {
    //     containLabel: true,
    //     top: 0,
    //     bottom: 0,
    //   },
    // }

    return {
      tooltip: {
        trigger: 'item',
      },
      yAxis: {
        type: 'category',
        data: yAxisData,
        axisTick: {
          show: false,
        },
        axisLabel: {
          align: 'left',
          verticalAlign: 'bottom',
          margin: -10,
          width: 400,
          height: 20,
          rich: {
            a: {
              color: 'black',
            },
            b: {
              color: 'darkGrey',
            },
          },
          overflow: 'truncate',
        },
      },
      xAxis: {
        type: 'value',
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          color: barColor,
          itemStyle: {
            borderRadius: [0, 20, 20, 0],
          },
          barWidth: 12,
        },
      ],
      grid: {
        right: 30,
        left: 5,
      },
    }
  }, [currentData, barColor])

  const tableData: TableData = React.useMemo(() => {
    const head = ['E-service', 'Numero di richieste']
    const body = currentData.map((x) => [
      `${x.eserviceName} (${x.producerName})`,
      x.subscribersCount.toString(),
    ])

    return { head, body }
  }, [currentData])

  return (
    <ChartAndTableWrapper
      title="E-service più richiesti"
      description="E-service ordinati per numero di richieste di fruizione, totale e per categoria di ente erogatore"
    >
      <Stack sx={{ mb: 3 }} direction="row" spacing={3}>
        <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
        <MacroCategorySelectInput value={macroCategory} onChange={setMacroCategory} />
      </Stack>
      <ChartAndTableTabs chartOptions={chartOptions} tableData={tableData} />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2">
          Fonte:{' '}
          <Link href="https://dati.gov.it" target="_blank">
            dati.gov.it
          </Link>
        </Typography>
        <IconLink
          component="button"
          alignSelf="end"
          onClick={() => console.log('TODO handle download')}
          endIcon={<DownloadIcon />}
        >
          Scarica CSV
        </IconLink>
      </Stack>
    </ChartAndTableWrapper>
  )
}

export default MostSubscribedEServices
