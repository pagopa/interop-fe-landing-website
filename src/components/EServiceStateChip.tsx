import { EServiceDescriptor } from '@/models/catalog.models'
import { Chip, type ChipProps } from '@mui/material'

const statusChip: Record<
  EServiceDescriptor['state'],
  { label: string; color: 'error' | 'success' }
> = {
  PUBLISHED: { label: 'Attivo', color: 'success' },
  SUSPENDED: { label: 'Sospeso', color: 'error' },
}

type EServiceStateChipProps = {
  state: EServiceDescriptor['state']
} & ChipProps

export const EServiceStateChip: React.FC<EServiceStateChipProps> = ({ state, ...props }) => {
  return <Chip {...statusChip[state]} size="small" {...props} />
}
