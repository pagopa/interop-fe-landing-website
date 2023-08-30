import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Skeleton,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { DescriptorAttribute } from '@/models/catalog.models'

type AttributeContainerProps = {
  attribute: DescriptorAttribute
}

export const AttributeContainer: React.FC<AttributeContainerProps> = ({ attribute }) => {
  const panelContentId = React.useId()
  const headerId = React.useId()

  return (
    <Card sx={{ borderRadius: 1, border: '1px solid', borderColor: 'divider', flex: 1 }}>
      <Accordion
        disableGutters
        sx={{
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={panelContentId}
          id={headerId}
        >
          <Typography fontWeight={600}>{attribute.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">{attribute.description}</Typography>
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}

export const AttributeContainerSkeleton: React.FC = () => {
  return (
    <Card
      sx={{ borderRadius: 1, border: '1px solid', borderColor: 'divider', flex: 1, py: 1.4, pl: 2 }}
    >
      <Typography fontWeight={600}>
        <Skeleton width={100} />
      </Typography>
    </Card>
  )
}
