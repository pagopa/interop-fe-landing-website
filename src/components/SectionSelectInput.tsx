import { Box, Link, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'
type SectionSelectInput = {
  options: Array<{ ref: string; label: string; descr: string }>
}

export function SectionSelectInput({ options }: SectionSelectInput) {
  const [ref, setRef] = useState<string>('')
  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault()
    const url = window.location.href.split('#')[0]
    window.location.href = `${url}#${event.target.value}`
  }

  useEffect(() => {
    const handleHashChange = debounce(() => {
      const newHash = window.location.hash.split('#')
      const hash = newHash[newHash.length - 1]

      setRef(hash)
    }, 500)

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

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
      <Select sx={{ width: '95%' }} value={ref} onChange={handleChange}>
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
