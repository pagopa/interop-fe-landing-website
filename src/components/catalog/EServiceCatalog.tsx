import { Box, Grid } from '@mui/material'
import React from 'react'
import { FilterResults } from '@/hooks/useDeferredSearchFilter'
import { EServiceCatalogItem, EServiceCatalogItemSkeleton } from './EServiceCatalogItem'
import { EService } from '@/models/catalog.models'

const EServiceCatalog_: React.FC<{
  filterResults: FilterResults<EService>
}> = ({ filterResults }) => {
  return (
    <Box sx={{ mb: 8 }}>
      <Grid container spacing={4}>
        {filterResults.map((result) => (
          <EServiceCatalogItem key={result.item.id} filterResult={result} />
        ))}
      </Grid>
    </Box>
  )
}

export const EServiceCatalog = React.memo(EServiceCatalog_)

export const EServiceCatalogSkeleton: React.FC = () => {
  return (
    <Box sx={{ mb: 8 }}>
      <Grid container spacing={4}>
        {[...Array(6)].map((_, index) => (
          <EServiceCatalogItemSkeleton key={index} />
        ))}
      </Grid>
    </Box>
  )
}
