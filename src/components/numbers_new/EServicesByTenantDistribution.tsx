import React from 'react'
import { Link, Stack, Typography, useTheme } from '@mui/material'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { formatThousands } from '@/utils/formatters.utils'
import { pack, hierarchy } from 'd3-hierarchy'
import GovItLink from './GovItLink'
import { EServicesByMacroCategoriesMetric, TenantDistributionCount } from '@/models/numbers_new.models'
import * as echarts from 'echarts'
import sortBy from 'lodash/sortBy'
import { CHART_INFO_SHARE_URL, MACROCATEGORIES_COLORS, MACROCATEGORIES_COLORS_MAP } from '@/configs/constants.config'

const PACK_SIZE = 300

const EServicesByTenantDistribution = ({ data, totale }: { data: TenantDistributionCount[], totale: number }) => {

  let dataChart: any[] = []
  let dataColorChart: any[] = []
  let titleChart = `Totale Enti \n${formatThousands(totale)}`

  data.map(item => {
    dataChart.push({ value: item.count, name: item.activity })
    dataColorChart.push(MACROCATEGORIES_COLORS_MAP.get(item.activity))
  })

  const tableData: TableData = React.useMemo(() => {
    const head = ["Categoria d'ente", 'Enti aderenti']
    const body = data.map(({ activity, count }) => [activity, formatThousands(count).toString()])
  
    return { head, body }
  }, [data])




  const chartOptions: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      valueFormatter: (value:any) => formatThousands(value)
    },
    legend: {
      bottom: '1%',
      left: 'center'
    },
    title: {
      text: `${titleChart}`,
      left: 'center',
      top: 'center',

    },
    series: [
      {
        // name: '',
        type: 'pie',
        radius: ['55%', '80%'],
        avoidLabelOverlap: true,
        label: {
          show: false,
          position: 'center',
          formatter: () => ''
        },


        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        color: dataColorChart,
        labelLine: {
          show: false
        },
        data: dataChart
      }
    ]
  };

  return (
    <Stack sx={{ py: 3 }}>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={PACK_SIZE}
        info={Info}
        childrenPosition="bottom"
      >

        <Stack direction="row" justifyContent="space-between">
          <GovItLink />
        </Stack>
      </ChartAndTableTabs>
    </Stack>

  )
}

const Info = (
  <React.Fragment>
    <Typography color="text.secondary">
      Nella categoria “solo accesso” sono inclusi gli enti che:
    </Typography>
 
    <Stack sx={{ flexDirection: 'row' }}>
      <Stack sx={{ width: '14px', height: '8px', background: 'black', borderRadius: 50, margin: '10px' }}></Stack>
      <Typography color="text.secondary">
        hanno completato il processo di adesione e hanno effettuato almeno un accesso alla piattaforma, ma attualmente non erogano nè fruiscono degli e-service.</Typography>
    </Stack>
    <Stack sx={{ flexDirection: 'row' }}>
      <Stack sx={{ width: '8px', height: '8px', background: 'black', borderRadius: 50, margin: '10px' }}></Stack>
      <Typography color="text.secondary">
        in passato hanno erogato un e-service che oggi non è più attivo </Typography>
    </Stack>
    <Typography color="text.secondary">
      Nella categoria “fruitori” sono inclusi gli enti che hanno effettuato almeno una richiesta di abilitazione ad un e-service.
    </Typography>
    {/* <Typography color="text.secondary">
      Le categorie sono riportate nel{' '}
      <Link underline="hover" href={CHART_INFO_SHARE_URL} target="_blank">
        file
      </Link>
      .
    </Typography> */}
  </React.Fragment>
)



export default EServicesByTenantDistribution
