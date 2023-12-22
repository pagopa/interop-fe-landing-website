import type { EService } from '@/models/catalog.models'
import { Divider, Skeleton, Stack, Tooltip, Typography } from '@mui/material'
import { DetailsSection } from './DetailsSection'
import { EServiceStateChip } from '../EServiceStateChip'
import InfoIcon from '@mui/icons-material/Info'

export const GeneralInformationsSection = ({ eservice }: { eservice: EService }) => {
  return (
    <DetailsSection title="Informazioni generali">
      <Stack
        sx={{ mt: 4 }}
        direction={{ xs: 'column', md: 'row' }}
        divider={
          <Divider orientation="vertical" sx={{ display: { xs: 'none', md: 'block' } }} flexItem />
        }
        spacing={2}
      >
        <InformationContainer
          title="Versione attuale"
          tooltip="Quando ci sono cambiamenti all’API e/o al quadro amministrativo, è possibile pubblicare una nuova versione dello stesso e-service"
        >
          <Typography variant="body2" sx={{ flex: 1, fontWeight: 600 }}>
            {eservice.activeDescriptor.version}
          </Typography>
        </InformationContainer>
        <InformationContainer
          title="Stato della versione"
          tooltip="Attivo o sospeso. Quando una versione di e-service viene sospesa, non è possibile per i fruitori accedervi per ottenere dati"
        >
          <EServiceStateChip state={eservice.activeDescriptor.state} />
        </InformationContainer>
        <InformationContainer
          title="Tecnologia"
          tooltip="L’architettura con la quale è costruita l’API che l’erogatore mette a disposizione dei fruitori, nel quadro del MODI di AgID. Può essere REST o SOAP"
        >
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
        sx={{ mt: 4 }}
        direction={{ xs: 'column', md: 'row' }}
        divider={
          <Divider orientation="vertical" sx={{ display: { xs: 'none', md: 'block' } }} flexItem />
        }
        spacing={2}
      >
        <InformationContainer
          title="Versione attuale"
          tooltip="Quando ci sono cambiamenti all’API e/o alla cornice amministrativa, è possibile pubblicare una nuova versione dello stesso e-service"
        >
          <Typography variant="body2" sx={{ flex: 1 }}>
            <Skeleton width={10} />
          </Typography>
        </InformationContainer>
        <InformationContainer
          title="Stato della versione"
          tooltip="Quando una versione di e-service viene sospesa, non è più possibile per i fruitori accedervi per ottenere dati"
        >
          <Skeleton variant="rectangular" sx={{ borderRadius: 10 }} width={55} height={26} />
        </InformationContainer>
        <InformationContainer
          title="Tecnologia"
          tooltip="L’architettura con la quale è costruita l’API che l’erogatore mette a disposizione dei fruitori, nel quadro del MODI. Può essere REST oppure SOAP"
        >
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
  tooltip,
  children,
}: {
  title: string
  tooltip: string
  children?: React.ReactNode
}) => (
  <Stack direction="column" alignItems="start" sx={{ flex: 1 }}>
    <Stack direction="row" spacing={1}>
      <Typography variant="body2" sx={{ flex: 1 }}>
        {title}
      </Typography>
      <Tooltip sx={{ textAlign: 'left' }} arrow title={tooltip}>
        <span tabIndex={0}>
          <InfoIcon fontSize="small" color="primary" />
        </span>
      </Tooltip>
    </Stack>
    <Stack justifyItems="center" alignItems="center" sx={{ flex: 1 }}>
      {children}
    </Stack>
  </Stack>
)
