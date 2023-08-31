import { EServiceDescriptor } from '@/models/catalog.models'
import { Stack, Typography, Box, useTheme } from '@mui/material'

const statusChip: Record<
  EServiceDescriptor['state'],
  { label: string; color: 'error' | 'success' }
> = {
  PUBLISHED: { label: 'Attivo', color: 'success' },
  SUSPENDED: { label: 'Sospeso', color: 'error' },
}

type EServiceStateChipProps = {
  state: EServiceDescriptor['state']
}

export const EServiceStateChip: React.FC<EServiceStateChipProps> = ({ state }) => {
  const theme = useTheme()

  return (
    <Stack m={1} direction="row" alignItems="center" spacing={1}>
      <Box
        role="presentation"
        sx={{
          width: 8,
          height: 8,
          borderRadius: '100%',
          backgroundColor: theme.palette[statusChip[state].color].main,
        }}
      />
      <Typography variant="caption" lineHeight={0} fontWeight={600}>
        {statusChip[state].label}
      </Typography>
    </Stack>
  )
}
