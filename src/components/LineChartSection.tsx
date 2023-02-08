import React from 'react'
import { SvgIconComponent } from '@mui/icons-material'
import { Box, Container, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { VegaLite } from 'react-vega'
import { getGraphConfigSpec } from '../utils/graph-config'

export interface GraphCard {
  Icon: SvgIconComponent
  amount: number
  description: string
  withBackground?: boolean
}

export type Graph = {
  title: string
  data: Array<{
    time: string
    value: number
  }>
  withBackground?: boolean
}

interface LineChartSectionProps {
  title: string
  cards: Array<GraphCard>
  graph: Graph
  withBackground?: boolean
}

export const LineChartSection: React.FC<LineChartSectionProps> = ({
  title,
  cards,
  graph,
  withBackground,
}) => {
  return (
    <Box sx={{ py: 9, bgcolor: withBackground ? 'background.default' : undefined }}>
      <Container component="section">
        <Stack spacing={3}>
          <Typography color={withBackground ? 'text.primary' : 'text.secondary'} variant="h4">
            {title}
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
            {cards.map((card, i) => (
              <Box sx={{ flex: 1 }} key={i}>
                <GraphCard {...card} withBackground={withBackground} />
              </Box>
            ))}
          </Stack>
          <LineGraph {...graph} withBackground={withBackground} />
        </Stack>
      </Container>
    </Box>
  )
}

const GraphCard: React.FC<GraphCard> = ({ Icon, amount, description, withBackground }) => {
  return (
    <Paper elevation={4} sx={{ p: 3, bgcolor: withBackground ? 'background.default' : undefined }}>
      <Stack>
        <Icon color="primary" sx={{ width: 64, height: 64 }} />
        <Typography
          color={withBackground ? 'text.primary' : 'text.secondary'}
          variant="h1"
          component="span"
        >
          {amount}
        </Typography>
        <Typography color={withBackground ? 'text.primary' : 'text.secondary'} variant="body1">
          {description}
        </Typography>
      </Stack>
    </Paper>
  )
}

const LineGraph: React.FC<Graph> = ({ title, data, withBackground }) => {
  const table = React.useMemo(() => {
    return data.map((record) => ({ ...record, time: new Date(record.time) }))
  }, [data])

  return (
    <Stack spacing={2}>
      <Typography color={withBackground ? 'text.primary' : 'text.secondary'} variant="h5">
        {title}
      </Typography>
      <VegaLite actions={false} spec={getGraphConfigSpec(!!withBackground)} data={{ table }} />
    </Stack>
  )
}

export const LineChartSectionSkeleton: React.FC<{ withBackground?: boolean }> = ({
  withBackground,
}) => {
  return (
    <Box sx={{ py: 9, bgcolor: withBackground ? 'background.default' : undefined }}>
      <Container component="section">
        <Stack spacing={3}>
          <Typography variant="h4">
            <Skeleton width="50%" />
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
            <Skeleton variant="rectangular" height={193} width={'100%'} />
            <Skeleton variant="rectangular" height={193} width={'100%'} />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5">
              <Skeleton width="70%" />
            </Typography>
            <Skeleton variant="rectangular" height={355} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
