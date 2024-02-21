import { getLocalizedValue } from '@/utils/common.utils'
import { TextField, Button } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { FormEvent, useState } from 'react'

type InsertPasswordTypeProps = {
  onInsertPassword: (password: string) => void
  hasError: boolean
}

export const InsertPassword: React.FC<InsertPasswordTypeProps> = ({
  onInsertPassword,
  hasError,
}) => {
  const [password, setPassword] = useState<string>('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onInsertPassword(password)
  }

  return (
    <Box component="form" paddingBottom={10} onSubmit={onSubmit}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="start">
        <TextField
          error={hasError}
          helperText={
            hasError &&
            getLocalizedValue({
              it: 'Password errata',
              en: 'Wrong password',
            })
          }
          sx={{ width: { xs: '100%', md: '25%' } }}
          type="password"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label={getLocalizedValue({
            it: 'Inserisci password',
            en: 'Enter password',
          })}
        />
        <Button variant="contained" color="primary" type="submit">
          {getLocalizedValue({
            it: 'Verifica',
            en: 'Verify',
          })}
        </Button>
      </Stack>
    </Box>
  )
}
