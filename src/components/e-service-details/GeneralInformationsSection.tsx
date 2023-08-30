import type { EService } from '@/models/catalog.models'
import { Divider, Skeleton, Stack, Typography } from '@mui/material'
import { DetailsSection } from './DetailsSection'
import { EServiceStateChip } from '../EServiceStateChip'

export const GeneralInformationsSection = ({ eservice }: { eservice: EService }) => {
  return (
    <DetailsSection title="Informazioni generali">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        divider={
          <Divider orientation="vertical" sx={{ display: { xs: 'none', md: 'block' } }} flexItem />
        }
        spacing={2}
      >
        <InformationContainer title="Versione attuale">
          <Typography variant="body2" sx={{ flex: 1, fontWeight: 600 }}>
            {eservice.activeDescriptor.version}
          </Typography>
        </InformationContainer>
        <InformationContainer title="Stato della versione">
          <EServiceStateChip state={eservice.activeDescriptor.state} />
        </InformationContainer>
        <InformationContainer title="Tecnologia">
          <Typography variant="body2" sx={{ flex: 1, fontWeight: 600 }}>
            {eservice.technology}
          </Typography>
        </InformationContainer>
      </Stack>
    </DetailsSection>
  )
}

export const GeneralInformationsSectionSkeleton: React.FC = () => {
  return (
    <DetailsSection title="Informazioni generali">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        divider={
          <Divider orientation="vertical" sx={{ display: { xs: 'none', md: 'block' } }} flexItem />
        }
        spacing={2}
      >
        <InformationContainer title="Versione attuale">
          <Typography variant="body2" sx={{ flex: 1 }}>
            <Skeleton width={10} />
          </Typography>
        </InformationContainer>
        <InformationContainer title="Stato della versione">
          <Skeleton variant="rectangular" sx={{ borderRadius: 10 }} width={55} height={26} />
        </InformationContainer>
        <InformationContainer title="Tecnologia">
          <Typography variant="body2" sx={{ flex: 1 }}>
            <Skeleton width={50} />
          </Typography>
        </InformationContainer>
      </Stack>
    </DetailsSection>
  )
}

const InformationContainer = ({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) => (
  <Stack spacing={2} direction="row" alignItems="center" sx={{ flex: 1 }}>
    <Typography variant="body2" sx={{ flex: 1 }}>
      {title}
    </Typography>
    <Stack justifyItems="center" alignItems="center" sx={{ flex: 1 }}>
      {children}
    </Stack>
  </Stack>
)
