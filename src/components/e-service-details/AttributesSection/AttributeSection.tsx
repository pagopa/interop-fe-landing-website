import type { DescriptorAttributeGroups } from '@/models/catalog.models'
import { Box, Card, CardHeader, Stack, Typography } from '@mui/material'
import { AttributeGroupContainer, AttributeGroupContainerSkeleton } from './AttributeGroupContainer'

type AttributeSectionProps = {
  title: string
  description: React.ReactNode
  attributeGroups: DescriptorAttributeGroups
  emptyLabel: string
}

export const AttributeSection: React.FC<AttributeSectionProps> = ({
  title,
  description,
  attributeGroups,
  emptyLabel,
}) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {description}
      </Typography>
      <Stack sx={{ mt: 3 }} spacing={2}>
        {attributeGroups.map((attributeGroup, i) => (
          <AttributeGroupContainer key={i} attributeGroup={attributeGroup} />
        ))}
        {attributeGroups.length === 0 && (
          <Card>
            <CardHeader
              titleTypographyProps={{ variant: 'body1', fontWeight: 600 }}
              title={emptyLabel}
              sx={{ py: 1, bgcolor: '#EEEEEE' }}
            />
          </Card>
        )}
      </Stack>
    </Box>
  )
}

type AttributeSectionSkeletonProps = {
  title: string
  description: React.ReactNode
}

export const AttributeSectionSkeleton: React.FC<AttributeSectionSkeletonProps> = ({
  title,
  description,
}) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {description}
      </Typography>
      <Stack sx={{ mt: 3 }} spacing={2}>
        <AttributeGroupContainerSkeleton />
        <AttributeGroupContainerSkeleton />
      </Stack>
    </Box>
  )
}
