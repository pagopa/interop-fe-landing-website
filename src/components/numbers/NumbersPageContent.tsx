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
// import TenantOnboardingTrend from './TenantOnboardingTrend'
import TotalEntiTenantOnboardingTrend from './TotalEntiTenantOnboardingTrend'
import UsageTrend from './usage/UsageTrend'
import TopEservices from './TopEServices'
import TenantOnboardingTrend from './TenantOnboardingTrend'
import TopEservicesByToken from './TopEservicesByToken'

type NumberPageContentProps = {
  data: Metrics
}

const NumbersPageContent: React.FC<NumberPageContentProps> = ({ data }) => {
  const tenantsLabels = ['Totale enti', 'Pubblici', 'Privati']
<<<<<<< HEAD
  const tenantsCard = data.totaleEnti.filter((el) => tenantsLabels.includes(el.name))

=======
  const tenantsCard = data.totaleEnti
    .filter((el) => tenantsLabels.includes(el.name))
    .map((el) => {
      return {
        ...el,
        color: el.name === 'Totale enti' ? 'Totale' : 'Pubblici/privati',
      }
    })
>>>>>>> 9561865 ((82): update color for some DataCards)
  const macrocategoriesCard = data.totaleEnti.filter((el) => !tenantsLabels.includes(el.name))
  const totalTenantDistribution = data.distribuzioneDegliEntiPerAttivita.reduce(
    (accumulator, next) => accumulator + next.count,
    0
  )

  console.log('tenantsCard', tenantsCard)
  return (
    <Box>
      <DataSectionWrapper
        anchor="adesione"
        title="Adesione"
        description="Per abilitare l’interoperabilità dei dati è necessario che gli enti aderiscano alla piattaforma"
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

          <Grid sx={{ mt: 7 }} item xs={12} lg={12}>
            <TenantOnboardingTrend data={data.andamentoDelleAdesioniPerCategoria} />
          </Grid>
          <Grid item xs={12} lg={4} sx={{ mt: 5 }}>
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
        title="Pubblicazione"
        description="Per consentire l’accesso ai dati da parte degli enti fruitori, l’ente erogatore realizza e pubblica a catalogo gli e-service"
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
              <EServicesByMacroCategories data={data.entiErogatoriDiEService} />
            </ChartAndTableWrapper>
          </Grid>
        </Grid>

        <TopProducers data={data.entiChePubblicanoPiuEService} />
      </DataSectionWrapper>

      <DataSectionWrapper
        anchor="abilitazione"
        title="Abilitazione"
        description="Per accedere la prima volta a un e-service, l’ente interessato deve essere autorizzato dall’ente erogatore"
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
        <TopProducersBySubscribers data={data.connessioniFraEnti} />
        <MostSubscribedEServices data={data.eServicePiuRichiesti} />
      </DataSectionWrapper>

      <DataSectionWrapper
        anchor="utilizzo"
        title="Utilizzo"
        description="Per usare l’e-service e fruire dei dati, una volta abilitato, l’ente deve fare richiesta d’accesso"
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
