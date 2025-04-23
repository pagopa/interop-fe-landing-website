import { DescriptorAttributes } from '@/models/catalog.models'
import { AttributeSection, AttributeSectionSkeleton } from './AttributeSection'
import { Divider, Typography, Link } from '@mui/material'
import {
  certifiedAttributesHelpLink,
  verifiedAttributesHelpLink,
  declaredAttributesHelpLink,
} from '@/configs/constants.config'
import { DetailsSection } from '../DetailsSection'
import LaunchIcon from '@mui/icons-material/Launch'
import { decorateCertifiedAttributes } from '@/utils/ipa_categories.utils'
import { ExternalLink } from '@/components/ExternalLink'

export const AttributesSection = ({ attributes }: { attributes: DescriptorAttributes }) => {
  return (
    <DetailsSection title="Attributi">
      <Typography variant="body2" color="text.secondary">
        Di seguito sono indicati tutti gli attributi certificati, verificati o dichiarati che sono
        richiesti per la fruizione dell’E-service.
      </Typography>
      <Divider sx={{ my: 3 }} />
      <AttributeSection
        title="Attributi certificati"
        description={
          <>
            Ovvero certificati da una fonte autoritativa riconosciuta. Per saperne di più,{' '}
            <ExternalLink label="consulta la guida" href={certifiedAttributesHelpLink} />.
          </>
        }
        attributeGroups={decorateCertifiedAttributes(attributes.certified)}
        emptyLabel="L’erogatore non richiede nessun attributo certificato"
      />
      <Divider sx={{ my: 3 }} />
      <AttributeSection
        title="Attributi verificati"
        description={
          <>
            Ovvero già verificati da altre organizzazioni per lo stesso fruitore, con la possibilità
            per l’erogatore di richiedere una nuova verifica. Per saperne di più,{' '}
            <ExternalLink label="consulta la guida" href={verifiedAttributesHelpLink} />.
          </>
        }
        attributeGroups={attributes.verified}
        emptyLabel="L’erogatore non richiede nessun attributo verificato"
      />
      <Divider sx={{ my: 3 }} />
      <AttributeSection
        title="Attributi dichiarati"
        description={
          <>
            Ovvero dichiarati dal fruitore sotto propria responsabilità. Non è necessaria verifica
            da parte dell’erogatore. Per saperne di più,{' '}
            <ExternalLink label="consulta la guida" href={declaredAttributesHelpLink} />.
          </>
        }
        attributeGroups={attributes.declared}
        emptyLabel="L’erogatore non richiede nessun attributo dichiarato"
      />
    </DetailsSection>
  )
}

export const AttributesSectionSkeleton: React.FC = () => {
  return (
    <DetailsSection title="Attributi">
      <Typography variant="body2" color="text.secondary">
        Di seguito sono indicati tutti gli attributi certificati, verificati o dichiarati che sono
        richiesti per la fruizione dell’E-service.
      </Typography>
      <Divider sx={{ my: 3 }} />
      <AttributeSectionSkeleton
        title="Attributi certificati"
        description={
          <>
            Ovvero certificati da una fonte autoritativa riconosciuta. Per saperne di più,{' '}
            <ExternalLink label="consulta la guida" href={certifiedAttributesHelpLink} />.
          </>
        }
      />
      <Divider sx={{ my: 3 }} />
      <AttributeSectionSkeleton
        title="Attributi verificati"
        description={
          <>
            Ovvero già verificati da altre organizzazioni per lo stesso fruitore, con la possibilità
            per l’erogatore di richiedere una nuova verifica. Per saperne di più,{' '}
            <ExternalLink label="consulta la guida" href={verifiedAttributesHelpLink} />.
          </>
        }
      />
      <Divider sx={{ my: 3 }} />
      <AttributeSectionSkeleton
        title="Attributi dichiarati"
        description={
          <>
            Ovvero dichiarati dal fruitore sotto propria responsabilità. Non è necessaria verifica
            da parte dell’erogatore. Per saperne di più,{' '}
            <ExternalLink label="consulta la guida" href={declaredAttributesHelpLink} />.
          </>
        }
      />
    </DetailsSection>
  )
}
