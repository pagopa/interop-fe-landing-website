import { DescriptorAttributes } from '@/models/catalog.models'
import { AttributeSection, AttributeSectionSkeleton } from './AttributeSection'
import { Divider, Typography, Link } from '@mui/material'
import {
  certifiedAttributesHelpLink,
  verifiedAttributesHelpLink,
  declaredAttributesHelpLink,
} from '@/configs/constants.config'
import { DetailsSection } from '../DetailsSection'

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
            Ovvero attributi certificati da una{' '}
            <Link underline="hover" href={certifiedAttributesHelpLink} target="_blank">
              fonte autoritativa riconosciuta
            </Link>
            .
          </>
        }
        attributeGroups={attributes.certified}
        emptyLabel="L’erogatore non richiede nessun attributo certificato"
      />
      <Divider sx={{ my: 3 }} />
      <AttributeSection
        title="Attributi verificati"
        description={
          <>
            Ovvero attributi verificati{' '}
            <Link underline="hover" href={verifiedAttributesHelpLink} target="_blank">
              da altre organizzazioni per lo stesso fruitore
            </Link>{' '}
            con la possibilità di richiedere una verifica dall’erogatore.
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
            Ovvero attributi dichiarati dal fruitore{' '}
            <Link underline="hover" href={declaredAttributesHelpLink} target="_blank">
              sotto propria responsabilità
            </Link>{' '}
            durante la richiesta di fruizione. Non è necessaria una verifica dell’erogatore.
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
            Ovvero attributi certificati da una{' '}
            <Link underline="hover" href={certifiedAttributesHelpLink} target="_blank">
              fonte autoritativa riconosciuta
            </Link>
            .
          </>
        }
      />
      <Divider sx={{ my: 3 }} />
      <AttributeSectionSkeleton
        title="Attributi verificati"
        description={
          <>
            Ovvero attributi verificati{' '}
            <Link underline="hover" href={verifiedAttributesHelpLink} target="_blank">
              da altre organizzazioni per lo stesso fruitore
            </Link>{' '}
            con la possibilità di richiedere una verifica dall’erogatore.
          </>
        }
      />
      <Divider sx={{ my: 3 }} />
      <AttributeSectionSkeleton
        title="Attributi dichiarati"
        description={
          <>
            Ovvero attributi dichiarati dal fruitore{' '}
            <Link underline="hover" href={declaredAttributesHelpLink} target="_blank">
              sotto propria responsabilità
            </Link>{' '}
            durante la richiesta di fruizione. Non è necessaria una verifica dell’erogatore.
          </>
        }
      />
    </DetailsSection>
  )
}
