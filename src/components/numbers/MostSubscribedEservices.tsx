import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from './TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
import { ChartAndTableWrapper } from './ChartAndTableWrapper'
import { MacroCategory, Timeframe } from '@/models/numbers.models'
import { MacroCategorySelectInput } from './MacroCategorySelectInput'
import * as ECharts from 'echarts'
import { MostSubscribedEServicesMetric } from '@/models/numbers.models'
import GovItLink from './GovItLink'
import { formatThousands } from '@/utils/formatters.utils'
import {
  BAR_CHART_NUMERIC_LABEL_COLOR,
  MACROCATEGORIES,
  NUMBERS_OF_ELEMENTS_TO_SHOW,
  PRIMARY_BLUE,
} from '@/configs/constants.config'
import { FiltersStack } from './FiltersStack'
import { MacroCategoryMultipleSelectInput } from './MacroCategoryMultipleSelectInput'

const mockData = {
  lastSixMonths: [
    {
      id: '0',
      name: 'Totale',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 162,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 65,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 57,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 56,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 54,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 53,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 53,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 52,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 52,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 51,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 5,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 158,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 63,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 40,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 31,
            },
            {
              eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 17,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 15,
            },
            {
              eserviceName: 'C001–servizioNotifica-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 13,
            },
            {
              eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 11,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 10,
            },
            {
              eserviceName: 'C029-servizioAccertamentoDatiAnagrafici-approvazione_automat',
              producerName: "Ministero dell'Interno",
              subscribersCount: 9,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 7,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'C030-servizioAccertamentoIdUnicoNazionale',
              producerName: "Ministero dell'Interno",
              subscribersCount: 3,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SmartCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'WAAS-SIUSS-Alimentazione',
              producerName: 'Comune di Sedriano',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 14,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 9,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 9,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 9,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 9,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 8,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'ApiCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 11,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 36,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 21,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-assicurazioni',
              producerName: "Ministero dell'Interno",
              subscribersCount: 21,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 20,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 17,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 16,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 16,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 57,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 29,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 20,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 18,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 18,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 8,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 5,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 3,
            },
            {
              eserviceName: 'CATALOGO - GESTIONE ISTANZA - FRONTOFFICE',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Fascicolo Operatore Economico',
              producerName: 'Ispettorato Nazionale del Lavoro',
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 5,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'CATALOGO - GESTIONE ISTANZA - FRONTOFFICE',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'pippo',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'IPA-consultazione Ente',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'agid-sdg-analytics-services',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 40,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 3,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 3,
            },
            {
              eserviceName: 'CATALOGO - GESTIONE ISTANZA - FRONTOFFICE',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'CATALOGO - GESTIONE ISTANZA - BACKOFFICE',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 7,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Fascicolo Operatore Economico',
              producerName: 'Ispettorato Nazionale del Lavoro',
              subscribersCount: 1,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 14,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 7,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '3',
      name: 'Comuni',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'Test dati storici Anagrafe',
              producerName: 'Comune di Surbo',
              subscribersCount: 3,
            },
            {
              eserviceName: 'Interoperabilità protocollo tra AOO new',
              producerName: 'Comune di Calimera',
              subscribersCount: 3,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 2,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 2,
            },
            {
              eserviceName: 'WAAS-SIUSS-Alimentazione',
              producerName: 'Comune di Sedriano',
              subscribersCount: 2,
            },
            {
              eserviceName: 'analisi del contesto',
              producerName: "Comune di Piacenza D'Adige",
              subscribersCount: 2,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Roncade',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Interoperabilità protocollo tra AOO',
              producerName: 'Comune di Calimera',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Interoperabilità protocollo tra AOO',
              producerName: 'Comune di Alessano',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Bandi di gara',
              producerName: 'Comune di Imperia',
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'Test dati storici Anagrafe',
              producerName: 'Comune di Surbo',
              subscribersCount: 3,
            },
            {
              eserviceName: 'Interoperabilità protocollo tra AOO new',
              producerName: 'Comune di Calimera',
              subscribersCount: 3,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 2,
            },
            {
              eserviceName: 'analisi del contesto',
              producerName: "Comune di Piacenza D'Adige",
              subscribersCount: 2,
            },
            {
              eserviceName: 'Interoperabilità protocollo tra AOO',
              producerName: 'Comune di Calimera',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Interoperabilità protocollo tra AOO',
              producerName: 'Comune di Alessano',
              subscribersCount: 2,
            },
            {
              eserviceName: 'TestProtocollo',
              producerName: 'Comune di Nuoro',
              subscribersCount: 2,
            },
            {
              eserviceName: 'albo pretorio',
              producerName: 'Comune di Renon',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Numeri civici - OGC',
              producerName: 'Comune di Reggio Emilia',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Albo Pretorio test',
              producerName: 'Comune di San Benedetto del Tronto',
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WAAS-SIUSS-Alimentazione',
              producerName: 'Comune di Sedriano',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Welfare as a Service per i Comuni - (WaaS per i Comuni)',
              producerName: 'Comune di Brugherio',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Roncade',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WaaS Welfare as a Service trasmissione dati al SIUSS',
              producerName: 'Comune di Gavorrano',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Welfare as a Service per i Comuni - (WaaS per i Comuni)',
              producerName: 'Comune di Taurasi',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WaaS Welfare as a Service trasmissione dati al SIUSS',
              producerName: "Comune di Arqua' Polesine",
              subscribersCount: 1,
            },
            {
              eserviceName: 'Welfare as a Service per i Comuni - (WaaS per i Comuni)',
              producerName: 'Comune di Ancona',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WaaS Welfare as a Service trasmissione dati al SIUSS',
              producerName: 'Comune di Zagarolo',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WaaS Welfare as a Service trasmissione dati al SIUSS',
              producerName: 'Comune di Crucoli',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'CartaFamigliaFVG-API',
              producerName: 'Comune di Lauco',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Ricezione dati PAT',
              producerName: 'Comune di Cavalese',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Osservatorio Commercio API',
              producerName: 'Comune di Forni Avoltri',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Carta Famiglia',
              producerName: 'Comune di Gemona del Friuli',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Osservatorio Commercio API - V2',
              producerName: 'Comune di Cervignano del Friuli',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Osservatorio Commercio API',
              producerName: 'Comune di Cervignano del Friuli',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Protocollo-API',
              producerName: 'Comune di Muzzana del Turgnano',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'Bandi di gara',
              producerName: 'Comune di Imperia',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Bandi di Concorso',
              producerName: 'Comune di Imperia',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test Bandi di Gara',
              producerName: 'Comune di Falconara Marittima',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '5',
      name: 'Pubbliche Amministrazioni Centrali',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 56,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 54,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 53,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 53,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 52,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 52,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 51,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 50,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 50,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 41,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C006-servizioVerificaDichCittadinanza-approvazione_automatic',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 31,
            },
            {
              eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 17,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 15,
            },
            {
              eserviceName: 'C001–servizioNotifica-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 13,
            },
            {
              eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 11,
            },
            {
              eserviceName: 'C029-servizioAccertamentoDatiAnagrafici-approvazione_automat',
              producerName: "Ministero dell'Interno",
              subscribersCount: 9,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 7,
            },
            {
              eserviceName: 'ApiCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 7,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 5,
            },
            {
              eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 5,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'C030-servizioAccertamentoIdUnicoNazionale',
              producerName: "Ministero dell'Interno",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'CasellarioSanzioniAmministrative versione 1',
              producerName: 'Ministero della Giustizia',
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'SmartCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'ApiCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C030-servizioAccertamentoIdUnicoNazionale',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'OCDS Open Contracting Data Standard',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'IFS03_Titoli',
              producerName: "MINISTERO DELL'UNIVERSITA' E DELLA RICERCA",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C029-servizioAccertamentoDatiAnagrafici',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C001–servizioNotifica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'ANIS - institute',
              producerName: "MINISTERO DELL'UNIVERSITA' E DELLA RICERCA",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 9,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 9,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 9,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 9,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 8,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 6,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SimogWSTED',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'ApiCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SimogWSTED',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 11,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 6,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 36,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 21,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-assicurazioni',
              producerName: "Ministero dell'Interno",
              subscribersCount: 21,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 20,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 17,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 16,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 16,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 15,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 12,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 2,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'EDCperITWALLET',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensione-sociale',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 10,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 7,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 2,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensione-sociale',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-agevolazioni-tributarie-comunali',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-assegno-sociale',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-invalidita-civile',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Richieste CDC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-asilo-nido',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 5,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 5,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'EDCperITWALLET',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIPI Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie VARDATORI Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNILAV Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 1,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIPI Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie VARDATORI Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNILAV Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 1,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SISEPIGestori',
              producerName: 'Regione Autonoma Friuli-Venezia Giulia',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Protocollo API',
              producerName: 'Regione Autonoma Friuli-Venezia Giulia',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
      ],
    },
    {
      id: '8',
      name: 'Consorzi e associazioni regionali',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '9',
      name: 'Scuole',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '10',
      name: 'Università e AFAM',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 1,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 1,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
      ],
    },
    {
      id: '11',
      name: 'Istituti di Ricerca',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '12',
      name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 162,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 65,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 8,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 4,
            },
            {
              eserviceName: 'consultazione dati domicilio',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Signalhub Pull',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'ARCGIS Limiti Amministrativi',
              producerName: "Azienda Regionale per l'Innovazione egli Acquisti - ARIA SpA",
              subscribersCount: 1,
            },
            {
              eserviceName: 'Signalhub Push',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'PushSignal-v0.2',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Volontariato Protezione Civile',
              producerName: "Azienda Regionale per l'Innovazione egli Acquisti - ARIA SpA",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 158,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 63,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 7,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 4,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'consultazione dati domicilio',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Signalhub Pull',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'ARCGIS Limiti Amministrativi',
              producerName: "Azienda Regionale per l'Innovazione egli Acquisti - ARIA SpA",
              subscribersCount: 1,
            },
            {
              eserviceName: 'Signalhub Push',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'PushSignal-v0.2',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Volontariato Protezione Civile',
              producerName: "Azienda Regionale per l'Innovazione egli Acquisti - ARIA SpA",
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test erogazione inversa 01',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 260,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 123,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 79,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 58,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 55,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 55,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 54,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 54,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 53,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 51,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 5,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SimogWSTED',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 254,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 87,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 75,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 43,
            },
            {
              eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 24,
            },
            {
              eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 23,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 21,
            },
            {
              eserviceName: 'C001–servizioNotifica-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 20,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 17,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 16,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 8,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'C030-servizioAccertamentoIdUnicoNazionale',
              producerName: "Ministero dell'Interno",
              subscribersCount: 3,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
              producerName: "Ministero dell'Interno",
              subscribersCount: 2,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'C018-servizioAccertamentoCittadinanza',
              producerName: "Ministero dell'Interno",
              subscribersCount: 2,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 14,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 9,
            },
            {
              eserviceName: 'Invio Comunicazioni Obbligatorie - Unilav',
              producerName: 'Ministero del Lavoro e delle Politiche Sociali',
              subscribersCount: 8,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'ApiCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 11,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 10,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 36,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 21,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-assicurazioni',
              producerName: "Ministero dell'Interno",
              subscribersCount: 21,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 20,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 17,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 16,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 16,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 123,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 30,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 20,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 18,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 18,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 8,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 5,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 4,
            },
            {
              eserviceName: 'stub-dataservice_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 3,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 5,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'CATALOGO - GESTIONE ISTANZA - FRONTOFFICE',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 87,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 3,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 3,
            },
            {
              eserviceName: 'CATALOGO - GESTIONE ISTANZA - FRONTOFFICE',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'CATALOGO - GESTIONE ISTANZA - BACKOFFICE',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 5,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 8,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'stub-dataservice_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'CNF-CheckAvv',
              producerName: 'Consiglio Nazionale Forense',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Fascicolo Operatore Economico',
              producerName: 'Ispettorato Nazionale del Lavoro',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'stub-dataservice_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 14,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 7,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 7,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'stub-dataservice_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 10,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE per PN',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '3',
      name: 'Comuni',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'Analisi del contesto',
              producerName: 'Comune di Rossano Veneto',
              subscribersCount: 3,
            },
            {
              eserviceName: 'Test dati storici Anagrafe',
              producerName: 'Comune di Surbo',
              subscribersCount: 3,
            },
            {
              eserviceName: 'Interoperabilità protocollo tra AOO new',
              producerName: 'Comune di Calimera',
              subscribersCount: 3,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 2,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 2,
            },
            {
              eserviceName: 'WAAS-SIUSS-Alimentazione',
              producerName: 'Comune di Sedriano',
              subscribersCount: 2,
            },
            {
              eserviceName: 'analisi del contesto',
              producerName: "Comune di Piacenza D'Adige",
              subscribersCount: 2,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Roncade',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Dati anagrafici di base del cittadino',
              producerName: 'Comune di Gussago',
              subscribersCount: 2,
            },
            {
              eserviceName: 'contesto',
              producerName: 'Comune di Santa Maria di Sala',
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Lista pratiche SUAP di Porto San Giorgio',
              producerName: 'Comune di Porto San Giorgio',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Dettaglio pratica SUAP del comune di Porto San Giorgio',
              producerName: 'Comune di Porto San Giorgio',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'Analisi del contesto',
              producerName: 'Comune di Rossano Veneto',
              subscribersCount: 3,
            },
            {
              eserviceName: 'Test dati storici Anagrafe',
              producerName: 'Comune di Surbo',
              subscribersCount: 3,
            },
            {
              eserviceName: 'Interoperabilità protocollo tra AOO new',
              producerName: 'Comune di Calimera',
              subscribersCount: 3,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 2,
            },
            {
              eserviceName: 'analisi del contesto',
              producerName: "Comune di Piacenza D'Adige",
              subscribersCount: 2,
            },
            {
              eserviceName: 'Dati anagrafici di base del cittadino',
              producerName: 'Comune di Gussago',
              subscribersCount: 2,
            },
            {
              eserviceName: 'contesto',
              producerName: 'Comune di Santa Maria di Sala',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Ambito - API OGC Civici',
              producerName: 'Comune di Misano Adriatico',
              subscribersCount: 2,
            },
            {
              eserviceName: 'IOT del Comune',
              producerName: 'Comune di Santa Maria di Sala',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Interoperabilità protocollo tra AOO',
              producerName: 'Comune di Calimera',
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WAAS-SIUSS-Alimentazione',
              producerName: 'Comune di Sedriano',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Welfare as a Service per i Comuni - (WaaS per i Comuni)',
              producerName: 'Comune di Brugherio',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Roncade',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WaaS Welfare as a Service trasmissione dati al SIUSS',
              producerName: 'Comune di Gavorrano',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Welfare as a Service per i Comuni - (WaaS per i Comuni)',
              producerName: 'Comune di Taurasi',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WaaS Welfare as a Service trasmissione dati al SIUSS',
              producerName: "Comune di Arqua' Polesine",
              subscribersCount: 1,
            },
            {
              eserviceName: 'Welfare as a Service per i Comuni - (WaaS per i Comuni)',
              producerName: 'Comune di Ancona',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WaaS Welfare as a Service trasmissione dati al SIUSS',
              producerName: 'Comune di Zagarolo',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WaaS Welfare as a Service trasmissione dati al SIUSS',
              producerName: 'Comune di Crucoli',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'Storico Elezioni Amministrative',
              producerName: 'Comune di Caposele',
              subscribersCount: 1,
            },
            {
              eserviceName: 'CartaFamigliaFVG-API',
              producerName: 'Comune di Lauco',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Ricezione dati PAT',
              producerName: 'Comune di Cavalese',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Osservatorio Commercio API',
              producerName: 'Comune di Forni Avoltri',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Carta Famiglia',
              producerName: 'Comune di Gemona del Friuli',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Osservatorio Commercio API - V2',
              producerName: 'Comune di Cervignano del Friuli',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Osservatorio Commercio API',
              producerName: 'Comune di Cervignano del Friuli',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Secondo e-service attributo > 5000 ab.',
              producerName: 'Comune di Cavalese',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Protocollo-API',
              producerName: 'Comune di Muzzana del Turgnano',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test 15/06 - regioni e province autonome',
              producerName: 'Comune di Cavalese',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'Bandi di gara',
              producerName: 'Comune di Imperia',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Bandi di Concorso',
              producerName: 'Comune di Imperia',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test Bandi di Gara',
              producerName: 'Comune di Falconara Marittima',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '5',
      name: 'Pubbliche Amministrazioni Centrali',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 58,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 55,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 55,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 54,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 54,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 53,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 51,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 51,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 51,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 45,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SimogWSTED',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SmartCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 43,
            },
            {
              eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 24,
            },
            {
              eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 23,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 21,
            },
            {
              eserviceName: 'C001–servizioNotifica-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 20,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 17,
            },
            {
              eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 14,
            },
            {
              eserviceName: 'C029-servizioAccertamentoDatiAnagrafici-approvazione_automat',
              producerName: "Ministero dell'Interno",
              subscribersCount: 14,
            },
            {
              eserviceName: 'C004-servizioVerificaDichiarazioneDecesso-approvazione_autom',
              producerName: "Ministero dell'Interno",
              subscribersCount: 10,
            },
            {
              eserviceName: 'C016-servizioAccertamentoDichDecesso-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 10,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'C030-servizioAccertamentoIdUnicoNazionale',
              producerName: "Ministero dell'Interno",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'VCF1 - Verifica Booleana Codice Fiscale',
              producerName: 'Agenzia delle Entrate',
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'CasellarioSanzioniAmministrative versione 1',
              producerName: 'Ministero della Giustizia',
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
              producerName: "Ministero dell'Interno",
              subscribersCount: 2,
            },
            {
              eserviceName: 'C018-servizioAccertamentoCittadinanza',
              producerName: "Ministero dell'Interno",
              subscribersCount: 2,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SmartCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'ApiCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C030-servizioAccertamentoIdUnicoNazionale',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'OCDS Open Contracting Data Standard',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'IFS03_Titoli',
              producerName: "MINISTERO DELL'UNIVERSITA' E DELLA RICERCA",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 9,
            },
            {
              eserviceName: 'Invio Comunicazioni Obbligatorie - Unilav',
              producerName: 'Ministero del Lavoro e delle Politiche Sociali',
              subscribersCount: 8,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 8,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SimogWSTED',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'ApiCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SimogWSTED',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 11,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 6,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 36,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 21,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-assicurazioni',
              producerName: "Ministero dell'Interno",
              subscribersCount: 21,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 20,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 17,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 16,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 16,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 23,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 15,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 2,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'EDCperITWALLET',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensione-sociale',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 16,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 10,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 2,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensione-sociale',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-agevolazioni-tributarie-comunali',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-assegno-sociale',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-invalidita-civile',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Richieste CDC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-asilo-nido',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 6,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 5,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'EDCperITWALLET',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIPI Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie VARDATORI Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNILAV Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 1,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 1,
            },
            {
              eserviceName: 'secondo service per comune Cavalese',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 1,
            },
            {
              eserviceName: 'E-service di test per Comune Cavalese',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIPI Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie VARDATORI Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNILAV Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 1,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 1,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RL-DB Geotopografico National Core-M2052',
              producerName: 'Regione Liguria',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
      ],
    },
    {
      id: '8',
      name: 'Consorzi e associazioni regionali',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '9',
      name: 'Scuole',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '10',
      name: 'Università e AFAM',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 1,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 1,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
      ],
    },
    {
      id: '11',
      name: 'Istituti di Ricerca',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '12',
      name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 260,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 79,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 18,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 17,
            },
            {
              eserviceName: 'Piattaforma Notifiche TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 4,
            },
            {
              eserviceName: 'consultazione dati domicilio',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 254,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 75,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 16,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 14,
            },
            {
              eserviceName: 'Piattaforma Notifiche TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 3,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 4,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'consultazione dati domicilio',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Signalhub Pull',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 260,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 123,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 79,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 58,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 55,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 55,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 54,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 54,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 53,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 51,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 5,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SimogWSTED',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 254,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 87,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 75,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 43,
            },
            {
              eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 24,
            },
            {
              eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 23,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 21,
            },
            {
              eserviceName: 'C001–servizioNotifica-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 20,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 17,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 16,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 8,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'VCF1 - Verifica Booleana Codice Fiscale',
              producerName: 'Agenzia delle Entrate',
              subscribersCount: 3,
            },
            {
              eserviceName: 'C030-servizioAccertamentoIdUnicoNazionale',
              producerName: "Ministero dell'Interno",
              subscribersCount: 3,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'Invio Comunicazioni Obbligatorie - Unilav',
              producerName: 'Ministero del Lavoro e delle Politiche Sociali',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 2,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
              producerName: "Ministero dell'Interno",
              subscribersCount: 2,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'C018-servizioAccertamentoCittadinanza',
              producerName: "Ministero dell'Interno",
              subscribersCount: 2,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 14,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 9,
            },
            {
              eserviceName: 'Invio Comunicazioni Obbligatorie - Unilav',
              producerName: 'Ministero del Lavoro e delle Politiche Sociali',
              subscribersCount: 9,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'ApiCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 11,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 10,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 36,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 21,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-assicurazioni',
              producerName: "Ministero dell'Interno",
              subscribersCount: 21,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 20,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 17,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 16,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 16,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 123,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 30,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 20,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 18,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 18,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 8,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 5,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 5,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 4,
            },
            {
              eserviceName: 'stub-dataservice_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 5,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'CATALOGO - GESTIONE ISTANZA - FRONTOFFICE',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 87,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 3,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 3,
            },
            {
              eserviceName: 'CATALOGO - GESTIONE ISTANZA - FRONTOFFICE',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'CATALOGO - GESTIONE ISTANZA - BACKOFFICE',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 5,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 8,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 4,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'stub-dataservice_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 2,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 2,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'stub-dataservice_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 14,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 7,
            },
            {
              eserviceName: 'service-catalogue_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 7,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 6,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'stub-dataservice_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 10,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 1,
            },
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE per PN',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 1,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'INAD API PUBBLICHE CONSULTAZIONE ',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'evidence-broker_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Servizi consultazione Registro Imprese',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PreviewSpace_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'CATALOGO - METADATI',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'arch-common-service_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'data-service-directory_SDG',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'INAD API INTEGRAZIONE ANPR',
              producerName: "Agenzia per L'Italia Digitale",
              subscribersCount: 0,
            },
            {
              eserviceName: 'Composizione Negoziata - Callback documenti',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Identity Matching - Attestazione rappresentanza legale',
              producerName:
                'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
              subscribersCount: 0,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '3',
      name: 'Comuni',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'Analisi del contesto',
              producerName: 'Comune di Rossano Veneto',
              subscribersCount: 3,
            },
            {
              eserviceName: 'Test dati storici Anagrafe',
              producerName: 'Comune di Surbo',
              subscribersCount: 3,
            },
            {
              eserviceName: 'Interoperabilità protocollo tra AOO new',
              producerName: 'Comune di Calimera',
              subscribersCount: 3,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 2,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 2,
            },
            {
              eserviceName: 'WAAS-SIUSS-Alimentazione',
              producerName: 'Comune di Sedriano',
              subscribersCount: 2,
            },
            {
              eserviceName: 'analisi del contesto',
              producerName: "Comune di Piacenza D'Adige",
              subscribersCount: 2,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Roncade',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Dati anagrafici di base del cittadino',
              producerName: 'Comune di Gussago',
              subscribersCount: 2,
            },
            {
              eserviceName: 'contesto',
              producerName: 'Comune di Santa Maria di Sala',
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Lista pratiche SUAP di Porto San Giorgio',
              producerName: 'Comune di Porto San Giorgio',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Dettaglio pratica SUAP del comune di Porto San Giorgio',
              producerName: 'Comune di Porto San Giorgio',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'Analisi del contesto',
              producerName: 'Comune di Rossano Veneto',
              subscribersCount: 3,
            },
            {
              eserviceName: 'Test dati storici Anagrafe',
              producerName: 'Comune di Surbo',
              subscribersCount: 3,
            },
            {
              eserviceName: 'Interoperabilità protocollo tra AOO new',
              producerName: 'Comune di Calimera',
              subscribersCount: 3,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 2,
            },
            {
              eserviceName: 'analisi del contesto',
              producerName: "Comune di Piacenza D'Adige",
              subscribersCount: 2,
            },
            {
              eserviceName: 'Dati anagrafici di base del cittadino',
              producerName: 'Comune di Gussago',
              subscribersCount: 2,
            },
            {
              eserviceName: 'contesto',
              producerName: 'Comune di Santa Maria di Sala',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Ambito - API OGC Civici',
              producerName: 'Comune di Misano Adriatico',
              subscribersCount: 2,
            },
            {
              eserviceName: 'IOT del Comune',
              producerName: 'Comune di Santa Maria di Sala',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Interoperabilità protocollo tra AOO',
              producerName: 'Comune di Calimera',
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WAAS-SIUSS-Alimentazione',
              producerName: 'Comune di Sedriano',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Welfare as a Service per i Comuni - (WaaS per i Comuni)',
              producerName: 'Comune di Brugherio',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Roncade',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WaaS Welfare as a Service trasmissione dati al SIUSS',
              producerName: 'Comune di Gavorrano',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Welfare as a Service per i Comuni - (WaaS per i Comuni)',
              producerName: 'Comune di Taurasi',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WaaS Welfare as a Service trasmissione dati al SIUSS',
              producerName: "Comune di Arqua' Polesine",
              subscribersCount: 1,
            },
            {
              eserviceName: 'Welfare as a Service per i Comuni - (WaaS per i Comuni)',
              producerName: 'Comune di Ancona',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WaaS Welfare as a Service trasmissione dati al SIUSS',
              producerName: 'Comune di Zagarolo',
              subscribersCount: 1,
            },
            {
              eserviceName: 'WaaS Welfare as a Service trasmissione dati al SIUSS',
              producerName: 'Comune di Crucoli',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'Storico Elezioni Amministrative',
              producerName: 'Comune di Caposele',
              subscribersCount: 1,
            },
            {
              eserviceName: 'CartaFamigliaFVG-API',
              producerName: 'Comune di Lauco',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Ricezione dati PAT',
              producerName: 'Comune di Cavalese',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Osservatorio Commercio API',
              producerName: 'Comune di Forni Avoltri',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Carta Famiglia',
              producerName: 'Comune di Gemona del Friuli',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Osservatorio Commercio API - V2',
              producerName: 'Comune di Cervignano del Friuli',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Osservatorio Commercio API',
              producerName: 'Comune di Cervignano del Friuli',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Secondo e-service attributo > 5000 ab.',
              producerName: 'Comune di Cavalese',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Protocollo-API',
              producerName: 'Comune di Muzzana del Turgnano',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test 15/06 - regioni e province autonome',
              producerName: 'Comune di Cavalese',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Geolander.it - Gestione grafo stradale',
              producerName: "Comune di Rosa'",
              subscribersCount: 0,
            },
            {
              eserviceName: 'API Geografica Numeri Civici',
              producerName: 'ROMA CAPITALE',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Dati storici del cittadino',
              producerName: 'Comune di Peia',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'Bandi di gara',
              producerName: 'Comune di Imperia',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Bandi di Concorso',
              producerName: 'Comune di Imperia',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test Bandi di Gara',
              producerName: 'Comune di Falconara Marittima',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Punti di interesse',
              producerName: 'Comune di Lonigo',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PROT - Protocollo Informatico',
              producerName: 'Comune di Domodossola',
              subscribersCount: 0,
            },
            {
              eserviceName: 'PDND ALBO FASANO',
              producerName: 'Comune di Fasano',
              subscribersCount: 0,
            },
            {
              eserviceName: 'WAAS SIUSS Alimentazione',
              producerName: 'Comune di Granze',
              subscribersCount: 0,
            },
            {
              eserviceName: 'test 2',
              producerName: 'Comune di Sabaudia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Albo pretorio test download',
              producerName: 'Comune di Capurso',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SUE Pula',
              producerName: 'Comune di Pula',
              subscribersCount: 0,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '5',
      name: 'Pubbliche Amministrazioni Centrali',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 58,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 55,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 55,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 54,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 54,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 53,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 51,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 51,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 51,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 45,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 5,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 4,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SimogWSTED',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SmartCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 43,
            },
            {
              eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 24,
            },
            {
              eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 23,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 21,
            },
            {
              eserviceName: 'C001–servizioNotifica-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 20,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 17,
            },
            {
              eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 14,
            },
            {
              eserviceName: 'C029-servizioAccertamentoDatiAnagrafici-approvazione_automat',
              producerName: "Ministero dell'Interno",
              subscribersCount: 14,
            },
            {
              eserviceName: 'C004-servizioVerificaDichiarazioneDecesso-approvazione_autom',
              producerName: "Ministero dell'Interno",
              subscribersCount: 10,
            },
            {
              eserviceName: 'C016-servizioAccertamentoDichDecesso-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 10,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'VCF1 - Verifica Booleana Codice Fiscale',
              producerName: 'Agenzia delle Entrate',
              subscribersCount: 3,
            },
            {
              eserviceName: 'C030-servizioAccertamentoIdUnicoNazionale',
              producerName: "Ministero dell'Interno",
              subscribersCount: 3,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'CasellarioSanzioniAmministrative versione 1',
              producerName: 'Ministero della Giustizia',
              subscribersCount: 2,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'Invio Comunicazioni Obbligatorie - Unilav',
              producerName: 'Ministero del Lavoro e delle Politiche Sociali',
              subscribersCount: 2,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
              producerName: "Ministero dell'Interno",
              subscribersCount: 2,
            },
            {
              eserviceName: 'C018-servizioAccertamentoCittadinanza',
              producerName: "Ministero dell'Interno",
              subscribersCount: 2,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'SmartCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'ApiCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C030-servizioAccertamentoIdUnicoNazionale',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'Invio Comunicazioni Obbligatorie - UniSomm',
              producerName: 'Ministero del Lavoro e delle Politiche Sociali',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 10,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 9,
            },
            {
              eserviceName: 'Invio Comunicazioni Obbligatorie - Unilav',
              producerName: 'Ministero del Lavoro e delle Politiche Sociali',
              subscribersCount: 9,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 8,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SimogWSTED',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'ApiCIG',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 2,
            },
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 1,
            },
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
              producerName: "Ministero dell'Interno",
              subscribersCount: 0,
            },
            {
              eserviceName: 'SimogWSTED',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - FVC',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 12,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 11,
            },
            {
              eserviceName: 'PCP - Pianificazione appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 6,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-approvazione_automati',
              producerName: "Ministero dell'Interno",
              subscribersCount: 36,
            },
            {
              eserviceName: 'PCP - Comunica appalto',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 21,
            },
            {
              eserviceName: 'C019-servizioAccertamentoEsistenzaVita-assicurazioni',
              producerName: "Ministero dell'Interno",
              subscribersCount: 21,
            },
            {
              eserviceName: 'PCP - codeList',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 20,
            },
            {
              eserviceName: 'PCP - Comunica post pubblicazione',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Pubblica avviso',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Servizi comuni',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 18,
            },
            {
              eserviceName: 'PCP - Gestione utenti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 17,
            },
            {
              eserviceName: 'PCP - FVA',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 16,
            },
            {
              eserviceName: 'AUSA - Anagrafe Unica delle Stazioni Appaltanti',
              producerName: "Autorita' Nazionale Anticorruzione - A.N.AC.",
              subscribersCount: 16,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 23,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 15,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 6,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 2,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Richieste CDC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 2,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Richieste CDC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Richiesta Certificato del Debito',
              producerName:
                "Istituto Nazionale per l'Assicurazione contro gli Infortuni sul Lavoro - INAIL",
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 16,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 10,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 2,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 2,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 2,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensione-sociale',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-agevolazioni-tributarie-comunali',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-assegno-sociale',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-invalidita-civile',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Richieste CDC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-asilo-nido',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 6,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 5,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 3,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'EDCperITWALLET',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 1,
            },
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'waas-consultazione-pensioni',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Indicatore ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'DatiPersonaleAziende',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione ISEE - v1',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione DURC',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Consultazione Attestazione ISEE',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-reddito-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-contributi-reddito-familiare',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SIUSS-CasellarioAssistenza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
            },
            {
              eserviceName: 'waas-consultazione-pensione-cittadinanza',
              producerName: 'Istituto Nazionale Previdenza Sociale - INPS',
              subscribersCount: 0,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIPI Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie VARDATORI Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNILAV Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 2,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 1,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 1,
            },
            {
              eserviceName: 'secondo service per comune Cavalese',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 1,
            },
            {
              eserviceName: 'E-service di test per Comune Cavalese',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIPI Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie VARDATORI Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNILAV Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 1,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 1,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'Comunicazioni Obbligatorie UNIURG Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 test RAVDA',
              producerName: "Regione Autonoma Valle D'Aosta",
              subscribersCount: 0,
            },
            {
              eserviceName: 'test-wemodi-petstore-ch_01-integ_02-rest01',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'REGIONE LOMBARDIA - PROVA E-SERVICE  ',
              producerName: 'Regione Lombardia',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RM-CO-001 Comunicazioni obbligatorie Regione Marche',
              producerName: 'Regione Marche',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test Cavalese soglia finalità',
              producerName: 'Provincia Autonoma di Trento',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Sigmater ConsultazioneTARSU',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'prova-aura-profili-anagrafici',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
            {
              eserviceName: 'RL-Notifiche Cantieri - SEND',
              producerName: 'Regione Liguria',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Comunicazioni Obbligatorie UNISOMM Regione Piemonte',
              producerName: 'Regione Piemonte',
              subscribersCount: 0,
            },
          ],
        },
      ],
    },
    {
      id: '8',
      name: 'Consorzi e associazioni regionali',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '9',
      name: 'Scuole',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '10',
      name: 'Università e AFAM',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 1,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 1,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'Prova codici fiscali studenti',
              producerName: "Universita' degli Studi di Messina",
              subscribersCount: 0,
            },
            {
              eserviceName: 'IFS01 - Offerta formativa (test)',
              producerName: 'Conservatorio Statale di Musica G. Rossini',
              subscribersCount: 0,
            },
          ],
        },
      ],
    },
    {
      id: '11',
      name: 'Istituti di Ricerca',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
    {
      id: '12',
      name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
      data: [
        {
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 260,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 79,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 18,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 17,
            },
            {
              eserviceName: 'Piattaforma Notifiche TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 4,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'consultazione dati domicilio',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [
            {
              eserviceName: 'Test Integrazione SDG',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 254,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 75,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 16,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 14,
            },
            {
              eserviceName: 'Piattaforma Notifiche TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 3,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
          ],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 4,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'consultazione dati domicilio',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 2,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 1,
            },
          ],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [
            {
              eserviceName: 'SEND - UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - TEST',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Test ANCI',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Tari_test',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: '1 - Test 1.0.20',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - DEV',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche UAT',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche COLL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'SEND - HOTFIX',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
            },
            {
              eserviceName: 'Piattaforma Notifiche SVIL',
              producerName: 'PagoPA S.p.A.',
              subscribersCount: 0,
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
          id: '0',
          name: 'Tutte',
          mostSubscribedEServices: [],
        },
        {
          id: '1',
          name: 'Altre Pubbliche Amministrazioni locali',
          mostSubscribedEServices: [],
        },
        {
          id: '2',
          name: 'Aziende Ospedaliere e ASL',
          mostSubscribedEServices: [],
        },
        {
          id: '3',
          name: 'Comuni',
          mostSubscribedEServices: [],
        },
        {
          id: '4',
          name: 'Province e Città Metropolitane',
          mostSubscribedEServices: [],
        },
        {
          id: '5',
          name: 'Pubbliche Amministrazioni Centrali',
          mostSubscribedEServices: [],
        },
        {
          id: '6',
          name: 'Enti Nazionali di Previdenza ed Assistenza Sociale',
          mostSubscribedEServices: [],
        },
        {
          id: '7',
          name: 'Regioni e Province autonome',
          mostSubscribedEServices: [],
        },
        {
          id: '8',
          name: 'Consorzi e associazioni regionali',
          mostSubscribedEServices: [],
        },
        {
          id: '9',
          name: 'Scuole',
          mostSubscribedEServices: [],
        },
        {
          id: '10',
          name: 'Università e AFAM',
          mostSubscribedEServices: [],
        },
        {
          id: '11',
          name: 'Istituti di Ricerca',
          mostSubscribedEServices: [],
        },
        {
          id: '12',
          name: 'Stazioni Appaltanti e Gestori di pubblici servizi',
          mostSubscribedEServices: [],
        },
        {
          id: '13',
          name: 'Privati',
          mostSubscribedEServices: [],
        },
      ],
    },
  ],
}

