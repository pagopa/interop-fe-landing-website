/* eslint-disable */
import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { MacroCategory, Timeframe } from '@/models/numbers.models'
import * as ECharts from 'echarts'
import uniq from 'lodash/uniq'
import { TopProducersBySubscribersMetric } from '@/models/numbers.models'
import GovItLink from './GovItLink'
import { formatThousands } from '@/utils/formatters.utils'
import { MACROCATEGORIES_COLORS, NUMBERS_OF_ELEMENTS_TO_SHOW } from '@/configs/constants.config'
import { FiltersStack } from './FiltersStack'
import { MacrocategoriesLink } from './MacrocategoriesLink'
import { MacroCategorySelectInput } from './MacroCategorySelectInput'
import { MacroCategoryMultipleSelectInput } from './MacroCategoryMultipleSelectInput'

const LABEL_SIZE_DESKTOP = 200
const LABEL_SIZE_MOBILE = 120

const mockData = {
  lastSixMonths: [
    {
      id: '0',
      name: 'Totale',
      data: [
        {
          producerName: 'PagoPA S.p.A.',
          macroCategories: [
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 231,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 5,
            },
          ],
        },
        {
          producerName: "Ministero dell'Interno",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 54,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 4,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 8,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 45,
            },
          ],
        },
        {
          producerName: "Agenzia per L'Italia Digitale",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 8,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 2,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 42,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 8,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 15,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 7,
            },
          ],
        },
        {
          producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 7,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 11,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 3,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 3,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 11,
            },
            {
              id: '9',
              name: 'Scuole',
              subscribersCount: 2,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 12,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 20,
            },
          ],
        },
        {
          producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
          macroCategories: [
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 11,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 6,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName:
            'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 2,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 5,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Agenzia delle Entrate',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 7,
            },
          ],
        },
        {
          producerName: 'Ministero delle infrastrutture e dei trasporti',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 2,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ministero del Lavoro e delle Politiche Sociali',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 3,
            },
          ],
        },
        {
          producerName: "MINISTERO DELL'UNIVERSITA' E DELLA RICERCA",
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
          ],
        },
      ],
    },
    {
      id: '1',
      name: 'Altre Pubbliche Amministrazioni locali',
      data: [
        {
          producerName: "Agenzia per L'Italia Digitale",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 8,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 2,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 42,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 8,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 15,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 7,
            },
          ],
        },
        {
          producerName:
            'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 2,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 5,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ispettorato Nazionale del Lavoro',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Consorzio Comuni Bacino Imbrifero Montano di Valle Camonica',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Consiglio Nazionale Forense',
          macroCategories: [],
        },
        {
          producerName: "Autorita' di sistema portuale del Mare Adriatico settentrionale",
          macroCategories: [],
        },
      ],
    },
    {
      id: '2',
      name: 'Aziende Ospedaliere e ASL',
      data: [],
    },
    {
      id: '3',
      name: 'Comuni',
      data: [
        {
          producerName: 'Comune di Surbo',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 3,
            },
          ],
        },
        {
          producerName: 'Comune di Sedriano',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Roncade',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Fasano',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
          ],
        },
        {
          producerName: 'Comune di Gemona del Friuli',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Bassano del Grappa',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Santo Stefano di Magra',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
          ],
        },
        {
          producerName: 'Comune di Nuoro',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
          ],
        },
        {
          producerName: 'Comune di Santa Margherita Ligure',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
          ],
        },
        {
          producerName: 'Comune di San Benedetto del Tronto',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
          ],
        },
      ],
    },
    {
      id: '4',
      name: 'Province e Città Metropolitane',
      data: [],
    },
    {
      id: '5',
      name: 'Pubbliche Amministrazioni Centrali',
      data: [
        {
          producerName: "Ministero dell'Interno",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 54,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 4,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 8,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 45,
            },
          ],
        },
        {
          producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 7,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 11,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 3,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 3,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 11,
            },
            {
              id: '9',
              name: 'Scuole',
              subscribersCount: 2,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 12,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 20,
            },
          ],
        },
        {
          producerName: 'Agenzia delle Entrate',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 7,
            },
          ],
        },
        {
          producerName: 'Ministero delle infrastrutture e dei trasporti',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 2,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ministero del Lavoro e delle Politiche Sociali',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 3,
            },
          ],
        },
        {
          producerName: "MINISTERO DELL'UNIVERSITA' E DELLA RICERCA",
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ministero della Giustizia',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
          ],
        },
        {
          producerName: 'Agenzia delle Entrate - Riscossione',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Presidenza del Consiglio dei Ministri',
          macroCategories: [],
        },
      ],
    },
    {
      id: '6',
      name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
      data: [
        {
          producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
          macroCategories: [
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 11,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 6,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName:
            "Istituto Nazionale per l'Assicurazione contro gli Infortuni sul Lavoro - INAIL",
          macroCategories: [],
        },
      ],
    },
    {
      id: '7',
      name: 'Regioni e Province autonome',
      data: [
        {
          producerName: 'Provincia Autonoma di Trento',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Piemonte',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Marche',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Lombardia',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Liguria',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Emilia-Romagna',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Autonoma Friuli-Venezia Giulia',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Toscana',
          macroCategories: [],
        },
        {
          producerName: "Regione Autonoma Valle D'Aosta",
          macroCategories: [],
        },
      ],
    },
    {
      id: '8',
      name: 'Consorzi e associazioni regionali',
      data: [],
    },
    {
      id: '9',
      name: 'Scuole',
      data: [],
    },
    {
      id: '10',
      name: 'Università e AFAM',
      data: [
        {
          producerName: "Universita' degli Studi di Messina",
          macroCategories: [
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Conservatorio Statale di Musica G. Rossini',
          macroCategories: [
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
          ],
        },
      ],
    },
    {
      id: '11',
      name: 'Istituti di Ricerca',
      data: [],
    },
    {
      id: '12',
      name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
      data: [
        {
          producerName: 'PagoPA S.p.A.',
          macroCategories: [
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 231,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 5,
            },
          ],
        },
        {
          producerName: "Azienda Regionale per l'Innovazione egli Acquisti - ARIA SpA",
          macroCategories: [
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'GEROPA SRL',
          macroCategories: [],
        },
        {
          producerName: 'Poste Italiane Spa',
          macroCategories: [],
        },
      ],
    },
    {
      id: '13',
      name: 'Privati',
      data: [],
    },
  ],
  lastTwelveMonths: [
    {
      id: '0',
      name: 'Totale',
      data: [
        {
          producerName: 'PagoPA S.p.A.',
          macroCategories: [
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 323,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 6,
            },
          ],
        },
        {
          producerName: "Agenzia per L'Italia Digitale",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 9,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 4,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 87,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 5,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 8,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 16,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 11,
            },
          ],
        },
        {
          producerName: "Ministero dell'Interno",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 2,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 66,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 5,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 8,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 2,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 45,
            },
          ],
        },
        {
          producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 8,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 15,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 4,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 4,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 11,
            },
            {
              id: '9',
              name: 'Scuole',
              subscribersCount: 2,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 13,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 20,
            },
          ],
        },
        {
          producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 17,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 6,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Agenzia delle Entrate',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 2,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 4,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 8,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName:
            'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 5,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 3,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ministero del Lavoro e delle Politiche Sociali',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 9,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ministero delle infrastrutture e dei trasporti',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Rossano Veneto',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 3,
            },
          ],
        },
      ],
    },
    {
      id: '1',
      name: 'Altre Pubbliche Amministrazioni locali',
      data: [
        {
          producerName: "Agenzia per L'Italia Digitale",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 9,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 4,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 87,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 5,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 8,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 16,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 11,
            },
          ],
        },
        {
          producerName:
            'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 5,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 3,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ispettorato Nazionale del Lavoro',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Consiglio Nazionale Forense',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: "Autorita' di sistema portuale del Mare Adriatico settentrionale",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Consorzio Comuni Bacino Imbrifero Montano di Valle Camonica',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Aziende Ospedaliere e ASL',
      data: [],
    },
    {
      id: '3',
      name: 'Comuni',
      data: [
        {
          producerName: 'Comune di Rossano Veneto',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 3,
            },
          ],
        },
        {
          producerName: 'Comune di Surbo',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 3,
            },
          ],
        },
        {
          producerName: 'Comune di Sedriano',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Roncade',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Fasano',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
          ],
        },
        {
          producerName: 'Comune di Gemona del Friuli',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Bassano del Grappa',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Caposele',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Santo Stefano di Magra',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
          ],
        },
        {
          producerName: 'Comune di Nuoro',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
          ],
        },
      ],
    },
    {
      id: '4',
      name: 'Province e Città Metropolitane',
      data: [],
    },
    {
      id: '5',
      name: 'Pubbliche Amministrazioni Centrali',
      data: [
        {
          producerName: "Ministero dell'Interno",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 2,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 66,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 5,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 8,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 2,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 45,
            },
          ],
        },
        {
          producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 8,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 15,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 4,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 4,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 11,
            },
            {
              id: '9',
              name: 'Scuole',
              subscribersCount: 2,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 13,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 20,
            },
          ],
        },
        {
          producerName: 'Agenzia delle Entrate',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 2,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 4,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 8,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ministero del Lavoro e delle Politiche Sociali',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 9,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ministero delle infrastrutture e dei trasporti',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: "MINISTERO DELL'UNIVERSITA' E DELLA RICERCA",
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ministero della Giustizia',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
          ],
        },
        {
          producerName: 'Agenzia delle Entrate - Riscossione',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Presidenza del Consiglio dei Ministri',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
          ],
        },
      ],
    },
    {
      id: '6',
      name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
      data: [
        {
          producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 17,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 6,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName:
            "Istituto Nazionale per l'Assicurazione contro gli Infortuni sul Lavoro - INAIL",
          macroCategories: [],
        },
      ],
    },
    {
      id: '7',
      name: 'Regioni e Province autonome',
      data: [
        {
          producerName: 'Provincia Autonoma di Trento',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Piemonte',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Marche',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Lombardia',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Liguria',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Toscana',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: "Regione Autonoma Valle D'Aosta",
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Emilia-Romagna',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Autonoma Friuli-Venezia Giulia',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
      ],
    },
    {
      id: '8',
      name: 'Consorzi e associazioni regionali',
      data: [],
    },
    {
      id: '9',
      name: 'Scuole',
      data: [],
    },
    {
      id: '10',
      name: 'Università e AFAM',
      data: [
        {
          producerName: "Universita' degli Studi di Messina",
          macroCategories: [
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Conservatorio Statale di Musica G. Rossini',
          macroCategories: [
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
          ],
        },
      ],
    },
    {
      id: '11',
      name: 'Istituti di Ricerca',
      data: [],
    },
    {
      id: '12',
      name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
      data: [
        {
          producerName: 'PagoPA S.p.A.',
          macroCategories: [
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 323,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 6,
            },
          ],
        },
        {
          producerName: 'GEROPA SRL',
          macroCategories: [
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: "Azienda Regionale per l'Innovazione egli Acquisti - ARIA SpA",
          macroCategories: [
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Poste Italiane Spa',
          macroCategories: [
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
      ],
    },
    {
      id: '13',
      name: 'Privati',
      data: [],
    },
  ],
  fromTheBeginning: [
    {
      id: '0',
      name: 'Totale',
      data: [
        {
          producerName: 'PagoPA S.p.A.',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 323,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 6,
            },
          ],
        },
        {
          producerName: "Agenzia per L'Italia Digitale",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 9,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 4,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 87,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 5,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 8,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 16,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 11,
            },
          ],
        },
        {
          producerName: "Ministero dell'Interno",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 2,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 66,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 5,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 8,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 2,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 45,
            },
          ],
        },
        {
          producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 9,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 15,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 4,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 4,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 11,
            },
            {
              id: '9',
              name: 'Scuole',
              subscribersCount: 2,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 13,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 20,
            },
          ],
        },
        {
          producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 18,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 3,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 7,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 2,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Agenzia delle Entrate',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 2,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 5,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 8,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName:
            'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 5,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 3,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ministero del Lavoro e delle Politiche Sociali',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 9,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ministero delle infrastrutture e dei trasporti',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Rossano Veneto',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 3,
            },
          ],
        },
      ],
    },
    {
      id: '1',
      name: 'Altre Pubbliche Amministrazioni locali',
      data: [
        {
          producerName: "Agenzia per L'Italia Digitale",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 9,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 4,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 87,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 5,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 8,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 16,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 11,
            },
          ],
        },
        {
          producerName:
            'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 5,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 3,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ispettorato Nazionale del Lavoro',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Consiglio Nazionale Forense',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: "Autorita' di sistema portuale del Mare Adriatico settentrionale",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Consorzio Comuni Bacino Imbrifero Montano di Valle Camonica',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Aziende Ospedaliere e ASL',
      data: [],
    },
    {
      id: '3',
      name: 'Comuni',
      data: [
        {
          producerName: 'Comune di Rossano Veneto',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 3,
            },
          ],
        },
        {
          producerName: 'Comune di Surbo',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 3,
            },
          ],
        },
        {
          producerName: 'Comune di Sedriano',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Roncade',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Fasano',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
          ],
        },
        {
          producerName: 'Comune di Gemona del Friuli',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Bassano del Grappa',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Caposele',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Comune di Santo Stefano di Magra',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
          ],
        },
        {
          producerName: 'Comune di Nuoro',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 2,
            },
          ],
        },
      ],
    },
    {
      id: '4',
      name: 'Province e Città Metropolitane',
      data: [],
    },
    {
      id: '5',
      name: 'Pubbliche Amministrazioni Centrali',
      data: [
        {
          producerName: "Ministero dell'Interno",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 2,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 66,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 5,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 8,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 2,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 45,
            },
          ],
        },
        {
          producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 9,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 15,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 4,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 4,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 11,
            },
            {
              id: '9',
              name: 'Scuole',
              subscribersCount: 2,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 13,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 20,
            },
          ],
        },
        {
          producerName: 'Agenzia delle Entrate',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 2,
            },
            {
              id: '4',
              name: 'Province e Città Metropolitane',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 5,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 8,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ministero del Lavoro e delle Politiche Sociali',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 2,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 9,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ministero delle infrastrutture e dei trasporti',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 3,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '13',
              name: 'Privati',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: "MINISTERO DELL'UNIVERSITA' E DELLA RICERCA",
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Ministero della Giustizia',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 2,
            },
          ],
        },
        {
          producerName: 'Agenzia delle Entrate - Riscossione',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Presidenza del Consiglio dei Ministri',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
          ],
        },
      ],
    },
    {
      id: '6',
      name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
      data: [
        {
          producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 18,
            },
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 3,
            },
            {
              id: '6',
              name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 7,
            },
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 2,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName:
            "Istituto Nazionale per l'Assicurazione contro gli Infortuni sul Lavoro - INAIL",
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
          ],
        },
      ],
    },
    {
      id: '7',
      name: 'Regioni e Province autonome',
      data: [
        {
          producerName: 'Provincia Autonoma di Trento',
          macroCategories: [
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Piemonte',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Marche',
          macroCategories: [
            {
              id: '5',
              name: 'Pubbliche Amministrazioni Centrali',
              subscribersCount: 1,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Lombardia',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Liguria',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Toscana',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: "Regione Autonoma Valle D'Aosta",
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Emilia-Romagna',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Regione Autonoma Friuli-Venezia Giulia',
          macroCategories: [
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
          ],
        },
      ],
    },
    {
      id: '8',
      name: 'Consorzi e associazioni regionali',
      data: [],
    },
    {
      id: '9',
      name: 'Scuole',
      data: [],
    },
    {
      id: '10',
      name: 'Università e AFAM',
      data: [
        {
          producerName: "Universita' degli Studi di Messina",
          macroCategories: [
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Conservatorio Statale di Musica G. Rossini',
          macroCategories: [
            {
              id: '10',
              name: 'Università e AFAM',
              subscribersCount: 1,
            },
          ],
        },
      ],
    },
    {
      id: '11',
      name: 'Istituti di Ricerca',
      data: [],
    },
    {
      id: '12',
      name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
      data: [
        {
          producerName: 'PagoPA S.p.A.',
          macroCategories: [
            {
              id: '1',
              name: 'Altre Pubbliche Amministrazioni locali',
              subscribersCount: 1,
            },
            {
              id: '2',
              name: 'Aziende Ospedaliere e ASL',
              subscribersCount: 1,
            },
            {
              id: '3',
              name: 'Comuni',
              subscribersCount: 323,
            },
            {
              id: '7',
              name: 'Regioni e Province autonome',
              subscribersCount: 1,
            },
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 6,
            },
          ],
        },
        {
          producerName: 'GEROPA SRL',
          macroCategories: [
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: "Azienda Regionale per l'Innovazione egli Acquisti - ARIA SpA",
          macroCategories: [
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
        {
          producerName: 'Poste Italiane Spa',
          macroCategories: [
            {
              id: '12',
              name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
              subscribersCount: 1,
            },
          ],
        },
      ],
    },
    {
      id: '13',
      name: 'Privati',
      data: [],
    },
  ],
}

const TopProducersBySubscribers = ({ data }: { data: TopProducersBySubscribersMetric }) => {
  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const mediaQuerySm = useTheme().breakpoints.values.sm

  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [providersCategory, setProvidersCategory] = React.useState<MacroCategory['id'][]>([
    '5',
    '12',
  ])
  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    providersCategory: MacroCategory['id'][]
  }>({ timeframe, providersCategory: providersCategory })

  const currentData = data[currentSearch.timeframe]

  const filteredCurrentData = React.useMemo(() => {
    const result = mockData[currentSearch.timeframe].filter((x) =>
      providersCategory.includes(x.id as MacroCategory['id'])
    )!

    let data = result.flatMap((x) => {
      return x.data
    })
    return data
  }, [mockData, currentSearch])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const links = filteredCurrentData
      .flatMap((x) =>
        x.macroCategories.map((y) => ({
          source: x.producerName,
          target: y.name,
          value: y.subscribersCount,
          lineStyle: {
            color: MACROCATEGORIES_COLORS[Number(y.id) as keyof typeof MACROCATEGORIES_COLORS],
          },
        }))
      )
      .sort((a, b) => b.value - a.value)
      .slice(0, NUMBERS_OF_ELEMENTS_TO_SHOW)

    const names = uniq(
      links.reduce(
        (a, currentValue) => [...a, currentValue.source, currentValue.target],
        [] as string[]
      )
    ).map((x) => ({ name: x }))
    return {
      media: [
        {
          query: {
            minWidth: mediaQuerySm,
          },
          option: {
            series: {
              right: LABEL_SIZE_DESKTOP,
              label: {
                width: LABEL_SIZE_DESKTOP,
              },
            },
          },
        },
      ],
      textStyle: {
        fontFamily,
      },
      tooltip: {
        show: true,
        borderColor: '#000000',
        formatter: (n: any) => {
          // @ts-ignore-next-line
          const { source, target, value } = n.data
          const subscribersString = `<strong style="margin-left: 12px;">${formatThousands(
            n.value
          )} connessioni</strong>`
          const case1 = `${source} — ${target}`
          const case2 = n.name

          return `${value ? case1 : case2} ${subscribersString}`
        },
      },
      series: {
        type: 'sankey',
        left: 0,
        right: LABEL_SIZE_MOBILE,
        top: 10,
        bottom: 20,
        nodeWidth: 5,
        nodeGap: 14,
        draggable: false,
        layout: 'none',
        emphasis: {
          focus: 'adjacency',
        },
        itemStyle: {
          color: '#000000',
        },
        lineStyle: {
          color: 'target',
        },
        data: names,
        links,
        label: {
          formatter: (a) => a.name,
          fontSize: 14,
          color: textColorPrimary,
          width: LABEL_SIZE_MOBILE,
          overflow: 'truncate',
        },
      },
    }
  }, [currentData, textColorPrimary, mediaQuerySm, fontFamily, filteredCurrentData])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Ente erogatore', 'Ente fruitore', 'Numero di richieste']
    const body = filteredCurrentData.flatMap((x) =>
      x.macroCategories.map((y) => [
        x.producerName,
        y.name,
        formatThousands(y.subscribersCount).toString(),
      ])
    )

    return { head, body }
  }, [currentData, filteredCurrentData])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({
      timeframe,
      providersCategory: providersCategory,
    })
  }

  return (
    <ChartAndTableWrapper
      title="Flussi di richieste fra enti"
      description="I 10 enti erogatori che hanno abilitato più connessioni con gli enti fruitori"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack>
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
          <MacroCategoryMultipleSelectInput
            values={providersCategory}
            onChange={setProvidersCategory}
          />
        </FiltersStack>
      </form>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        chartHeight={600}
        tableData={tableData}
        info={Info}
        childrenPosition="top"
        ariaLabel="Grafico che mostra i flussi di richieste da enti erogatori a macrocategorie di fruitori"
      >
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="body2" aria-hidden={true} sx={{ fontWeight: 600 }} component="span">
            EROGATORI
          </Typography>
          <Typography
            variant="body2"
            aria-hidden={true}
            sx={{
              fontWeight: 600,
              width: { xs: `${LABEL_SIZE_MOBILE}px`, sm: `${LABEL_SIZE_DESKTOP}px` },
            }}
            component="span"
          >
            FRUITORI
          </Typography>
        </Stack>
      </ChartAndTableTabs>

      <Stack direction="column" sx={{ mt: 3 }}>
        <Typography variant="caption" sx={{ mb: 2, fontWeight: 600 }}>
          Legenda
        </Typography>
        <Stack direction="row">
          <LegendSVG />
          <Typography variant="caption" sx={{ mb: 2, fontWeight: 300 }}>
            1 linea = 1 connessione
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <GovItLink metricName="connessioniFraEnti" timeframe={currentSearch.timeframe} />
      </Stack>
    </ChartAndTableWrapper>
  )
}

const Info = (
  <React.Fragment>
    <Typography color="text.secondary" variant="body2">
      La relazione si stabilisce se l’ente fruitore ha fatto almeno 1 richiesta di abilitazione ad
      almeno 1 e-service dell’ente erogatore, e la richiesta è stata accettata.
    </Typography>
    <Typography color="text.secondary" variant="body2">
      Le categorie di fruitori sono riportate nel <MacrocategoriesLink />.
    </Typography>
  </React.Fragment>
)

const LegendSVG = () => {
  return (
    <svg width="25" height="49" viewBox="0 0 45 49" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" x2="20" y1="0" y2="0" stroke="#E69000" stroke-width="1" />
    </svg>
  )
}

export default TopProducersBySubscribers
