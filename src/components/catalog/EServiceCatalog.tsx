import { Box, Grid, Pagination, Skeleton, Stack, Typography } from '@mui/material'
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
    limit: 12,
  })

  const totalPageCount = getTotalPageCount(filterResults.length)

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {filterResults.length} {getLocalizedValue({ it: 'risultati', en: 'results' })}
        </Typography>
        {filterResults.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {getLocalizedValue({
              it: `Pagina ${pageNum} di ${totalPageCount}`,
              en: `${pageNum} of ${totalPageCount}`,
            })}
          </Typography>
        )}
      </Stack>
      <Box>
        <Grid container spacing={4}>
          {filterResults.slice(offset, offset + limit).map((result) => (
            <EServiceCatalogItem key={result.item.id} filterResult={result} />
          ))}
        </Grid>
      </Box>
      {totalPageCount > 1 && (
        <Stack alignItems="center">
          <Pagination
            color="primary"
            sx={{ my: 8 }}
            count={totalPageCount}
            page={pageNum}
            onChange={(_, page) => handlePageChange(page)}
          />
        </Stack>
      )}
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
