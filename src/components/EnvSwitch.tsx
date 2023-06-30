import { Skeleton, Stack, Tab, Tabs } from '@mui/material'
import React from 'react'
import { Env } from '@/types/common.types'

type EnvSwitchProps = {
  tabs: Record<string, string>
  activeEnv: Env
  onChange: (_: unknown, value: string) => void
}

export const EnvSwitch: React.FC<EnvSwitchProps> = ({ tabs, activeEnv, onChange }) => {
  return (
    <>
      <Tabs aria-label={tabs.ariaLabel} value={activeEnv} onChange={onChange} centered>
        <Tab value="prod" label={tabs.prod} />
        <Tab value="test" label={tabs.test} />
      </Tabs>
    </>
  )
}

export const EnvSwitchSkeleton: React.FC = () => {
  return (
    <>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="center">
        <Skeleton variant="rectangular" height={50} width={180} />
        <Skeleton variant="rectangular" height={50} width={180} />
      </Stack>
    </>
  )
}
