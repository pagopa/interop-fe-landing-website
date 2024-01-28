import { DATI_GOV_IT_DATASET_HREF, GOV_IT_DATASETS_IDS } from '@/configs/constants.config'
import { TimedMetric } from '@/models/numbers.models'
import { Link, Typography } from '@mui/material'

const GovItLink = ({
  metricName,
  timeframe,
}: {
  metricName: keyof typeof GOV_IT_DATASETS_IDS
  timeframe?: keyof TimedMetric<unknown>
}) => {
  const tempId = GOV_IT_DATASETS_IDS[metricName]
  const id = typeof tempId === 'string' ? tempId : tempId[timeframe!]

  return (
    <Typography variant="body2">
      Fonte:{' '}
      <Link href={`${DATI_GOV_IT_DATASET_HREF}/dataset?id=${id}`} target="_blank">
        dati.gov.it
      </Link>
    </Typography>
  )
}

export default GovItLink
