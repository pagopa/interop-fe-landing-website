const withTM = require('next-transpile-modules')(['@pagopa/mui-italia'])

/** @type {import('next').NextConfig} */
module.exports = withTM({ output: 'export', reactStrictMode: true, trailingSlash: true })
