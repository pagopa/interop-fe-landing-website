import { initTracking } from '@pagopa/interop-fe-commons'
import { MIXPANEL_PROJECT_ID, ONETRUST_DOMAIN_SCRIPT_ID } from './constants.config'

// This should be an union of all the possible mixpanel events
type MixPanelEvent = {
  eventName: 'INTEROP_CATALOG_READ'
  properties: MixPanelCatalogReadEventProps
}

type MixPanelCatalogReadEventProps = {
  eserviceId: string
  descriptorId: string
}

export const { trackEvent, useTrackPageViewEvent } = initTracking<MixPanelEvent>({
  enabled: true,
  oneTrustScriptUrl: '/static/local_scripts/oneTrust_production/scripttemplates/otSDKStub.js',
  domainScriptUrl: ONETRUST_DOMAIN_SCRIPT_ID,
  mixpanelToken: MIXPANEL_PROJECT_ID,
})
