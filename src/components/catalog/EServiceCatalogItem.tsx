import { Button, Card, CardActions, CardContent, Grid, Skeleton, Typography } from '@mui/material'
import { TextHighlighter } from './TextHighlighter'
import { FilterResult } from '@/hooks'
import { CatalogEservice } from '@/models/catalog.models'
import NextLink from 'next/link'
import { getLocalizedValue } from '@/utils/common.utils'

export const EServiceCatalogItem: React.FC<{ filterResult: FilterResult<CatalogEservice> }> = ({
  filterResult,
}) => {
  const { item: catalogEService, matches } = filterResult

  return (
    <Grid width={'100%'} item sm={12} md={6} lg={4}>
      <Card sx={{ minHeight: 360, display: 'flex', flexDirection: 'column' }} elevation={8}>
        <CardContent>
          <Typography variant="h6" component="span">
            <TextHighlighter
              text={catalogEService.name}
              indices={matches?.find((match) => match.key === 'name')?.indices}
            />
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <TextHighlighter
              text={catalogEService.producerName}
              indices={matches?.find((match) => match.key === 'producerName')?.indices}
            />
          </Typography>
          <Typography variant="body2">{catalogEService.description}</Typography>
        </CardContent>
        <CardActions sx={{ mt: 'auto' }}>
          <Button
            variant="naked"
            LinkComponent={NextLink}
            href={`/catalogo/eservice/${catalogEService.id}`}
            size="small"
          >
            {getLocalizedValue({ it: 'Dettagli', en: 'Details' })}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export const EServiceCatalogItemSkeleton: React.FC = () => {
  return (
    <Grid item sm={12} md={6} lg={4}>
      <Card sx={{ minHeight: 360, display: 'flex', flexDirection: 'column' }} elevation={8}>
        <CardContent>
          <Typography variant="h6" component="span">
            <Skeleton />
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <Skeleton width={'80%'} />
          </Typography>
          <Typography variant="body2">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton width={'40%'} />
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: 'auto' }}>
          <Skeleton width={50} />
        </CardActions>
      </Card>
    </Grid>
  )
}
