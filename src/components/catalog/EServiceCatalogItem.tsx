import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { TextHighlighter } from './TextHighlighter'
import { FilterResult } from '@/hooks'
import { EService, EServiceDescriptor } from '@/models/catalog.models'
import NextLink from 'next/link'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import LockIcon from '@mui/icons-material/Lock'

const statusChip: Record<
  EServiceDescriptor['state'],
  { label: string; color: 'error' | 'success' }
> = {
  PUBLISHED: { label: 'Attivo', color: 'success' },
  SUSPENDED: { label: 'Sospeso', color: 'error' },
}

export const EServiceCatalogItem: React.FC<{ filterResult: FilterResult<EService> }> = ({
  filterResult,
}) => {
  const { item: eservice, matches } = filterResult

  return (
    <Grid width="100%" item sm={12} md={6} lg={4}>
      <Card elevation={8}>
        <CardActionArea LinkComponent={NextLink} href={`/catalogo/${eservice.id}`}>
          <Box sx={{ minHeight: 360, display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              disableTypography
              title={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="overline" textTransform="uppercase" color="text.secondary">
                    E-SERVICE
                  </Typography>
                  <Chip
                    {...statusChip[eservice.activeDescriptor.state]}
                    size="small"
                    sx={{ borderRadius: 1 }}
                  />
                </Stack>
              }
            />
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ bgcolor: 'background.default' }}>
                  <AccountBalanceIcon sx={{ color: '#bdbdbd' }} fontSize="small" />
                </Avatar>
                <Typography variant="caption" color="text.secondary">
                  <TextHighlighter
                    text={eservice.producerName}
                    indices={matches?.find((match) => match.key === 'producerName')?.indices}
                  />
                </Typography>
              </Stack>

              <Typography variant="h6" sx={{ mt: 2, wordWrap: 'break-word' }}>
                <TextHighlighter
                  text={eservice.name}
                  indices={matches?.find((match) => match.key === 'name')?.indices}
                />
              </Typography>

              <Typography variant="body2" component="div">
                <p
                  style={{
                    marginTop: 8,
                    wordWrap: 'break-word',
                    // WebkitLineClamp: 4,
                    // WebkitBoxOrient: 'vertical',
                    // display: '-webkit-box',
                    // overflow: 'hidden',
                  }}
                >
                  {eservice.description}
                </p>
              </Typography>
            </CardContent>
            <CardActions sx={{ mt: 'auto' }}>
              <Stack direction="row" alignItems="center" color="text.secondary" spacing={1}>
                <LockIcon fontSize="small" color="inherit" />
                <Typography variant="caption" color="inherit">
                  Accesso riservato
                </Typography>
              </Stack>
            </CardActions>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export const EServiceCatalogItemSkeleton: React.FC = () => {
  return (
    <Grid width="100%" item sm={12} md={6} lg={4}>
      <Card elevation={8}>
        <Box sx={{ minHeight: 360, display: 'flex', flexDirection: 'column' }}>
          <CardHeader
            disableTypography
            title={
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="overline" textTransform="uppercase" color="text.secondary">
                  E-SERVICE
                </Typography>
                <Skeleton variant="rectangular" width={55} height={26} sx={{ borderRadius: 1 }} />
              </Stack>
            }
          />
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar sx={{ bgcolor: 'background.default' }}>
                <AccountBalanceIcon sx={{ color: '#bdbdbd' }} fontSize="small" />
              </Avatar>
              <Typography variant="caption" color="text.secondary">
                <Skeleton width={80} />
              </Typography>
            </Stack>

            <Typography variant="h6" sx={{ mt: 2 }}>
              <Skeleton />
            </Typography>

            <Typography variant="body2" component="div">
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton width="50%" />
            </Typography>
          </CardContent>
          <CardActions sx={{ mt: 'auto' }}>
            <Stack direction="row" alignItems="center" color="text.secondary" spacing={1}>
              <Skeleton variant="rectangular" width={24} height={24} />

              <Typography variant="caption" color="inherit">
                <Skeleton width={100} />
              </Typography>
            </Stack>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  )
}
