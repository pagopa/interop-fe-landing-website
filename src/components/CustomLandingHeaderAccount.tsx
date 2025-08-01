import React from 'react'
import { Container, Stack, Box } from '@mui/material'
import { ButtonNaked } from '@pagopa/mui-italia'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded'

export type JwtUser = {
  id: string
  name?: string
  surname?: string
  email?: string
}

export type UserAction = {
  id: string
  icon: React.ReactNode
  label: string
  onClick: () => void
}

export type RootLinkType = {
  label: string
  href: string
  ariaLabel: string
  title: string
}

type CustomLandingHeaderAccountProps = {
  rootLink: RootLinkType
  rootLinkAddition: JSX.Element
}

export const CustomLandingHeaderAccount = ({
  rootLink,
  rootLinkAddition,
}: CustomLandingHeaderAccountProps) => (
  <Stack
    component="div"
    justifyContent="center"
    sx={{
      borderBottom: 1,
      borderColor: 'divider',
      backgroundColor: 'background.paper',
      // minHeight: '48px',
      py: 1.75,
    }}
  >
    <Container maxWidth={false}>
      <Stack direction="row" justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          {rootLink && (
            <ButtonNaked
              component="a"
              size="small"
              aria-label={rootLink?.ariaLabel}
              href={rootLink?.href}
              target="_blank"
              rel="noreferrer"
              title={rootLink?.title}
              sx={{ fontWeight: 'bold' }}
            >
              {rootLink?.label}
            </ButtonNaked>
          )}
          {rootLinkAddition}
        </Box>
        <ButtonNaked
          component="a"
          size="small"
          aria-label="Vai all'assistenza"
          href="https://github.com/pagopa/pdnd-interop-frontend/issues"
          target="_blank"
          rel="noreferrer"
          title="Vai all'assistenza"
          startIcon={<HelpOutlineRoundedIcon />}
          sx={{ display: 'flex' }}
          weight="default"
        >
          Assistenza
        </ButtonNaked>
      </Stack>
    </Container>
  </Stack>
)
