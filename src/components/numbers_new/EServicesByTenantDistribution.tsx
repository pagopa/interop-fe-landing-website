import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { formatThousands } from '@/utils/formatters.utils'
import GovItLink from './GovItLink'
import { TenantDistributionCount } from '@/models/numbers_new.models'
import * as echarts from 'echarts'
import { MACROCATEGORIES_COLORS_MAP } from '@/configs/constants.config'
import { Box } from '@mui/system'

const PACK_SIZE = 340

const EServicesByTenantDistribution = ({
  data,
  totale,
}: {
  data: TenantDistributionCount[]
  totale: number
}) => {
  const primaryText = useTheme().palette.text.primary
  const fontFamily = useTheme().typography.fontFamily
  const dataChart: Array<{ value: number; name: string }> = []
  const dataColorChart: Array<string> = []

  data.map((item) => {
    dataChart.push({ value: item.count, name: item.activity })
    dataColorChart.push(MACROCATEGORIES_COLORS_MAP.get(item.activity) as string)
  })

  const tableData: TableData = React.useMemo(() => {
    const head = ["Categoria d'ente", 'Enti aderenti']
    const body = data.map(({ activity, count }) => [activity, formatThousands(count).toString()])

    return { head, body }
  }, [data])

  const chartOptions: echarts.EChartsOption = {
    textStyle: {
      fontFamily: fontFamily,
    },
    tooltip: {
      trigger: 'item',
      valueFormatter: (value) => formatThousands(value as number),
    },
    grid: {
      top: 0,
    },
    title: {
      text: 'Totale Enti',
      textStyle: {
        fontSize: 14,
        fontWeight: 600,
        color: primaryText,
      },
      subtext: formatThousands(totale),
      subtextStyle: {
        fontSize: 18,
        fontWeight: 600,
        color: primaryText,
      },
      itemGap: 12,
      left: 'center',
      right: 'center',
      top: 120,
      bottom: 'center',
    },
    legend: {
      padding: 0,
      left: 0,
      bottom: 0,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 8,
      itemStyle: {
        borderWidth: 0,
      },
    },
    series: [
      {
        center: ['50%', 140],
        type: 'pie',
        radius: [80, 120],
        avoidLabelOverlap: true,
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        color: dataColorChart,
        labelLine: {
          show: false,
        },
        data: dataChart,
      },
    ],
  }

  return (
    <React.Fragment>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={PACK_SIZE}
        info={Info}
        childrenPosition="bottom"
        ariaLabel={`Grafico che mostra la distribuzione degli enti per attività. ${tableData.body
          .map((i) => `${i[0]}: ${i[1]} enti`)
          .join('; ')}`}
      />
      <Stack direction="row" justifyContent="space-between">
        <GovItLink />
      </Stack>
    </React.Fragment>
  )
}

const Info = (
  <Typography color="text.secondary">
    Nella categoria “solo accesso” sono inclusi gli enti che:
    <Box component="ul" sx={{ m: 0 }}>
      <Box component="li">
        hanno completato il processo di adesione e hanno effettuato almeno un accesso alla
        piattaforma, ma attualmente non erogano nè fruiscono degli e-service;
      </Box>
      <Box component="li">in passato hanno erogato un e-service che oggi non è più attivo.</Box>
    </Box>
    Nella categoria “fruitori” sono inclusi gli enti che hanno effettuato almeno una richiesta di
    abilitazione ad un e-service.
  </Typography>
)

export default EServicesByTenantDistribution
