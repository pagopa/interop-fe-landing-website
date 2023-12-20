import { Alert, Skeleton } from '@mui/material'
import { DetailsSection } from './DetailsSection'
import { ExternalLink } from '../ExternalLink'
import { INTEROP_ONBOARDING_GUIDE_URL, INTEROP_UI_URL } from '@/configs/constants.config'

export const DocumentationSection: React.FC = () => {
  return (
    <DetailsSection title="Documentazione">
      <Alert severity="info" variant="outlined" sx={{ mt: 2 }}>
        La specifica dell’API e la documentazione tecnica dell’e-service sono disponibili solo
        previa autenticazione a PDND Interoperabilità.{' '}
        <ExternalLink label="Effettua il login" href={INTEROP_UI_URL} /> oppure{' '}
        <ExternalLink label="scopri come aderire" href={INTEROP_ONBOARDING_GUIDE_URL} />.
      </Alert>
    </DetailsSection>
  )
}

export const DocumentationSectionSkeleton: React.FC = () => {
  return (
    <DetailsSection title="Documentazione">
      <Skeleton sx={{ mt: 2, height: 80 }} />
    </DetailsSection>
  )
}
