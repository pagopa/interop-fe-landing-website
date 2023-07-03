/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@pagopa/mui-italia'])
module.exports = withTM({ output: 'export', reactStrictMode: true, trailingSlash: true })
