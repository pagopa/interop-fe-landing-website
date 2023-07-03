import { INTEROP_CATALOG_URL } from '@/configs/constants.config'
import { CatalogEservices, EService, EServices } from '@/models/catalog.models'

/**
 * Retrieves the list of public e-services from the bucket
 * @returns The list of public e-services
 */
export async function getEServicesList() {
  const response = await fetch(INTEROP_CATALOG_URL)
  const eservices: EServices = await response.json()
  return eservices
}

/**
 * Retrieves the list of public e-services from the bucket
 * and gets the first element of the list that matches the given id
 * @param id The id of the e-service to retrieve
 * @returns The e-service with the given id
 */
export async function getEService(id: string): Promise<EService | undefined> {
  const eserviceList = await getEServicesList()
  return eserviceList.find((eservice) => eservice.id === id)
}

export function remapEServicesToCatalogEServices(eservices: EServices): CatalogEservices {
  return eservices.map((eservice) => ({
    id: eservice.id,
    name: eservice.name,
    producerName: eservice.producerName,
    description: eservice.description,
    technology: eservice.technology,
  }))
}
