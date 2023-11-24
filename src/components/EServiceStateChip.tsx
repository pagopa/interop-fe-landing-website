import { EServiceDescriptor } from '@/models/catalog.models'
import { Chip } from '@mui/material'

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
  return <Chip size="small" label={statusChip[state].label} color={statusChip[state].color} />
}