const MostSubscribedEServices = ({ data }: { data: MostSubscribedEServicesMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [providersCategory, setProviderCategory] = React.useState<MacroCategory['id'][]>([
    '5',
    '12',
  ])
  const [consumerCategory, setConsumerCategory] = React.useState<MacroCategory['id']>('0')

  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    providersCategory: MacroCategory['id'][]
    consumerCategory: MacroCategory['id']
  }>({ timeframe, providersCategory: providersCategory, consumerCategory: consumerCategory })

  const mediaQuerySm = useTheme().breakpoints.values.sm
  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const midGrey = useTheme().palette.grey[500]

  const currentData = React.useMemo(() => {
    const currentSelection = mockData[currentSearch.timeframe]
      .filter((x) => providersCategory.includes(x.id as MacroCategory['id']))
      .flatMap((it) => it.data)
      .filter((c) => c.id === currentSearch.consumerCategory)
      .flatMap((it) => it.mostSubscribedEServices)
      .filter((it) => it.subscribersCount > 0)
      .sort((a, b) => b.subscribersCount - a.subscribersCount)
      .slice(0, NUMBERS_OF_ELEMENTS_TO_SHOW)

    return currentSelection
  }, [currentSearch, data])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const sortedData = [...currentData].reverse()
    const yAxisData = sortedData.map((x) => `${x.eserviceName} (${x.producerName})`)
    const seriesData = sortedData.map((x) => x.subscribersCount)

    return {
      media: [
        {
          query: {
            minWidth: mediaQuerySm,
          },
          option: {
            yAxis: {
              axisLabel: {
                width: 1200,
                overflow: 'none',
              },
            },
          },
        },
      ],
      tooltip: {
        show: true,
        valueFormatter: (value) => `${formatThousands(value as number)} enti abilitati`,
      },
      textStyle: {
        fontFamily: fontFamily,
      },
      yAxis: {
        type: 'category',
        data: yAxisData,
        axisTick: {
          show: false,
        },
        axisLabel: {
          backgroundColor: 'white',
          align: 'left',
          margin: -8,
          padding: [0, 0, 10, 0],
          verticalAlign: 'bottom',
          color: textColorPrimary,
          fontSize: 14,
          width: 280,
          overflow: 'truncate',
        },
      },
      xAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: midGrey,
          },
        },
        axisLabel: {
          color: midGrey,
          fontSize: 14,
        },
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          color: PRIMARY_BLUE,
          barWidth: 12,
          label: {
            show: true,
            position: 'insideRight',
            distance: -5,
            align: 'left',
            backgroundColor: 'white',
            color: BAR_CHART_NUMERIC_LABEL_COLOR,
          },
        },
      ],
      grid: {
        right: 30,
        left: 5,
        top: 20,
        bottom: 20,
      },
    }
  }, [currentData, fontFamily, textColorPrimary, mediaQuerySm, midGrey])

  const tableData: TableData = React.useMemo(() => {
    const head = ['E-service', 'Numero di richieste']
    const body = currentData.map((x) => [
      `${x.eserviceName} (${x.producerName})`,
      formatThousands(x.subscribersCount).toString(),
    ])

    return { head, body }
  }, [currentData])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({
      timeframe,
      providersCategory: providersCategory,
      consumerCategory: consumerCategory,
    })
  }

  return (
    <ChartAndTableWrapper
      title="E-service più richiesti"
      description="I 10 e-service con più enti abilitati, filtrabili per categoria di ente fruitore"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack>
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
          <MacroCategoryMultipleSelectInput
            values={providersCategory}
            onChange={setProviderCategory}
          />
          <MacroCategorySelectInput value={consumerCategory} onChange={setConsumerCategory} />
        </FiltersStack>
      </form>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        info={Info}
        ariaLabel={`Grafico che mostra la top 10 filtrabile degli e-service con più enti fruitori per macrocategoria. Macrocategoria attiva: ${
          MACROCATEGORIES[consumerCategory]
        }. ${tableData.body.map((i) => `${i[0]} con ${i[1]} iscritti`).join('; ')}`}
      />
      <Stack direction="row" justifyContent="space-between">
        <GovItLink metricName="eServicePiuRichiesti" timeframe={currentSearch.timeframe} />
      </Stack>
    </ChartAndTableWrapper>
  )
}

const Info = (
  <Typography color="text.secondary" variant="body2">
    I valori sono dati dal numero di richieste di abilitazione accettate per ogni e-service.
  </Typography>
)

export default MostSubscribedEServices
