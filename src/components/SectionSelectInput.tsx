import { Box, Link, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'

type SectionSelectInput = {
  options: Array<{ ref: string; label: string; descr: string }>
}

export function SectionSelectInput({ options }: SectionSelectInput) {
  const [ref, setRef] = useState<string>('')
  const handleChange = (event: SelectChangeEvent) => {
    setRef(event.target.value)
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
        zIndex: 100000,
        paddingY: 1,
      }}
    >
      <Select sx={{ width: '95%' }} value={ref} onChange={handleChange}>
        {options.map(({ label, ref }, i) => (
          <MenuItem value={label} key={i}>
            <Link underline="hover" color="inherit" href={`#${ref}`} key={i}>
              {label}
            </Link>
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}
