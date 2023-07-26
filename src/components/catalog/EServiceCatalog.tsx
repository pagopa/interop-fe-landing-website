import { Box, Grid, Skeleton, Typography } from '@mui/material'
import React from 'react'
import { FilterResults } from '@/hooks/useDeferredSearchFilter'
import { EServiceCatalogItem, EServiceCatalogItemSkeleton } from './EServiceCatalogItem'
import { EService } from '@/models/catalog.models'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { getLocalizedValue } from '@/utils/common.utils'

const EServiceCatalog_: React.FC<{
  filterResults: FilterResults<EService>
}> = ({ filterResults }) => {
  const { ref, itemsNumber } = useInfiniteScroll({
    totalItems: filterResults.length,
    itemsPerPage: 60,
  })

  return (
    <>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filterResults.length} {getLocalizedValue({ it: 'risultati', en: 'results' })}
      </Typography>
      <Box sx={{ mb: 8 }} ref={ref}>
        <Grid container spacing={4}>
          {Array(itemsNumber)
            .fill(undefined)
            .map((_, index) => (
              <EServiceCatalogItem
                key={filterResults[index].item.id}
                filterResult={filterResults[index]}
              />
            ))}
          {itemsNumber < filterResults.length && (
            <>
              <EServiceCatalogItemSkeleton />
              <EServiceCatalogItemSkeleton />
              <EServiceCatalogItemSkeleton />
            </>
          )}
        </Grid>
      </Box>
    </>
  )
}

export const EServiceCatalog = React.memo(EServiceCatalog_)

export const EServiceCatalogSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton width={100} sx={{ mb: 2.5 }} />
      <Box sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {[...Array(6)].map((_, index) => (
            <EServiceCatalogItemSkeleton key={index} />
          ))}
        </Grid>
      </Box>
    </>
  )
}
