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
  Typography,
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
  isLoading?: boolean
  info?: string
  children?: React.ReactNode
}

const ChartAndTableTabs_: React.FC<ChartsAndTableTabsProps> = ({
  chartOptions,
  chartHeight,
  isLoading,
  tableData,
  info,
  children,
}) => {
  const [activeTab, setActiveTab] = React.useState<'chart' | 'table'>('chart')
  const chartRef = React.useRef<echarts.ECharts | null>(null)

  const primaryColor = useTheme().palette.primary.main
  const height = chartHeight ?? CHART_HEIGHT_DEFAULT

  const initChart = (ref: HTMLDivElement | null) => {
    if (!ref) return
    chartRef.current = echarts.init(ref)
    chartRef.current.setOption(chartOptions)
  }

  React.useEffect(() => {
    const resizeChart = () => chartRef.current?.resize()
    window.addEventListener('resize', resizeChart)
    return () => window.removeEventListener('resize', resizeChart)
  }, [])

  React.useLayoutEffect(() => {
    if (!chartRef.current) return

    if (isLoading)
      chartRef.current.showLoading({ text: 'Caricamento dati...', color: primaryColor })
    else chartRef.current.hideLoading()
  }, [isLoading, primaryColor])

  return (
    <TabContext value={activeTab}>
      <TabList onChange={(_, v) => setActiveTab(v)}>
        <Tab sx={{ flexGrow: '1' }} label="Grafico" value="chart" />
        <Tab sx={{ flexGrow: '1' }} label="Tabella dati" value="table" />
        {info && <Tab sx={{ flexGrow: '1' }} label="Info" value="info" />}
      </TabList>
      <TabPanel value="chart">
        {children}
        <Box sx={{ width: '100%', height }} ref={initChart} />
      </TabPanel>
      <TabPanel value="table">
        <DataTable data={tableData} height={height} />
      </TabPanel>
      {info && (
        <TabPanel value="info">
          <InfoPanel text={info} />
        </TabPanel>
      )}
    </TabContext>
  )
}

const InfoPanel: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Box>
      <Typography variant="body2">{text}</Typography>
    </Box>
  )
}

const DataTable: React.FC<{ data: TableData; height: number }> = ({ data, height }) => {
  const greyBg = useTheme().palette.background.default

  return (
    <Box sx={{ overflow: 'hidden', borderRadius: 1 }}>
      <TableContainer sx={{ height, overflowX: 'scroll' }}>
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
