import type { NextPage } from 'next'
import React from 'react'
import { useLocaleContext } from '@/contexts/locale.context'
import { getCommonData, getNumbersData } from '@/static'
import { Dtd, PageBottomCta } from '@/components'
import Head from 'next/head'
import {
  Box,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { DATI_GOV_IT_OVERVIEW_HREF, INTEROP_NUMBERS_NEW } from '@/configs/constants.config'
// import { useGetInteropNumbersNew } from '@/services/numbers.services'
import NumbersPageContent from '@/components/numbers/NumbersPageContent'
import LaunchIcon from '@mui/icons-material/Launch'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { toFormattedDate } from '@/utils/formatters.utils'
import { useGetInteropNumbersNew } from '@/services/numbers.services'
import { SectionSelectInput } from '@/components/SectionSelectInput'

const anchors = [
  { ref: 'adesione', label: 'Adesione', descr: 'Iscrizione degli enti alla piattaforma' },
  { ref: 'pubblicazione', label: 'Pubblicazione', descr: 'Offerta di e-service a catalogo' },
  { ref: 'abilitazione', label: 'Abilitazione', descr: 'Autorizzazione all’uso degli e-service' },
  { ref: 'utilizzo', label: 'Utilizzo', descr: 'Uso degli e-service per accedere ai dati' },
]

const mockData = {
  eserviceConPiuTokenStaccati: {
    lastSixMonths: [
      {
        id: '0',
        name: 'Totale',
        data: [
          {
            eserviceId: '51799439-8575-48d4-8e95-906926ab8e47',
            eserviceName: 'SEND - UAT',
            producerName: 'PagoPA S.p.A.',
            tokenCount: 5817216,
          },
          {
            eserviceId: '59d73ff7-3903-44e6-8cd5-735f616a4715',
            eserviceName: 'evidence-broker_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            tokenCount: 285827,
          },
          {
            eserviceId: '831b6dae-5c2f-4181-9233-54efe8a9244c',
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 241160,
          },
          {
            eserviceId: '9fae5e53-5a41-4f6c-963f-ea449174deab',
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 186149,
          },
          {
            eserviceId: '33efbfdf-c93b-4ef3-9b13-ce4c7821f60a',
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
            producerName: "Ministero dell'Interno",
            tokenCount: 185019,
          },
          {
            eserviceId: 'f175889a-7016-4311-a437-ed8917c92be2',
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 178365,
          },
          {
            eserviceId: '6aaf0bea-23a8-4015-b1ed-58b3707a81c7',
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 95130,
          },
          {
            eserviceId: '5a449d59-d634-478e-8e57-14b2df84a207',
            eserviceName: 'service-catalogue_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            tokenCount: 89519,
          },
          {
            eserviceId: 'abb3f276-033a-42e3-bdf0-252bf420a7e6',
            eserviceName: 'PCP - codeList',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 89396,
          },
          {
            eserviceId: '40821205-72b3-4140-8d49-80bd5f8392f7',
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            tokenCount: 85869,
          },
        ],
      },
      {
        id: '1',
        name: 'Altre Pubbliche Amministrazioni locali',
        data: [
          {
            eserviceId: '59d73ff7-3903-44e6-8cd5-735f616a4715',
            eserviceName: 'evidence-broker_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            tokenCount: 220960,
          },
          {
            eserviceId: '5a449d59-d634-478e-8e57-14b2df84a207',
            eserviceName: 'service-catalogue_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            tokenCount: 71797,
          },
          {
            eserviceId: 'f175889a-7016-4311-a437-ed8917c92be2',
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 56427,
          },
          {
            eserviceId: '9fae5e53-5a41-4f6c-963f-ea449174deab',
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 50190,
          },
          {
            eserviceId: '40821205-72b3-4140-8d49-80bd5f8392f7',
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            tokenCount: 17884,
          },
          {
            eserviceId: '6aaf0bea-23a8-4015-b1ed-58b3707a81c7',
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 17645,
          },
          {
            eserviceId: 'fd0c5d6b-9574-4747-a627-b737aba2dff7',
            eserviceName: 'stub-dataservice_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            tokenCount: 16702,
          },
          {
            eserviceId: 'd43e2565-2f72-4bb2-907e-74a2fd5b5193',
            eserviceName: 'VCFANAPF1 - Verifica Corrispondenza CF e Dati Anagrafici PF',
            producerName: 'Agenzia delle Entrate',
            tokenCount: 5697,
          },
          {
            eserviceId: 'bf163f6e-5f04-40e1-a911-6af1978c7398',
            eserviceName: 'data-service-directory_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            tokenCount: 5105,
          },
          {
            eserviceId: '419a254d-2f3a-4721-81f2-1b4db71c10a3',
            eserviceName: 'VCFANAPF2 - Check Corrispondenza CF PF-Dati Anag-Supporto',
            producerName: 'Agenzia delle Entrate',
            tokenCount: 3147,
          },
        ],
      },
      {
        id: '2',
        name: 'Aziende Ospedaliere e ASL',
        data: [
          {
            eserviceId: '6aaf0bea-23a8-4015-b1ed-58b3707a81c7',
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 2108,
          },
          {
            eserviceId: '9fae5e53-5a41-4f6c-963f-ea449174deab',
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 273,
          },
          {
            eserviceId: '51799439-8575-48d4-8e95-906926ab8e47',
            eserviceName: 'SEND - UAT',
            producerName: 'PagoPA S.p.A.',
            tokenCount: 203,
          },
          {
            eserviceId: 'f175889a-7016-4311-a437-ed8917c92be2',
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 141,
          },
          {
            eserviceId: 'e12ba3a3-bc68-4dd0-9305-e7ee09746ce7',
            eserviceName: 'C006-servizioVerificaDichCittadinanza-approvazione_automatic',
            producerName: "Ministero dell'Interno",
            tokenCount: 139,
          },
          {
            eserviceId: '2555b93a-86d7-4868-9ec7-297db8533945',
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 26,
          },
          {
            eserviceId: '339c6785-278c-44fa-8960-1f31f6b1d6ba',
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            tokenCount: 17,
          },
          {
            eserviceId: '831b6dae-5c2f-4181-9233-54efe8a9244c',
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 16,
          },
          {
            eserviceId: 'abb3f276-033a-42e3-bdf0-252bf420a7e6',
            eserviceName: 'PCP - codeList',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            tokenCount: 3,
          },
        ],
      },
      {
        id: '3',
        name: 'Comuni',
        data: [
          {
            eserviceId: '51799439-8575-48d4-8e95-906926ab8e47',
            eserviceName: 'SEND - UAT',
            producerName: 'PagoPA S.p.A.',
            tokenCount: 5654806,
          },
          {
            eserviceId: 'a6fcd036-f1a2-4df5-b986-7410e9e0e97a',
            eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            tokenCount: 23431,
          },
          {
            eserviceId: '339c6785-278c-44fa-8960-1f31f6b1d6ba',
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            tokenCount: 11333,
          },
          {
            eserviceId: 'c9f46158-c3ab-4642-9614-bf97fef6bcfd',
            eserviceName: 'SEND - TEST',
            producerName: 'PagoPA S.p.A.',
            tokenCount: 3680,
          },
          {
            eserviceId: '4077a94e-6c7f-40b1-b6a5-a5da66ae0eeb',
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            tokenCount: 2715,
          },
          {
            eserviceId: '8730640a-daf8-4c10-8612-c0d76c91dc01',
            eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
            producerName: "Ministero dell'Interno",
            tokenCount: 1851,
          },
          {
            eserviceId: '7dfa7aae-64d4-4e22-9f17-7a5b712e2e80',
            eserviceName: 'C029-servizioAccertamentoDatiAnagrafici-approvazione_automat',
            producerName: "Ministero dell'Interno",
            tokenCount: 1353,
          },
          {
            eserviceId: '075c72f0-c80f-483b-93e6-88788eec423f',
            eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            tokenCount: 1342,
          },
          {
            eserviceId: 'ef56bd13-2eea-4ff7-b58b-8b6c50ce6a67',
            eserviceName: 'C020-servizioAccertamentoResidenza',
            producerName: "Ministero dell'Interno",
            tokenCount: 1188,
          },
          {
            eserviceId: '105cdf2c-1c17-4eb4-858c-af4ce856c3ff',
            eserviceName: 'raccolta differenziata vallecorsa',
            producerName: 'Comune di Vallecorsa',
            tokenCount: 870,
          },
        ],
      },
      {
        id: '4',
        name: 'Province e Città Metropolitane',
        data: [
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 1,
              },
            ],
          },
        ],
      },
      {
        id: '5',
        name: 'Pubbliche Amministrazioni Centrali',
        data: [
          {
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 8,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 8,
              },
            ],
          },
          {
            eserviceName: 'evidence-broker_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'data-service-directory_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'service-catalogue_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'C030-servizioAccertamentoIdUnicoNazionale',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'PreviewSpace_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C001–servizioNotifica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'IFS03_Titoli',
            producerName: "MINISTERO DELL'UNIVERSITA' E DELLA RICERCA",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
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
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'evidence-broker_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'service-catalogue_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'data-service-directory_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'Invio Comunicazioni Obbligatorie - Unilav',
            producerName: 'Ministero del Lavoro e delle Politiche Sociali',
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'C020-servizioAccertamentoResidenza',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'Servizi consultazione Registro Imprese',
            producerName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'C016-servizioAccertamentoDichDecesso',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 1,
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
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 12,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 12,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 7,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 7,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 7,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 6,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 6,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 6,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 6,
              },
            ],
          },
          {
            eserviceName: 'Invio Comunicazioni Obbligatorie - Unilav',
            producerName: 'Ministero del Lavoro e delle Politiche Sociali',
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'Invio Comunicazioni Obbligatorie - UniPi',
            producerName: 'Ministero del Lavoro e delle Politiche Sociali',
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'PCP - codeList',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 3,
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
            eserviceName: 'IFS01 - Offerta formativa (test)',
            producerName: 'Conservatorio Statale di Musica G. Rossini',
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '10',
                name: 'Università e AFAM',
                count: 1,
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
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 12,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 12,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 12,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 12,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 12,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 12,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 11,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 11,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 8,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 8,
              },
            ],
          },
          {
            eserviceName: 'PCP - Gestione utenti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 8,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 8,
              },
            ],
          },
          {
            eserviceName: 'PCP - codeList',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 6,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 6,
              },
            ],
          },
          {
            eserviceName: 'PCP - FVC',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'PCP - FVA',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 3,
              },
            ],
          },
        ],
      },
      {
        id: '13',
        name: 'Privati',
        data: [
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 25,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 25,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 16,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 16,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 16,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 16,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 16,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 16,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 15,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 15,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 14,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 14,
              },
            ],
          },
          {
            eserviceName: 'PCP - codeList',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 12,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 12,
              },
            ],
          },
          {
            eserviceName: 'PCP - Gestione utenti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 12,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 12,
              },
            ],
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita-assicurazioni',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 10,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 10,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pianificazione appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 8,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 8,
              },
            ],
          },
        ],
      },
    ],
    lastTwelveMonths: [
      {
        id: '0',
        name: 'Totale',
        data: [
          {
            eserviceName: 'SEND - UAT',
            producerName: 'PagoPA S.p.A.',
            totalActiveConsumers: 110,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 107,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 2,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 54,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 38,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 5,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 4,
              },
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 2,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 2,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 2,
              },
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 49,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 16,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 12,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 7,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 5,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 3,
              },
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 47,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 16,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 12,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 7,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 4,
              },
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 3,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 44,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 15,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 11,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 6,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 4,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 3,
              },
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 1,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 38,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 14,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 10,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 6,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 3,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 2,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 1,
              },
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 1,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 35,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 13,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 8,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 5,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 3,
              },
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 2,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 2,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 27,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 25,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 27,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 12,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 8,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 5,
              },
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'PCP - Gestione utenti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 24,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 11,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 7,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 3,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 1,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 1,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 1,
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
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'service-catalogue_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'evidence-broker_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'data-service-directory_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 2,
              },
            ],
          },
        ],
      },
      {
        id: '2',
        name: 'Aziende Ospedaliere e ASL',
        data: [
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'SEND - UAT',
            producerName: 'PagoPA S.p.A.',
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'C006-servizioVerificaDichCittadinanza-approvazione_automatic',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
        ],
      },
      {
        id: '3',
        name: 'Comuni',
        data: [
          {
            eserviceName: 'SEND - UAT',
            producerName: 'PagoPA S.p.A.',
            totalActiveConsumers: 107,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 107,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 38,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 38,
              },
            ],
          },
          {
            eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 19,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 19,
              },
            ],
          },
          {
            eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 11,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 11,
              },
            ],
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 10,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 10,
              },
            ],
          },
          {
            eserviceName: 'SEND - TEST',
            producerName: 'PagoPA S.p.A.',
            totalActiveConsumers: 9,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 9,
              },
            ],
          },
          {
            eserviceName: 'C029-servizioAccertamentoDatiAnagrafici-approvazione_automat',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 7,
              },
            ],
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 7,
              },
            ],
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 3,
              },
            ],
          },
        ],
      },
      {
        id: '4',
        name: 'Province e Città Metropolitane',
        data: [
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 1,
              },
            ],
          },
        ],
      },
      {
        id: '5',
        name: 'Pubbliche Amministrazioni Centrali',
        data: [
          {
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 8,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 8,
              },
            ],
          },
          {
            eserviceName: 'evidence-broker_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'data-service-directory_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'service-catalogue_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'C030-servizioAccertamentoIdUnicoNazionale',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'PreviewSpace_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'Composizione Negoziata - Callback documenti',
            producerName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C001–servizioNotifica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
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
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'evidence-broker_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'service-catalogue_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'data-service-directory_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'Invio Comunicazioni Obbligatorie - Unilav',
            producerName: 'Ministero del Lavoro e delle Politiche Sociali',
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C018-servizioAccertamentoCittadinanza',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'Composizione Negoziata - Callback documenti',
            producerName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'C020-servizioAccertamentoResidenza',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 1,
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
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 12,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 12,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 7,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 7,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 6,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 6,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 6,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 6,
              },
            ],
          },
          {
            eserviceName: 'Invio Comunicazioni Obbligatorie - Unilav',
            producerName: 'Ministero del Lavoro e delle Politiche Sociali',
            totalActiveConsumers: 6,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 6,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'Invio Comunicazioni Obbligatorie - UniUrg',
            producerName: 'Ministero del Lavoro e delle Politiche Sociali',
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'PCP - codeList',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 3,
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
            eserviceName: 'IFS01 - Offerta formativa (test)',
            producerName: 'Conservatorio Statale di Musica G. Rossini',
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '10',
                name: 'Università e AFAM',
                count: 1,
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
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 12,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 12,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 12,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 12,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 11,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 11,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 10,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 10,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 8,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 8,
              },
            ],
          },
          {
            eserviceName: 'PCP - Gestione utenti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 7,
              },
            ],
          },
          {
            eserviceName: 'PCP - codeList',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'PCP - FVC',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'PCP - FVA',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 3,
              },
            ],
          },
        ],
      },
      {
        id: '13',
        name: 'Privati',
        data: [
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 25,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 25,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 16,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 16,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 16,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 16,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 15,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 15,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 14,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 14,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 13,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 13,
              },
            ],
          },
          {
            eserviceName: 'PCP - codeList',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 11,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 11,
              },
            ],
          },
          {
            eserviceName: 'PCP - Gestione utenti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 11,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 11,
              },
            ],
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita-assicurazioni',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 8,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 8,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pianificazione appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 7,
              },
            ],
          },
        ],
      },
    ],
    fromTheBeginning: [
      {
        id: '0',
        name: 'Totale',
        data: [
          {
            eserviceName: 'SEND - UAT',
            producerName: 'PagoPA S.p.A.',
            totalActiveConsumers: 110,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 107,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 2,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 54,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 38,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 5,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 4,
              },
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 2,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 2,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 2,
              },
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 49,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 16,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 12,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 7,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 5,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 3,
              },
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 47,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 16,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 12,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 7,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 4,
              },
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 3,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 43,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 15,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 11,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 6,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 4,
              },
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 2,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 1,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 38,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 14,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 10,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 6,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 3,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 2,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 1,
              },
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 1,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 35,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 13,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 8,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 5,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 3,
              },
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 2,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 2,
              },
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 27,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 12,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 8,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 5,
              },
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 25,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 24,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Gestione utenti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 24,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 11,
              },
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 7,
              },
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 3,
              },
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 1,
              },
              {
                id: '3',
                name: 'Comuni',
                count: 1,
              },
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 1,
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
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'service-catalogue_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'evidence-broker_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'data-service-directory_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '1',
                name: 'Altre Pubbliche Amministrazioni locali',
                count: 2,
              },
            ],
          },
        ],
      },
      {
        id: '2',
        name: 'Aziende Ospedaliere e ASL',
        data: [
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'SEND - UAT',
            producerName: 'PagoPA S.p.A.',
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'C006-servizioVerificaDichCittadinanza-approvazione_automatic',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '2',
                name: 'Aziende Ospedaliere e ASL',
                count: 1,
              },
            ],
          },
        ],
      },
      {
        id: '3',
        name: 'Comuni',
        data: [
          {
            eserviceName: 'SEND - UAT',
            producerName: 'PagoPA S.p.A.',
            totalActiveConsumers: 107,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 107,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 38,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 38,
              },
            ],
          },
          {
            eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 19,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 19,
              },
            ],
          },
          {
            eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 11,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 11,
              },
            ],
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 10,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 10,
              },
            ],
          },
          {
            eserviceName: 'SEND - TEST',
            producerName: 'PagoPA S.p.A.',
            totalActiveConsumers: 9,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 9,
              },
            ],
          },
          {
            eserviceName: 'C029-servizioAccertamentoDatiAnagrafici-approvazione_automat',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 7,
              },
            ],
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 7,
              },
            ],
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '3',
                name: 'Comuni',
                count: 3,
              },
            ],
          },
        ],
      },
      {
        id: '4',
        name: 'Province e Città Metropolitane',
        data: [
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '4',
                name: 'Province e Città Metropolitane',
                count: 1,
              },
            ],
          },
        ],
      },
      {
        id: '5',
        name: 'Pubbliche Amministrazioni Centrali',
        data: [
          {
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 8,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 8,
              },
            ],
          },
          {
            eserviceName: 'evidence-broker_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'data-service-directory_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'service-catalogue_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'C030-servizioAccertamentoIdUnicoNazionale',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'PreviewSpace_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 3,
              },
            ],
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'Composizione Negoziata - Callback documenti',
            producerName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C001–servizioNotifica',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '5',
                name: 'Pubbliche Amministrazioni Centrali',
                count: 2,
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
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'service-catalogue_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'evidence-broker_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'data-service-directory_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'Invio Comunicazioni Obbligatorie - Unilav',
            producerName: 'Ministero del Lavoro e delle Politiche Sociali',
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'Composizione Negoziata - Callback documenti',
            producerName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C018-servizioAccertamentoCittadinanza',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 2,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 2,
              },
            ],
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 1,
              },
            ],
          },
          {
            eserviceName: 'C020-servizioAccertamentoResidenza',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '6',
                name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
                count: 1,
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
            eserviceName: 'arch-common-service_SDG',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 12,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 12,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 7,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 7,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 6,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 6,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 6,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 6,
              },
            ],
          },
          {
            eserviceName: 'Invio Comunicazioni Obbligatorie - Unilav',
            producerName: 'Ministero del Lavoro e delle Politiche Sociali',
            totalActiveConsumers: 6,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 6,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'Invio Comunicazioni Obbligatorie - UniUrg',
            producerName: 'Ministero del Lavoro e delle Politiche Sociali',
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'PCP - codeList',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '7',
                name: 'Regioni e Province autonome',
                count: 3,
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
            eserviceName: 'IFS01 - Offerta formativa (test)',
            producerName: 'Conservatorio Statale di Musica G. Rossini',
            totalActiveConsumers: 1,
            activeConsumersByMacroCategory: [
              {
                id: '10',
                name: 'Università e AFAM',
                count: 1,
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
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 12,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 12,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 12,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 12,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 11,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 11,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 10,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 10,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 8,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 8,
              },
            ],
          },
          {
            eserviceName: 'PCP - Gestione utenti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 7,
              },
            ],
          },
          {
            eserviceName: 'PCP - codeList',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 5,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 5,
              },
            ],
          },
          {
            eserviceName: 'PCP - FVC',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
            producerName: "Agenzia per L'Italia Digitale",
            totalActiveConsumers: 4,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 4,
              },
            ],
          },
          {
            eserviceName: 'PCP - FVA',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 3,
            activeConsumersByMacroCategory: [
              {
                id: '12',
                name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
                count: 3,
              },
            ],
          },
        ],
      },
      {
        id: '13',
        name: 'Privati',
        data: [
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 24,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 24,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 16,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 16,
              },
            ],
          },
          {
            eserviceName: 'PCP - Servizi comuni',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 16,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 16,
              },
            ],
          },
          {
            eserviceName: 'PCP - Comunica post pubblicazione',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 15,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 15,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pubblica avviso',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 14,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 14,
              },
            ],
          },
          {
            eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 13,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 13,
              },
            ],
          },
          {
            eserviceName: 'PCP - codeList',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 11,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 11,
              },
            ],
          },
          {
            eserviceName: 'PCP - Gestione utenti',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 11,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 11,
              },
            ],
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita-assicurazioni',
            producerName: "Ministero dell'Interno",
            totalActiveConsumers: 8,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 8,
              },
            ],
          },
          {
            eserviceName: 'PCP - Pianificazione appalto',
            producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
            totalActiveConsumers: 7,
            activeConsumersByMacroCategory: [
              {
                id: '13',
                name: 'Privati',
                count: 7,
              },
            ],
          },
        ],
      },
    ],
  },
  dataDiPubblicazione: '2024-03-18T11:12:02.318Z',
}

