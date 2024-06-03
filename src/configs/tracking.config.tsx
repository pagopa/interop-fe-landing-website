import { initTracking } from '@pagopa/interop-fe-commons'
import { MIXPANEL_PROJECT_ID, ONETRUST_DOMAIN_SCRIPT_ID } from './constants.config'
import React, { createContext } from 'react'

// This should be an union of all the possible mixpanel events
type MixPanelEvent = {
  eventName: 'INTEROP_CATALOG_READ'
  properties: MixPanelCatalogReadEventProps
}

type MixPanelCatalogReadEventProps = {
  eserviceId: string
  descriptorId: string
}

const { trackEvent, useTrackPageViewEvent } = initTracking<MixPanelEvent>({
  enabled: true,
  oneTrustScriptUrl: '/static/local_scripts/oneTrust_production/scripttemplates/otSDKStub.js',
  domainScriptUrl: ONETRUST_DOMAIN_SCRIPT_ID,
  mixpanelToken: MIXPANEL_PROJECT_ID,
})

const TrackingContext = createContext({
  trackEvent,
  useTrackPageViewEvent,
})

export const TrackingProvider = ({ children }: { children: React.ReactNode }) => (
  <TrackingContext.Provider value={{ trackEvent, useTrackPageViewEvent }}>
    {children}
  </TrackingContext.Provider>
)
export const useTrackingContext = () => React.useContext(TrackingContext)
