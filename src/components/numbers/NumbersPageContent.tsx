import React from 'react'
import { Box, Grid } from '@mui/material'
import { DataSectionWrapper } from './DataSectionWrapper'
import { DataCard } from './DataCard'
import { formatThousands } from '@/utils/formatters.utils'
import { Metrics, VariationCard } from '@/models/numbers.models'
import { ChartAndTableWrapper } from '../numbers/ChartAndTableWrapper'
import EServicesByMacroCategories from './EServicesByMacroCategories'
import TopProducersBySubscribers from './TopProducersBySubscribers'
import MostSubscribedEServices from './MostSubscribedEservices'
import TopProducers from './TopProducers'
import EServicesByTenantDistribution from './EServicesByTenantDistribution'
import TotalEntiTenantOnboardingTrend from './TotalEntiTenantOnboardingTrend'
import UsageTrend from './usage/UsageTrend'
import TopEservices from './TopEServices'
// import TenantOnboardingTrend from './TenantOnboardingTrend'
import TopEservicesByToken from './TopEservicesByToken'

type NumberPageContentProps = {
  data: Metrics
}

const NumbersPageContent: React.FC<NumberPageContentProps> = ({ data }) => {
  const tenantsLabels = ['Totale enti', 'Pubblici', 'Privati']
  const tenantsCard = data.totaleEnti
    .filter((el) => tenantsLabels.includes(el.name))
    .map((el) => {
      return {
        ...el,
        color: el.name === 'Totale enti' ? 'Totale' : 'Pubblici/privati',
      }
    })
  const macrocategoriesCard = data.totaleEnti.filter((el) => !tenantsLabels.includes(el.name))
  const totalTenantDistribution = data.distribuzioneDegliEntiPerAttivita.reduce(
    (accumulator, next) => accumulator + next.count,
    0
  )

  return (
    <Box>
      <DataSectionWrapper
        anchor="adesione"
        title="Enti aderenti"
        description={
          <>
            Per abilitare lo scambio dei dati, ogni ente deve completare un processo di adesione
            alla PDND. Al termine, potrà erogare i propri e-service, cioè i servizi digitali che
            permettono l’accesso ai dati, e fruire di quelli erogati da altri enti.
            <br />
            <strong>
              Quanti enti sono iscritti alla piattaforma e per quali attività la utilizzano?
            </strong>
          </>
        }
        background="grey"
      >
        <Grid spacing={3} container>
          <Grid item xs={12} lg={4}>
            <Grid spacing={3} direction="column" container>
              {tenantsCard.map(({ name, totalCount, lastMonthCount, variation, color }, i) => {
                return (
                  <Grid key={i} item xs={12} lg={4}>
                    <GeneralCard
                      label={name}
                      value={totalCount}
                      varation={{
                        value: lastMonthCount,
                        percentage: variation,
                        label: 'rispetto al mese precedente',
                      }}
                      color={color}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={8}>
            <ChartAndTableWrapper
              title="Andamento delle adesioni"
              description="Numero progressivo di enti che aderiscono alla piattaforma"
            >
              <TotalEntiTenantOnboardingTrend data={data.andamentoDelleAdesioni} />
            </ChartAndTableWrapper>
          </Grid>
          {macrocategoriesCard.map((item, i) => (
            <Grid key={i} item xs={12} lg={4}>
              <GeneralCard
                label={item.name}
                value={item.totalCount}
                varation={{
                  value: item.lastMonthCount,
                  percentage: item.variation,
                  label: 'rispetto al mese precedente',
                }}
                color={item.name}
              ></GeneralCard>
            </Grid>
          ))}

          {/* <Grid sx={{ mt: 7 }} item xs={12} lg={12}>
            <TenantOnboardingTrend data={data.andamentoDelleAdesioniPerCategoria} />
          </Grid> */}

          <Grid item xs={12} lg={8} sx={{ mt: { lg: 3, xs: 5 } }}>
            <ChartAndTableWrapper
              title="Distribuzione degli enti per attività"
              description="Numero di: enti erogatori che mettono a disposizione e-service; enti fruitori che li utilizzano; enti sia erogatori che fruitori; enti che effettuano solo l’accesso alla piattaforma"
            >
              <EServicesByTenantDistribution
                data={data.distribuzioneDegliEntiPerAttivita}
                totale={totalTenantDistribution}
              />
            </ChartAndTableWrapper>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ mt: { lg: 3 } }}>
            <Grid spacing={3} container>
              {data.distribuzioneDegliEntiPerAttivita.map((item, i) => (
                <Grid key={i} item xs={12} lg={12}>
                  <GeneralCard
                    label={item.activity}
                    value={item.count}
                    varation={{
                      percentage: ((item.count / totalTenantDistribution) * 100).toFixed(1),
                      label: `su ${formatThousands(totalTenantDistribution)} enti aderenti`,
                    }}
                    color={item.activity}
                  ></GeneralCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DataSectionWrapper>

      <DataSectionWrapper
        anchor="pubblicazione"
        title="E-service pubblicati"
        description={
          <>
            Gli e-service sono servizi digitali che gli enti erogatori realizzano attraverso lo
            sviluppo di connettori automatici (API) e pubblicano sul catalogo della PDND, per
            consentire agli enti fruitori l’accesso ai dati o l’integrazione di processi.
            <br />
            <strong>Quanti e-service sono stati pubblicati a catalogo dagli enti erogatori?</strong>
          </>
        }
      >
        <Grid spacing={3} container>
          <Grid item xs={12} lg={4}>
            <GeneralCard
              label={'E-service pubblicati'}
              value={data.eservicePubblicati.count}
              varation={{
                value: data.eservicePubblicati.lastMonthCount,
                percentage: data.eservicePubblicati.variation,
                label: 'rispetto al mese precedente',
              }}
              color={'E-service pubblicati'}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ChartAndTableWrapper
              title="Enti erogatori di e-service"
              description="Numero di e-service pubblicati suddivisi per categorie di enti erogatori"
            >
              <EServicesByMacroCategories data={data.distribuzioneEServicePerEntiErogatori} />
            </ChartAndTableWrapper>
          </Grid>
        </Grid>

        <TopProducers data={data.entiChePubblicanoPiuEService} />
      </DataSectionWrapper>

      <DataSectionWrapper
        anchor="abilitazione"
        title="Connessioni fra enti"
        description={
          <>
            Per accedere per la prima volta a un e-service di cui è interessato a fruire, un ente
            deve essere in possesso dei requisiti minimi e richiedere l’abilitazione all’ente
            erogatore, stabilendo una connessione che sarà valida anche per gli accessi successivi.
            <br />
            <strong>Quante connessioni tra enti sono state abilitate e per quali e-service?</strong>
          </>
        }
        background="grey"
      >
        <Grid spacing={3} container>
          <Grid item xs={12} lg={4}>
            <GeneralCard
              label="Connessioni totali"
              value={data.connessioniTotali.totalCount}
              varation={{
                value: data.connessioniTotali.lastMonthCount,
                percentage: data.connessioniTotali.variation,
                label: 'rispetto al mese precedente',
              }}
              color={'Totale richieste accesso'}
            />
          </Grid>
        </Grid>
        <TopProducersBySubscribers data={data.entiConPiuConnessioniAbilitate} />
        <MostSubscribedEServices data={data.eServiceConPiuEntiAbilitati} />
      </DataSectionWrapper>

      <DataSectionWrapper
        anchor="utilizzo"
        title="Utilizzo degli e-service"
        description={
          <>
            Una volta abilitato alla connessione, l’ente può accedere all’e-service attraverso una o
            più sessioni di scambio dati di durata massima prestabilita. La piattaforma verifica
            l’abilitazione e permette l’attivazione automatica e sicura di ogni sessione.
            <br />
            <strong>
              Quante sessioni di scambio dati sono state effettuate e per quali e-service?
            </strong>
          </>
        }
      >
        <Grid spacing={3} container>
          <Grid item xs={12} lg={4}>
            <GeneralCard
              label="Totale richieste d'accesso"
              value={data.totaleRichiesteDiAccesso.totalCount}
              varation={{
                value: data.totaleRichiesteDiAccesso.lastMonthCount,
                percentage: data.totaleRichiesteDiAccesso.variation,
                label: 'rispetto al mese precedente',
              }}
              color={'Totale richieste accesso'}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <UsageTrend data={data.attivitaDellaPiattaforma} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TopEservices data={data.eServicePiuUtilizzati} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TopEservicesByToken data={data.eserviceConPiuTokenStaccati} />
          </Grid>
        </Grid>
      </DataSectionWrapper>
    </Box>
  )
}

const GeneralCard = ({
  label,
  value,
  varation,
  color,
}: {
  label: string
  value: number
  varation: VariationCard
  color: string
}) => {
  const variation: VariationCard = {
    percentage: varation.percentage,
    label: varation.label,
    value: varation.value ? formatThousands(varation.value as number) : undefined,
  }

  return (
    <DataCard label={label} value={formatThousands(value)} variation={variation} color={color} />
  )
}

export default NumbersPageContent
