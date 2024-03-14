import { useHash } from '@/hooks/useHash'
import { Box, Link, MenuItem, Select, SelectChangeEvent } from '@mui/material'
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
      sx={{
        backgroundColor: 'white',
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 100,
        paddingY: 1,
      }}
    >
      <Select sx={{ width: '95%' }} value={hash} onChange={handleChange}>
        {options.map(({ label, ref }, i) => (
          <MenuItem value={ref} key={i}>
            <Link underline="hover" color="inherit" href={`#${ref}`} key={i}>
              {label}
            </Link>
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}
