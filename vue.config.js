const buildVueConfig = require('./vue.config-builder')

module.exports = buildVueConfig({
  appFlavour: 'Corteza',
  appName: 'admin',
  appLabel: 'Corteza Admin',
  theme: 'corteza-base',
  packageAlias: 'corteza-webapp-admin',
})
