import React from 'react'
import { SvgIconComponent } from '@mui/icons-material'
import { Box, Container, Divider, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { VegaLite } from 'react-vega'
import { getVegaConfigSpec } from '../utils/vega-config'
import { formatThousands } from '../utils/formatters'
import { EnvSwitch, EnvSwitchSkeleton } from './EnvSwitch'
import { Env, InteropNumbersResponseData } from '../types/global'
import { TenantSerachBox } from './TenantSearchBox'

export interface GraphCard {
  Icon: SvgIconComponent
  amount: number
  description: string
  withBackground?: boolean
}

export type Graph = {
  title: string
  subtitle: string
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
  tabs: Record<string, string>
  activeEnv: Env
  section: keyof InteropNumbersResponseData
  onChangeEnv: (value: string, section: keyof InteropNumbersResponseData) => void
}

export const LineChartSection: React.FC<LineChartSectionProps> = ({
  title,
  cards,
  graph,
  withBackground,
  tabs,
  activeEnv,
  section,
  onChangeEnv,
}) => {
  const handleEnvChange = (_: unknown, value: string) => {
    onChangeEnv(value, section)
  }

  return (
    <Box sx={{ py: 9, bgcolor: withBackground ? 'background.default' : undefined }}>
      <Container component="section">
        <Stack spacing={3}>
          <Typography color={withBackground ? 'text.primary' : 'text.secondary'} variant="h4">
            {title}
          </Typography>
          <EnvSwitch tabs={tabs} activeEnv={activeEnv} onChange={handleEnvChange} />
          <Stack
            sx={{ pt: 2 }}
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            spacing={2}
          >
            {cards.map((card, i) => (
              <Box sx={{ flex: 1 }} key={i}>
                <GraphCard {...card} withBackground={withBackground} />
              </Box>
            ))}
          </Stack>
          <LineGraph {...graph} withBackground={withBackground} />
          {/* {section === 'tenants' && (
            <Stack sx={{ pt: 2 }} spacing={4}>
              <Divider />
              <TenantSerachBox options={tenantsOptions} withBackground={withBackground} />
            </Stack>
          )} */}
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
          {formatThousands(amount)}
        </Typography>
        <Typography color={withBackground ? 'text.primary' : 'text.secondary'} variant="body1">
          {description}
        </Typography>
      </Stack>
    </Paper>
  )
}

const LineGraph: React.FC<Graph> = ({ title, subtitle, data, withBackground }) => {
  const table = React.useMemo(() => {
    return data.map((record) => ({ ...record, time: new Date(record.time) }))
  }, [data])

  const textColor = withBackground ? 'text.primary' : 'text.secondary'

  return (
    <Stack spacing={2}>
      <Box>
        <Typography color={textColor} variant="h5">
          {title}
        </Typography>
        <Typography color={textColor}>{subtitle}</Typography>
      </Box>
      <VegaLite actions={false} spec={getVegaConfigSpec(!!withBackground)} data={{ table }} />
    </Stack>
  )
}

export const LineChartSectionSkeleton: React.FC<{ withBackground?: boolean }> = ({
  withBackground,
}) => {
  const bgcolor = withBackground ? 'background.default' : undefined

  return (
    <Box sx={{ py: 9, bgcolor }}>
      <Container component="section">
        <Stack spacing={3}>
          <Typography variant="h4">
            <Skeleton width="50%" />
          </Typography>
          <EnvSwitchSkeleton />
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
            <Skeleton variant="rectangular" height={193} width={'100%'} />
            <Skeleton variant="rectangular" height={193} width={'100%'} />
          </Stack>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h5">
                <Skeleton width="70%" />
              </Typography>
              <Typography>
                <Skeleton width="40%" />
              </Typography>
            </Box>
            <Skeleton variant="rectangular" height={355} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
