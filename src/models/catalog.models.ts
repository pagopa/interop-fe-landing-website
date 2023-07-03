export type EServiceAttribute = Array<
  | {
      single: EServiceAttribute
    }
  | {
      group: EServiceAttribute[]
    }
>

export type EServiceAttributes = {
  certified: EServiceAttribute
  verified: EServiceAttribute
  declared: EServiceAttribute
}

export type EServiceDescriptor = {
  id: string
  state: 'PUBLISHED' | 'SUSPENDED'
  version: string
}

export type EService = {
  description: string
  id: string
  attributes: EServiceAttributes
  name: string
  technology: 'REST' | 'SOAP'
  activeDescriptor: EServiceDescriptor
  producerName: string
}

export type EServices = Array<EService>
