import { Box, Grid, Pagination, Skeleton, Typography } from '@mui/material'
import React from 'react'
import { FilterResults } from '@/hooks/useDeferredSearchFilter'
import { EServiceCatalogItem, EServiceCatalogItemSkeleton } from './EServiceCatalogItem'
import { EService } from '@/models/catalog.models'
import { getLocalizedValue } from '@/utils/common.utils'
import { usePagination } from '@/hooks'

const EServiceCatalog_: React.FC<{
  filterResults: FilterResults<EService>
}> = ({ filterResults }) => {
  const { getTotalPageCount, pageNum, handlePageChange, limit, offset } = usePagination({
    limit: 15,
  })

  return (
    <>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filterResults.length} {getLocalizedValue({ it: 'risultati', en: 'results' })}
      </Typography>
      <Box>
        <Grid container spacing={4}>
          {filterResults.slice(offset, offset + limit).map((result) => (
            <EServiceCatalogItem key={result.item.id} filterResult={result} />
          ))}
        </Grid>
      </Box>
      <Pagination
        color="primary"
        sx={{ my: 4 }}
        count={getTotalPageCount(filterResults.length)}
        page={pageNum}
        onChange={(_, page) => handlePageChange(page)}
      />
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
