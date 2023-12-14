import React from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material'
import * as echarts from 'echarts'

const CHART_HEIGHT_DEFAULT = 600

export type TableData = {
  head: string[]
  body: string[][]
}

type ChartsAndTableTabsProps = {
  chartOptions: echarts.EChartsOption
  tableData: TableData
  chartHeight?: number
  info?: React.ReactNode
  children?: React.ReactNode
  childrenPosition?: 'top' | 'bottom'
  ariaLabel: string
}

const ChartAndTableTabs_: React.FC<ChartsAndTableTabsProps> = ({
  chartOptions,
  chartHeight,
  tableData,
  info,
  children,
  childrenPosition,
  ariaLabel,
}) => {
  const [activeTab, setActiveTab] = React.useState<'chart' | 'table'>('chart')
  const chartRef = React.useRef<echarts.ECharts | null>(null)

  const height = chartHeight ?? CHART_HEIGHT_DEFAULT

  const initChart = (ref: HTMLDivElement | null) => {
    if (!ref) return
    chartRef.current = echarts.init(ref)
    // @ts-ignore-next-line
    chartRef.current.setOption(chartOptions)
  }

  React.useEffect(() => {
    const resizeChart = () => chartRef.current?.resize()
    window.addEventListener('resize', resizeChart)
    return () => window.removeEventListener('resize', resizeChart)
  }, [])

  return (
    <TabContext value={activeTab}>
      <TabList onChange={(_, v) => setActiveTab(v)}>
        <Tab sx={{ flexGrow: '1' }} label="Grafico" value="chart" />
        <Tab sx={{ flexGrow: '1' }} label="Tabella dati" value="table" />
        {info && <Tab sx={{ flexGrow: '1' }} label="Info" value="info" />}
      </TabList>
      <TabPanel value="chart" sx={{ px: 0 }}>
        {childrenPosition === 'top' && children}
        <Box sx={{ width: '100%', height }} ref={initChart} aria-label={ariaLabel} />
        {childrenPosition === 'bottom' && children}
      </TabPanel>
      <TabPanel value="table" sx={{ px: 0 }}>
        <DataTable data={tableData} height={height} />
      </TabPanel>
      {info && (
        <TabPanel value="info" sx={{ px: 0 }}>
          <InfoPanel content={info} />
        </TabPanel>
      )}
    </TabContext>
  )
}

const InfoPanel: React.FC<{ content: React.ReactNode }> = ({ content }) => {
  return <Box>{content}</Box>
}

const DataTable: React.FC<{ data: TableData; height: number }> = ({ data, height }) => {
  const greyBg = useTheme().palette.background.default

  return (
    <Box sx={{ overflow: 'hidden', borderRadius: 1 }}>
      <TableContainer sx={{ height, overflowX: 'auto' }}>
        <Table stickyHeader sx={{ width: '100%', borderRadius: 1 }}>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              {data.head.map((h, i) => (
                <TableCell key={i}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: 'background.paper' }}>
            {data.body.map((row, i) => (
              <TableRow key={i} sx={{ backgroundColor: i % 2 === 0 ? 'transparent' : greyBg }}>
                {row.map((cell, j) => (
                  <TableCell key={j}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export const ChartAndTableTabs = React.memo(ChartAndTableTabs_)
