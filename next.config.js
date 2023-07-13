const withTM = require('next-transpile-modules')(['@pagopa/mui-italia'])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer(
  withTM({ output: 'export', reactStrictMode: true, trailingSlash: true })
)
