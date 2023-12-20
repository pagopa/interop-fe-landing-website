import React from 'react'
import { Skeleton, Stack, Typography, useTheme } from '@mui/material'
import { HeaderSectionCard } from '../HeaderSectionCard'
import { INTEROP_LEGISLATION_GUIDE_URL } from '@/configs/constants.config'

export const HeaderSection: React.FC = () => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      spacing={3}
      alignItems="center"
    >
      <Stack spacing={2}>
        <Typography variant="h1">Catalogo degli e-service</Typography>
        <Typography variant="body2" sx={{ maxWidth: 640 }}>
          Tutti i servizi disponibili agli aderenti presenti su PDND Interoperabilità. Il soggetto
          interessato verifica i requisiti di accesso dell’e-service, si iscrive a fruirne, e
          costruisce la propria integrazione per l’accesso al dato.
        </Typography>
      </Stack>
      <HeaderSectionCard
        message="Gli e-service ad “accesso riservato” sono destinati agli aderenti di PDND Interoperabilità."
        cta={{ label: 'Scopri di più', href: INTEROP_LEGISLATION_GUIDE_URL }}
      />
    </Stack>
  )
}

export const HeaderSectionSkeleton: React.FC = () => {
  const theme = useTheme()

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={3}>
      <Stack sx={{ flex: 1 }} spacing={1}>
        <Typography variant="h1">
          <Skeleton width={500} />
        </Typography>
        <Typography variant="body2">
          <Skeleton width={340} />
        </Typography>
        <Typography variant="body2">
          <Skeleton />
          <Skeleton width="60%" />
        </Typography>
      </Stack>
      <Stack
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{
          flexShrink: 0,
          textAlign: 'center',
          width: { xs: 'none', md: 281 },
          p: 3,
          borderRadius: 2,
          backgroundColor: theme.palette.primaryAction.selected,
          border: 1,
          borderColor: theme.palette.primaryAction.hover,
        }}
        color="text.secondary"
        bgcolor="red"
      >
        <Skeleton variant="rectangular" width={24} height={24} />
        <Typography color="text.secondary">
          <Skeleton width={240} />
          <Skeleton width={240} />
        </Typography>
        <Skeleton width={140} />
      </Stack>
    </Stack>
  )
}
