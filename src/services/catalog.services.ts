import { INTEROP_CATALOG_URL } from '@/configs/constants.config'
import { EService, EServices } from '@/models/catalog.models'
import useSWR from 'swr'

/**
 * Retrieves the list of public e-services from the bucket
 * @returns The list of public e-services
 */
async function getEServicesList() {
  const response = await fetch(INTEROP_CATALOG_URL)
  const eservices: EServices = await response.json()
  return eservices
}

export function useGetEServicesList() {
  return useSWR('eservices', getEServicesList)
}

/**
 * Retrieves the list of public e-services from the bucket
 * and gets the first element of the list that matches the given id.
 * Throws an error if no e-service is found.
 * @param id The id of the e-service to retrieve
 * @returns The e-service with the given id
 */
export async function getEService(id: string): Promise<EService | undefined> {
  const eserviceList = await getEServicesList()
  return eserviceList.find((eservice) => eservice.id === id)
}

export function useGetEService(id: string) {
  return useSWR(['eservice', id], () => getEService(id))
}
