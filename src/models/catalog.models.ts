export type DescriptorAttributeGroupTypeSingle = {
  single: DescriptorAttribute
}

export type DescriptorAttributeGroupTypeGroup = {
  group: DescriptorAttribute[]
}

export type DescriptorAttributeGroup =
  | DescriptorAttributeGroupTypeSingle
  | DescriptorAttributeGroupTypeGroup

export type DescriptorAttributeGroups = Array<DescriptorAttributeGroup>

export type DescriptorAttribute = {
  name: string
  description: string
}

export type AttributeKey = 'certified' | 'verified' | 'declared'

export type DescriptorAttributes = {
  certified: DescriptorAttributeGroups
  verified: DescriptorAttributeGroups
  declared: DescriptorAttributeGroups
}

export type EServiceDescriptor = {
  id: string
  state: 'PUBLISHED' | 'SUSPENDED'
  version: string
}

export type EService = {
  description: string
  id: string
  attributes: DescriptorAttributes
  name: string
  technology: 'REST' | 'SOAP'
  activeDescriptor: EServiceDescriptor
  producerName: string
}

export type EServices = Array<EService>

export type SortBy = 'recent-asc' | 'name-asc' | 'name-desc' | 'recent-desc'
export type SortedEServices = Record<SortBy, EServices>
