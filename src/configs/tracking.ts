import { initTracking } from '@pagopa/interop-fe-commons'
// import {
//   INTEROP_RESOURCES_BASE_URL,
//   MIXPANEL_PROJECT_ID,
//   NODE_ENV,
//   ONETRUST_DOMAIN_SCRIPT_ID,
// } from './env'
// import type { ExtendedWindow } from '@/types/common.types'

// This should be an union of all the possible mixpanel events
type MixPanelEvent = {
  eventName: 'TODO_EVENT_NAME'
  properties: MixPanelCatalogReadEventProps
}

type MixPanelCatalogReadEventProps = {
  // TODO: add more properties here
}

const isTrackingEnabled = false

export const { trackEvent, useTrackPageViewEvent } = initTracking<MixPanelEvent>({
  enabled: isTrackingEnabled,
  oneTrustScriptUrl: '',
  domainScriptUrl: '',
  mixpanelToken: '',
  nonce: '',
})
// const isTrackingEnabled = NODE_ENV === 'production' && STAGE === 'PROD'

// export const { trackEvent, useTrackPageViewEvent } = initTracking<MixPanelEvent>({
//   enabled: isTrackingEnabled,
//   oneTrustScriptUrl:
//     INTEROP_RESOURCES_BASE_URL + `/onetrust/oneTrust_production/scripttemplates/otSDKStub.js`,
//   domainScriptUrl: ONETRUST_DOMAIN_SCRIPT_ID,
//   mixpanelToken: MIXPANEL_PROJECT_ID,
//   nonce: (window as unknown as ExtendedWindow).nonce,
// })