const NumbersPage: NextPage = () => {
  const { locale } = useLocaleContext()
  const data = getNumbersData(locale)
  const commonData = getCommonData(locale)
  const { data: d } = useGetInteropNumbersNew()

  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))
  const metricsData = { ...d, eServicePiuUtilizzati: mockData.eServicePiuUtilizzati }

  let metricsData = { ...mockData, ...d }

  return (
    <>
      <Head>
        <title>{data.meta.title}</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content={data.meta.title} />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={data.meta.description}
        />
        <meta key="twitter:image" name="twitter:image" content={data.meta.imgTw} />
        <meta key="og:locale" property="og:locale" content="it_IT" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={data.meta.title} />
        <meta key="og:description" property="og:description" content={data.meta.description} />
        <meta key="og:url" property="og:url" content={data.meta.url} />
        <meta key="og:site_name" property="og:site_name" content={data.meta.sitename} />
        <meta key="og:image" property="og:image" content={data.meta.imgFb} />
        <link
          rel="preload"
          href={INTEROP_NUMBERS_NEW}
          crossOrigin="anonymous"
          type="application/json"
          as="fetch"
        />
      </Head>
      <Container maxWidth={false} sx={{ maxWidth: 1340 }}>
        <PageTitles title={data.title} publishDate={metricsData?.dataDiPubblicazione} />
      </Container>

      {isMobile ? <SectionSelectInput options={anchors} /> : <PageAnchors />}

      {metricsData && d && <NumbersPageContent data={metricsData} />}

      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

type PageTitlesType = {
  publishDate?: string
  title: string
}

const PageTitles: React.FC<PageTitlesType> = ({ title, publishDate }) => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-start', md: 'flex-end' }}
      spacing={{ xs: 3, md: 0 }}
      justifyContent="space-between"
      sx={{ my: 8 }}
    >
      <Box>
        <Box sx={{ maxWidth: 612 }}>
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
          <Typography color="text.primary" sx={{ mt: 1 }}>
            Scopri i numeri della piattaforma che abilita l’interoperabilità dei dati della Pubblica
            Amministrazione, navigando per aree di interesse
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={10}
        sx={{
          border: 1,
          borderColor: 'primary.main',
          borderRadius: 4,
          px: 3,
          py: 1.5,
          maxWidth: 300,
        }}
      >
        <Typography color="text.secondary" variant="body2" sx={{ lineHeight: 1 }}>
          I dati sono disponibili come .json e .csv su{' '}
          <Link href={DATI_GOV_IT_OVERVIEW_HREF} target="_blank">
            dati.gov.it <LaunchIcon fontSize="small" sx={{ position: 'relative', top: 6 }} />
          </Link>
        </Typography>
        <Typography sx={{ mt: 1 }} component="p" color="text.secondary" variant="caption-semibold">
          ultimo aggiornamento {publishDate ? toFormattedDate(new Date(publishDate)) : 'n/d'}
        </Typography>
      </Paper>
    </Stack>
  )
}

const PageAnchors = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        py: { xs: 2, md: 4 },
        position: 'sticky',
        top: 0,
        zIndex: 10000000,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 1340 }}>
        <Stack
          sx={{ color: 'white' }}
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 1, md: 0 }}
        >
          {anchors.map(({ label, ref, descr }, i) => {
            return (
              <Link underline="hover" color="inherit" href={`#${ref}`} key={i} sx={{ flexGrow: 1 }}>
                <Stack direction="column" spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'white', fontWeight: 600 }}
                    >
                      {label}
                    </Typography>
                    <ArrowForwardIcon fontSize="small" sx={{ color: 'white' }} />
                  </Stack>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'white', display: { xs: 'none', md: 'initial' } }}
                  >
                    {descr}
                  </Typography>
                </Stack>
              </Link>
            )
          })}
        </Stack>
      </Container>
    </Box>
  )
}

export default NumbersPage
