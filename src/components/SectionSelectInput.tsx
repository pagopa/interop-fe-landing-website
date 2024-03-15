import { PRIMARY_BLUE } from '@/configs/constants.config'
import { useHash } from '@/hooks/useHash'
import { Box, InputLabel, Link, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'
type SectionSelectInput = {
  options: Array<{ ref: string; label: string; descr: string }>
}

export function SectionSelectInput({ options }: SectionSelectInput) {
  const [hash, setHash] = useHash('')

  const handleChange = (event: SelectChangeEvent) => {
    setHash(event.target.value)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: 'background.paper',
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 100,
        paddingY: 1,
        borderTop: 8,
        borderBottom: 8,
        borderColor: PRIMARY_BLUE,
      }}
    >
      <Box sx={{ width: '95%', marginY: 2 }}>
        <InputLabel
          sx={{
            transform: 'none',
            position: 'static',
            mb: 1,
            fontSize: 16,
            fontWeight: 400,
            color: 'text.primary',
          }}
        >
          Sezione visualizzata
        </InputLabel>
        <Select fullWidth size="small" value={hash} onChange={handleChange}>
          {options.map(({ label, ref }, i) => (
            <MenuItem value={ref} key={i}>
              <Link underline="hover" color="inherit" href={`#${ref}`} key={i}>
                {label}
              </Link>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  )
}
