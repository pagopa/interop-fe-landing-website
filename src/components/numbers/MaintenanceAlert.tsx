import {
  WARNING_ALERT_BACKGROUND,
  WARNING_ALERT_BORDER,
  WARNING_ALERT_ICON,
} from '@/configs/constants.config'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import { Alert, AlertTitle } from '@mui/material'

export const MaintenanceAlert: React.FC = () => (
  <Alert
    severity="warning"
    icon={<WarningRoundedIcon />}
    sx={{
      backgroundColor: WARNING_ALERT_BACKGROUND,
      border: `1px solid ${WARNING_ALERT_BORDER}`,
      alignItems: 'flex-start',
      '& .MuiAlert-icon': { padding: 0, color: WARNING_ALERT_ICON },
    }}
  >
    <AlertTitle sx={{ margin: 0, fontWeight: 600, color: WARNING_ALERT_ICON }}>
      Manutenzione in corso
    </AlertTitle>
    <span style={{ color: WARNING_ALERT_ICON }}>
      È in corso una manutenzione programmata che potrebbe comportare dei ritardi nella
      disponibilità dei dati su dashboard e open data. Fai riferimento alla data indicata su questa
      pagina per verificare l&apos;ultimo aggiornamento disponibile. Gli aggiornamenti riprenderanno
      regolarmente al termine dell&apos;intervento.
    </span>
  </Alert>
)
