import type { EService } from '@/models/catalog.models'
import { Button, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { getLocalizedValue } from '@/utils/common.utils'
import { SELF_CARE_ONBOARDING_INTEROP_URL } from '@/configs/constants.config'

export const HeaderSection = ({ eservice }: { eservice: EService }) => {
  const theme = useTheme()

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      spacing={3}
      alignItems="center"
    >
      <Stack spacing={1}>
        <Typography variant="h1">{eservice.name}</Typography>
        <Typography variant="body2">
          Erogato da: <strong>{eservice.producerName}</strong>
        </Typography>
        <Typography variant="body2">{eservice.description}</Typography>
      </Stack>
      <Stack
        color="text.secondary"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          flexShrink: 0,
          width: { xs: 'none', md: 281 },
          p: 3,
          borderRadius: 2,
          backgroundColor: theme.palette.primaryAction.selected,
          border: 1,
          borderColor: theme.palette.primaryAction.hover,
        }}
      >
        <Stack direction="column" alignItems="start" spacing={1}>
          <Typography color="text.secondary" variant="caption">
            E-service disponibile solo previa adesione a PDND Interoperabilità
          </Typography>
          <Button
            target="_blank"
            href={SELF_CARE_ONBOARDING_INTEROP_URL}
            title={getLocalizedValue({
              it: 'Scopri come aderire',
              en: 'Find out how to join',
            })}
            variant="naked"
            size="small"
          >
            {getLocalizedValue({
              it: 'Scopri come aderire',
              en: 'Find out how to join',
            })}
          </Button>
        </Stack>
        <LockIcon color="inherit" fontSize="large" />
      </Stack>
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
