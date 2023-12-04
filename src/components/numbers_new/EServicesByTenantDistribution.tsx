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

const EServicesByTenantDistribution = ({ data, totale }: { data: TenantDistributionCount[], totale:number}) => {

  let dataChart: any[] = []
  let dataColorChart: any[]= []
  let titleChart = `Totale Enti \n${totale}`

  data.map(item => {
    dataChart.push({value:item.count,name:item.activity })
    dataColorChart.push(MACROCATEGORIES_COLORS_MAP.get(item.activity))
  })

  const tableData: TableData = React.useMemo(() => {
    const head = ["Categoria d'ente", 'Enti aderenti']
    const body = data.map(({ activity, count }) => [activity, formatThousands(count).toString()])
    console.log(body)
    return { head, body }
  }, [data])


  

  const chartOptions: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item'
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
        color:dataColorChart,
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
      Il totale per categoria è calcolato aggregando il numero di e-service unici pubblicati e
      attivi.
    </Typography>
    <Typography color="text.secondary">
      Le categorie sono riportate nel{' '}
      <Link underline="hover" href={CHART_INFO_SHARE_URL} target="_blank">
        file
      </Link>
      .
    </Typography>
  </React.Fragment>
)



export default EServicesByTenantDistribution
