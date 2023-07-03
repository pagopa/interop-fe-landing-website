import { getLocalizedValue } from '@/utils/common.utils'
import { Typography, Box, Grid, Skeleton } from '@mui/material'
import React from 'react'
import { FilterResults } from '@/hooks/useDeferredSearchFilter'
import { EServiceCatalogItem, EServiceCatalogItemSkeleton } from './EServiceCatalogItem'
import { EService } from '@/models/catalog.models'

const _EServiceCatalog: React.FC<{ filterResults: FilterResults<EService> }> = ({
  filterResults,
}) => {
  return (
    <>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 6 }}>
        {filterResults.length} {getLocalizedValue({ it: 'risultati', en: 'results' })}
      </Typography>
      <Box sx={{ bgcolor: '#FAFAFA', borderRadius: { xs: 0, lg: 8 }, mx: -4, px: 4, pb: 4 }}>
        <Grid container spacing={4}>
          {filterResults.map((filterResult) => (
            <EServiceCatalogItem key={filterResult.item.id} filterResult={filterResult} />
          ))}
        </Grid>
      </Box>
    </>
  )
}

export const EServiceCatalog = React.memo(_EServiceCatalog)

export const EServiceCatalogSkeleton: React.FC = () => {
  return (
    <>
      <Typography variant="body2" sx={{ mb: 6 }}>
        <Skeleton width={100} />
      </Typography>
      <Box sx={{ bgcolor: '#FAFAFA', borderRadius: { xs: 0, lg: 8 }, mx: -4, px: 4, pb: 4 }}>
        <Grid container spacing={4}>
          {[...Array(6)].map((_, index) => (
            <EServiceCatalogItemSkeleton key={index} />
          ))}
        </Grid>
      </Box>
    </>
  )
}
