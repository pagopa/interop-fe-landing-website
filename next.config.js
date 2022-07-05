/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@pagopa/mui-italia'])

module.exports = withTM({ reactStrictMode: true })
