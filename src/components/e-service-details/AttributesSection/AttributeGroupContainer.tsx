import React from 'react'
import { Card, CardContent, CardHeader, Stack } from '@mui/material'
import { DescriptorAttribute, DescriptorAttributeGroup } from '@/models/catalog.models'
import { AttributeContainer, AttributeContainerSkeleton } from './AttributeContainer'

type AttributeGroupContainerProps = {
  attributeGroup: DescriptorAttributeGroup
}

export const AttributeGroupContainer: React.FC<AttributeGroupContainerProps> = ({
  attributeGroup,
}) => {
  const attributes: Array<DescriptorAttribute> = []

  if ('group' in attributeGroup) {
    attributes.push(...attributeGroup.group)
  }

  if ('single' in attributeGroup) {
    attributes.push(attributeGroup.single)
  }

  return (
    <Card sx={{ border: '1px solid', borderColor: '#EEEEEE', bgcolor: '#FBFAFA' }}>
      <CardHeader
        titleTypographyProps={{ variant: 'body1', fontWeight: 600 }}
        title="Devi possedere almeno uno dei seguenti requisiti:"
        sx={{ py: 1, bgcolor: '#EEEEEE' }}
      />
      <CardContent
        sx={{
          p: 2,
          '&:last-child': {
            paddingBottom: 2,
          },
        }}
      >
        <Stack spacing={1.5}>
          {attributes.map((attribute, i) => (
            <AttributeContainer key={i} attribute={attribute} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export const AttributeGroupContainerSkeleton: React.FC = () => {
  return (
    <Card sx={{ border: '1px solid', borderColor: '#EEEEEE', bgcolor: '#FBFAFA' }}>
      <CardHeader
        titleTypographyProps={{ variant: 'body1', fontWeight: 600 }}
        title="Devi possedere almeno uno dei seguenti requisiti:"
        sx={{ py: 1, bgcolor: '#EEEEEE' }}
      />
      <CardContent
        sx={{
          p: 2,
          '&:last-child': {
            paddingBottom: 2,
          },
        }}
      >
        <Stack spacing={1.5}>
          <AttributeContainerSkeleton />
          <AttributeContainerSkeleton />
          <AttributeContainerSkeleton />
        </Stack>
      </CardContent>
    </Card>
  )
}
