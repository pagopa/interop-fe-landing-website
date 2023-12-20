import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { FilterResult } from '@/hooks'
import { EService } from '@/models/catalog.models'
import NextLink from 'next/link'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import LockIcon from '@mui/icons-material/Lock'
import { EServiceStateChip } from '../EServiceStateChip'
import { getLocalizedValue } from '@/utils/common.utils'

export const EServiceCatalogItem: React.FC<{ filterResult: FilterResult<EService> }> = ({
  filterResult,
}) => {
  const { item: eservice } = filterResult

  return (
    <Grid width="100%" item sm={12} md={6} lg={4}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        elevation={8}
      >
        <CardActionArea
          sx={{
            '.MuiCardActionArea-focusHighlight': {
              backgroundColor: '#0073E6',
            },
            '&:hover .MuiCardActionArea-focusHighlight': {
              backgroundColor: '#0073E6',
            },
            height: '100%',
          }}
          disableRipple
          LinkComponent={NextLink}
          href={`/catalogo/${eservice.id}`}
        >
          <Box sx={{ minHeight: 360, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardHeader
              disableTypography
              title={
                <Stack direction="row" justifyContent="end" alignItems="center">
                  <EServiceStateChip state={eservice.activeDescriptor.state} />
                </Stack>
              }
            />
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ bgcolor: 'background.default' }}>
                  <AccountBalanceIcon sx={{ color: '#bdbdbd' }} fontSize="small" />
                </Avatar>
                <Typography variant="caption" color="text.secondary">
                  {eservice.producerName}
                </Typography>
              </Stack>

              <Typography variant="h6" sx={{ mt: 2 }}>
                {eservice.name}
              </Typography>

              <Typography variant="body2" component="div">
                <p
                  style={{
                    marginTop: 8,
                    wordWrap: 'break-word',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    display: '-webkit-box',
                    overflow: 'hidden',
                  }}
                >
                  {eservice.description}
                </p>
              </Typography>
            </CardContent>
            <CardActions sx={{ mt: 'auto' }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Link href={`/catalogo/${eservice.id}`} underline="always" variant="body2">
                  {getLocalizedValue({
                    it: 'Leggi di più',
                    en: 'Read more',
                  })}
                </Link>
                <Stack direction="row" alignItems="center" color="text.secondary" spacing={1}>
                  <LockIcon fontSize="small" color="inherit" />
                  <Typography variant="caption" color="inherit">
                    Accesso riservato
                  </Typography>
                </Stack>
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
              <Stack direction="row" justifyContent="end" alignItems="center">
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
