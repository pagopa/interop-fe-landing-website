import type { NextPage } from 'next'
import React from 'react'
import { useLocaleContext } from '@/contexts/locale.context'
import { getCommonData, getNumbersData } from '@/static'
import { PageBottomCta, Dtd } from '@/components'
import Head from 'next/head'
import { INTEROP_NUMBERS_URL_PROD, INTEROP_NUMBERS_URL_TEST } from '@/configs/constants.config'
import { getLocalizedValue, linearScale } from '@/utils/common.utils'
import { Box, Container, Grid, Link, Stack, Typography, useTheme } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import { DataCard } from '@/components/numbers/DataCard'
import { TimeframeSelectInput } from '@/components/numbers/TimeframeSelectInput'
import { DataSectionWrapper } from '@/components/numbers/DataSectionWrapper'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { ChartAndTableWrapper } from '@/components/numbers/ChartAndTableWrapper'
import { MacroCategory, Timeframe } from '@/models/numbers.models'
import { MacroCategorySelectInput } from '@/components/numbers/MacroCategorySelectInput'
import * as ECharts from 'echarts'
import uniq from 'lodash/uniq'

const mockData = {
  publishedEServicesMetric: {
    publishedEServicesCount: 1111,
    lastMonthPublishedEServicesCount: 550,
    variation: 49.5,
  },
  macroCategoriesPublishedEServicesMetric: [
    {
      id: '1',
      name: 'Altre Pubbliche Amministrazioni locali',
      publishedEServicesCount: 9,
    },
    {
      id: '2',
      name: 'Aziende Ospedaliere e ASL',
      publishedEServicesCount: 0,
    },
    {
      id: '3',
      name: 'Comuni e città metropolitane',
      publishedEServicesCount: 944,
    },
    {
      id: '4',
      name: 'Province',
      publishedEServicesCount: 0,
    },
    {
      id: '5',
      name: 'Pubbliche Amministrazioni Centrali',
      publishedEServicesCount: 158,
    },
    {
      id: '6',
      name: 'Regioni',
      publishedEServicesCount: 0,
    },
    {
      id: '7',
      name: 'Scuole',
      publishedEServicesCount: 0,
    },
    {
      id: '8',
      name: 'Università e AFAM',
      publishedEServicesCount: 0,
    },
    {
      id: '9',
      name: 'Istituti di Ricerca',
      publishedEServicesCount: 0,
    },
    {
      id: '10',
      name: 'Stazioni Appaltanti',
      publishedEServicesCount: 0,
    },
  ],
  top10MostSubscribedEServicesMetric: [
    {
      id: '0',
      name: 'Totale',
      top10MostSubscribedEServices: {
        lastSixMonths: [
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 1395,
          },
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 78,
          },
          {
            eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 42,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 28,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 25,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 21,
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 21,
          },
          {
            eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 20,
          },
          {
            eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 18,
          },
          {
            eserviceName: 'C018-servizioAccertamentoCittadinanza-approvazione_automatic',
            tenantName: "Ministero dell'Interno",
            count: 15,
          },
        ],
        lastTwelveMonths: [
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 1395,
          },
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 78,
          },
          {
            eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 42,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 28,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 25,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 21,
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 21,
          },
          {
            eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 20,
          },
          {
            eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 18,
          },
          {
            eserviceName: 'C018-servizioAccertamentoCittadinanza-approvazione_automatic',
            tenantName: "Ministero dell'Interno",
            count: 15,
          },
        ],
        fromTheBeginning: [
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 1395,
          },
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 78,
          },
          {
            eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 42,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 28,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 25,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 21,
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 21,
          },
          {
            eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 20,
          },
          {
            eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 18,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 15,
          },
        ],
      },
    },
    {
      id: '1',
      name: 'Altre Pubbliche Amministrazioni locali',
      top10MostSubscribedEServices: {
        lastSixMonths: [
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 8,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 1,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'Servizio di collegamento imprese/PDND - Richiesta documenti',
            tenantName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            count: 1,
          },
          {
            eserviceName: 'Servizio per la fornitura della Situazione Debitoria',
            tenantName: 'Agenzia delle Entrate - Riscossione',
            count: 1,
          },
          {
            eserviceName: 'Servizio di collegamento imprese/PDND - Callback documenti',
            tenantName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            count: 1,
          },
          {
            eserviceName: 'Richiesta Certificato del Debito',
            tenantName:
              "Istituto Nazionale per l'Assicurazione contro gli Infortuni sul Lavoro - INAIL",
            count: 1,
          },
          {
            eserviceName: 'Richieste CDC',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 1,
          },
          {
            eserviceName: 'VCF2 - Verifica Booleana Codice Fiscale',
            tenantName: 'Agenzia delle Entrate',
            count: 1,
          },
          {
            eserviceName: 'CNCI1 - Accettazione Richiesta Documenti',
            tenantName: 'Agenzia delle Entrate',
            count: 1,
          },
        ],
        lastTwelveMonths: [
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 8,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 1,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'Servizio di collegamento imprese/PDND - Richiesta documenti',
            tenantName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            count: 1,
          },
          {
            eserviceName: 'Servizio per la fornitura della Situazione Debitoria',
            tenantName: 'Agenzia delle Entrate - Riscossione',
            count: 1,
          },
          {
            eserviceName: 'Servizio di collegamento imprese/PDND - Callback documenti',
            tenantName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            count: 1,
          },
          {
            eserviceName: 'Richiesta Certificato del Debito',
            tenantName:
              "Istituto Nazionale per l'Assicurazione contro gli Infortuni sul Lavoro - INAIL",
            count: 1,
          },
          {
            eserviceName: 'Richieste CDC',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 1,
          },
          {
            eserviceName: 'VCF2 - Verifica Booleana Codice Fiscale',
            tenantName: 'Agenzia delle Entrate',
            count: 1,
          },
          {
            eserviceName: 'CNCI1 - Accettazione Richiesta Documenti',
            tenantName: 'Agenzia delle Entrate',
            count: 1,
          },
        ],
        fromTheBeginning: [
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 8,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 1,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'Servizio di collegamento imprese/PDND - Richiesta documenti',
            tenantName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            count: 1,
          },
          {
            eserviceName: 'Servizio per la fornitura della Situazione Debitoria',
            tenantName: 'Agenzia delle Entrate - Riscossione',
            count: 1,
          },
          {
            eserviceName: 'Servizio di collegamento imprese/PDND - Callback documenti',
            tenantName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            count: 1,
          },
          {
            eserviceName: 'Richiesta Certificato del Debito',
            tenantName:
              "Istituto Nazionale per l'Assicurazione contro gli Infortuni sul Lavoro - INAIL",
            count: 1,
          },
          {
            eserviceName: 'Verifica Booleana CodiceFiscale',
            tenantName: 'Agenzia delle Entrate',
            count: 1,
          },
          {
            eserviceName: 'Richieste CDC',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 1,
          },
          {
            eserviceName: 'VCF2 - Verifica Booleana Codice Fiscale',
            tenantName: 'Agenzia delle Entrate',
            count: 1,
          },
        ],
      },
    },
    {
      id: '2',
      name: 'Aziende Ospedaliere e ASL',
      top10MostSubscribedEServices: {
        lastSixMonths: [
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 3,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
        lastTwelveMonths: [
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 3,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
        fromTheBeginning: [
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 3,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
      },
    },
    {
      id: '3',
      name: 'Comuni e città metropolitane',
      top10MostSubscribedEServices: {
        lastSixMonths: [
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 1393,
          },
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 59,
          },
          {
            eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 42,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 28,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 21,
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 21,
          },
          {
            eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 18,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 15,
          },
          {
            eserviceName: 'C018-servizioAccertamentoCittadinanza-approvazione_automatic',
            tenantName: "Ministero dell'Interno",
            count: 15,
          },
          {
            eserviceName: 'C016-servizioAccertamentoDichDecesso-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 15,
          },
        ],
        lastTwelveMonths: [
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 1393,
          },
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 59,
          },
          {
            eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 42,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 28,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 21,
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 21,
          },
          {
            eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 18,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 15,
          },
          {
            eserviceName: 'C018-servizioAccertamentoCittadinanza-approvazione_automatic',
            tenantName: "Ministero dell'Interno",
            count: 15,
          },
          {
            eserviceName: 'C016-servizioAccertamentoDichDecesso-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 15,
          },
        ],
        fromTheBeginning: [
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 1393,
          },
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 59,
          },
          {
            eserviceName: 'C020-servizioAccertamentoResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 42,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 28,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 21,
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 21,
          },
          {
            eserviceName: 'C021-servizioAccertamentoStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 18,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 15,
          },
          {
            eserviceName: 'C018-servizioAccertamentoCittadinanza-approvazione_automatic',
            tenantName: "Ministero dell'Interno",
            count: 15,
          },
          {
            eserviceName: 'C016-servizioAccertamentoDichDecesso-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 15,
          },
        ],
      },
    },
    {
      id: '4',
      name: 'Province',
      top10MostSubscribedEServices: {
        lastSixMonths: [
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 3,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
        lastTwelveMonths: [
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 3,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C024-servizioAccertamentoPaternita',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C021-servizioAccertamentoStatoFamiglia',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C020-servizioAccertamentoResidenza',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C025-servizioAccertamentoMaternita',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C018-servizioAccertamentoCittadinanza',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
        fromTheBeginning: [
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 3,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C024-servizioAccertamentoPaternita',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C021-servizioAccertamentoStatoFamiglia',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C020-servizioAccertamentoResidenza',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C025-servizioAccertamentoMaternita',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C018-servizioAccertamentoCittadinanza',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
      },
    },
    {
      id: '5',
      name: 'Pubbliche Amministrazioni Centrali',
      top10MostSubscribedEServices: {
        lastSixMonths: [
          {
            eserviceName: 'Servizio di collegamento imprese/PDND - Callback documenti',
            tenantName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            count: 4,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 3,
          },
          {
            eserviceName: 'C004-servizioVerificaDichDecesso-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 2,
          },
          {
            eserviceName: 'C006-servizioVerificaDichCittadinanza-approvazione_automatic',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 1,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'Servizio per la fornitura della Situazione Debitoria',
            tenantName: 'Agenzia delle Entrate - Riscossione',
            count: 1,
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
        ],
        lastTwelveMonths: [
          {
            eserviceName: 'Servizio di collegamento imprese/PDND - Callback documenti',
            tenantName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            count: 4,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 3,
          },
          {
            eserviceName: 'C004-servizioVerificaDichDecesso-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 2,
          },
          {
            eserviceName: 'C006-servizioVerificaDichCittadinanza-approvazione_automatic',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'CNF-CheckAvv',
            tenantName: 'Consiglio Nazionale Forense',
            count: 2,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 1,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
        ],
        fromTheBeginning: [
          {
            eserviceName: 'Servizio di collegamento imprese/PDND - Callback documenti',
            tenantName:
              'Unione Italiana delle Camere di Commercio Industria, Artigianato e Agricoltura',
            count: 4,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 3,
          },
          {
            eserviceName: 'C004-servizioVerificaDichDecesso-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 2,
          },
          {
            eserviceName: 'C006-servizioVerificaDichCittadinanza-approvazione_automatic',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C019-servizioAccertamentoEsistenzaVita',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'CNF-CheckAvv',
            tenantName: 'Consiglio Nazionale Forense',
            count: 2,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 1,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
        ],
      },
    },
    {
      id: '6',
      name: 'Regioni',
      top10MostSubscribedEServices: {
        lastSixMonths: [
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 3,
          },
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 3,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C009-servizioVerificaDichStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C004-servizioVerificaDichDecesso-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C012-servizioVerificaDichPaternita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C006-servizioVerificaDichCittadinanza-approvazione_automatic',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C005-servizioVerificaDichStatoMatrimonio-approvazione_automa',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C014-servizioVerificaDichUnioneCivile-approvazione_automatic',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
        ],
        lastTwelveMonths: [
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 3,
          },
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 3,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 2,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C009-servizioVerificaDichStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C004-servizioVerificaDichDecesso-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C012-servizioVerificaDichPaternita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C006-servizioVerificaDichCittadinanza-approvazione_automatic',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
        ],
        fromTheBeginning: [
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 3,
          },
          {
            eserviceName: 'INAD CONSULTAZIONE DD',
            tenantName: "Agenzia per L'Italia Digitale",
            count: 3,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 2,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C009-servizioVerificaDichStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C004-servizioVerificaDichDecesso-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C015-servizioAccertamentoGeneralita',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C012-servizioVerificaDichPaternita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
          {
            eserviceName: 'C006-servizioVerificaDichCittadinanza-approvazione_automatic',
            tenantName: "Ministero dell'Interno",
            count: 2,
          },
        ],
      },
    },
    {
      id: '7',
      name: 'Scuole',
      top10MostSubscribedEServices: {
        lastSixMonths: [
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
        lastTwelveMonths: [
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
        fromTheBeginning: [
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C003-servizioVerificaDichGeneralita-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
      },
    },
    {
      id: '8',
      name: 'Università e AFAM',
      top10MostSubscribedEServices: {
        lastSixMonths: [
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'C009-servizioVerificaDichStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'Consultazione Attestazione ISEE',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 1,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
        lastTwelveMonths: [
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 1,
          },
          {
            eserviceName: 'C009-servizioVerificaDichStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'Consultazione Attestazione ISEE',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 1,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
        fromTheBeginning: [
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 1,
          },
          {
            eserviceName: 'C009-servizioVerificaDichStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 1,
          },
          {
            eserviceName: 'Consultazione Attestazione ISEE',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 1,
          },
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
      },
    },
    {
      id: '9',
      name: 'Istituti di Ricerca',
      top10MostSubscribedEServices: {
        lastSixMonths: [
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C009-servizioVerificaDichStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
        lastTwelveMonths: [
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C009-servizioVerificaDichStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
        fromTheBeginning: [
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C009-servizioVerificaDichStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
      },
    },
    {
      id: '10',
      name: 'Stazioni Appaltanti',
      top10MostSubscribedEServices: {
        lastSixMonths: [
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C009-servizioVerificaDichStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
        lastTwelveMonths: [
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C009-servizioVerificaDichStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
        fromTheBeginning: [
          {
            eserviceName: 'C002-servizioComunicazione-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'SEND - Servizio Notifiche Digitali',
            tenantName: 'PagoPa S.p.A.',
            count: 0,
          },
          {
            eserviceName: 'C007–ServizioVerificaDichEsistenzaVita-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Lista pratiche SUAP del comune di Gambatesa',
            tenantName: 'Comune di Gambatesa',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C008-servizioVerificaDichResidenza-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'Consultazione ISEE - v1',
            tenantName: 'Istituto Nazionale Previdenza Sociale - INPS',
            count: 0,
          },
          {
            eserviceName: 'C001–servizioNotifica-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C010-servizioVerificaDichStatoLibero-approvazione_automatica',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
          {
            eserviceName: 'C009-servizioVerificaDichStatoFamiglia-approvazione_automati',
            tenantName: "Ministero dell'Interno",
            count: 0,
          },
        ],
      },
    },
  ],
  top10ProviderWithMostSubscriberMetric: {
    lastSixMonths: [
      {
        name: "Ministero dell'Interno",
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 0,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 302,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 1,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 7,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: 'Istituto Nazionale Previdenza Sociale - INPS',
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 1,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 7,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 0,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 1,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 1,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: 'Agenzia delle Entrate',
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 1,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 0,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 1,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 3,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: "Agenzia per L'Italia Digitale",
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 4,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 0,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 0,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 0,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: 'Comune di Mortara',
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 0,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 2,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 0,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 0,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: 'GEROPA SRL',
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 0,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 1,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 0,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 0,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
    ],
    lastTwelveMonths: [
      {
        name: "Ministero dell'Interno",
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 0,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 305,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 7,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 7,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 9,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: 'Istituto Nazionale Previdenza Sociale - INPS',
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 1,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 13,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 0,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 2,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 2,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: 'Agenzia delle Entrate',
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 1,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 0,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 2,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 3,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: "Agenzia per L'Italia Digitale",
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 4,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 0,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 0,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 0,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: 'Comune di Mortara',
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 0,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 2,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 0,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 0,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: 'GEROPA SRL',
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 0,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 1,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 0,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 0,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
    ],
    fromTheBeginning: [
      {
        name: "Ministero dell'Interno",
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 0,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 305,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 7,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 7,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 9,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: 'Istituto Nazionale Previdenza Sociale - INPS',
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 1,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 15,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 0,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 2,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 2,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: 'Agenzia delle Entrate',
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 2,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 1,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 3,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 4,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: "Agenzia per L'Italia Digitale",
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 4,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 0,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 0,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 0,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: 'Comune di Mortara',
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 0,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 2,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 0,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 0,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
      {
        name: 'GEROPA SRL',
        topSubscribers: [
          {
            id: '1',
            name: 'Altre Pubbliche Amministrazioni locali',
            agreementsCount: 0,
          },
          {
            id: '2',
            name: 'Aziende Ospedaliere e ASL',
            agreementsCount: 0,
          },
          {
            id: '3',
            name: 'Comuni e città metropolitane',
            agreementsCount: 1,
          },
          {
            id: '4',
            name: 'Province',
            agreementsCount: 0,
          },
          {
            id: '5',
            name: 'Pubbliche Amministrazioni Centrali',
            agreementsCount: 0,
          },
          {
            id: '6',
            name: 'Regioni',
            agreementsCount: 0,
          },
          {
            id: '7',
            name: 'Scuole',
            agreementsCount: 0,
          },
          {
            id: '8',
            name: 'Università e AFAM',
            agreementsCount: 0,
          },
          {
            id: '9',
            name: 'Istituti di Ricerca',
            agreementsCount: 0,
          },
          {
            id: '10',
            name: 'Stazioni Appaltanti',
            agreementsCount: 0,
          },
        ],
      },
    ],
  },
} as const

const NumbersPage: NextPage = () => {
  const { locale } = useLocaleContext()
  const data = getNumbersData(locale)
  const commonData = getCommonData(locale)

  return (
    <>
      <Head>
        <title>{data.meta.title}</title>
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
          href={INTEROP_NUMBERS_URL_TEST}
          crossOrigin="anonymous"
          type="application/json"
          as="fetch"
        />
        <link
          rel="preload"
          href={INTEROP_NUMBERS_URL_PROD}
          crossOrigin="anonymous"
          type="application/json"
          as="fetch"
        />
      </Head>
      <Container>
        <Box component="section" sx={{ my: 8 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 612, mx: 'auto' }}>
            <Typography variant="h1">
              {getLocalizedValue({ it: 'I numeri della PDND', en: 'PDND numbers' })}
            </Typography>
            <Typography color="text.secondary">
              Conosci la piattaforma digitale che abilita l’interoperabilità dei dati attraverso i
              numeri del suo utilizzo
            </Typography>
            <Typography sx={{ mt: 3 }} color="text.secondary" variant="body2">
              I dati sono disponibili come .json su{' '}
              <Link href="dati.gov.it" target="_blank">
                Dati.gov.it <LaunchIcon fontSize="small" sx={{ position: 'relative', top: 6 }} />
              </Link>
            </Typography>
            <Typography
              sx={{ mt: 1 }}
              component="p"
              color="text.secondary"
              variant="caption-semibold"
            >
              ultimo aggiornamento 25/07/2023
            </Typography>
          </Box>
          <Box sx={{ mt: 6, maxWidth: 480 }}>
            <Typography component="p" variant="caption-semibold">
              Nota bene
            </Typography>
            <Typography variant="body2">
              I dati esposti riguardano il solo ambiente di esercizio, non sono mostrati quelli
              dell’ambiente di collaudo.
            </Typography>
          </Box>
        </Box>
      </Container>

      <NumbersPageContent />

      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

const NumbersPageContent: React.FC = () => {
  const { locale } = useLocaleContext()
  const data = getNumbersData(locale)

  return (
    <Box component="main">
      <DataSectionWrapper
        title="E-Service"
        description="Sono gli enti che hanno effettuato l’adesione alla piattaforma e possono essere erogatori di e-service, fruitori o entrambi"
      >
        <PublishedEServices />
      </DataSectionWrapper>
      <DataSectionWrapper
        title="Abilitazione e utilizzo"
        description="Le richieste di fruizione rappresentano l’abilitazione all’accesso dell’e-service da parte degli enti; i voucher staccati rappresentano l’effettivo utilizzo degli e-service disponibili a catalogo"
      >
        <ProvidersSubscribers />
        <MostSubscribedEServices />
      </DataSectionWrapper>
    </Box>
  )
}

const PublishedEServices = () => {
  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const filteredData = mockData.macroCategoriesPublishedEServicesMetric.filter(
      (x) => x.publishedEServicesCount > 0
    )
    const max = Math.max(...filteredData.map((x) => x.publishedEServicesCount))
    const scale = linearScale([0, max], [20, 100])

    return {
      tooltip: {},
      legend: {
        show: true,
        bottom: 0,
        icon: 'circle',
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          data: filteredData.map((x, i) => ({
            category: x.name,
            name: x.name,
            x: i === 0 ? 0 : 50,
            y: i === 0 ? 0 : -50,
            symbolSize: scale(x.publishedEServicesCount) / 0.5,
            value: x.publishedEServicesCount,
          })),
          categories: filteredData.map((x) => ({
            name: x.name,
          })),
          roam: true,
          label: {
            show: false,
          },
          force: {
            repulsion: 5,
          },
        },
      ],
    }
  }, [])

  const tableData: TableData = React.useMemo(() => {
    const head = ["Categoria d'ente", 'E-service pubblicati']
    const body = mockData.macroCategoriesPublishedEServicesMetric.map((x) => [
      x.name,
      x.publishedEServicesCount.toString(),
    ])

    return { head, body }
  }, [])

  return (
    <Grid spacing={3} container>
      <Grid item xs={12} lg={4}>
        <DataCard
          label="E-service pubblicati"
          value={mockData.publishedEServicesMetric.publishedEServicesCount}
          variation={{
            value: mockData.publishedEServicesMetric.lastMonthPublishedEServicesCount.toString(),
            label: 'rispetto al mese precedente',
          }}
        />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ChartAndTableWrapper
          title="Categorie di erogatori"
          description="Numeri di e-service per categoria di ente erogatore"
        >
          <ChartAndTableTabs chartOptions={chartOptions} tableData={tableData} />
        </ChartAndTableWrapper>
      </Grid>
    </Grid>
  )
}

const ProvidersSubscribers = () => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')

  const data = mockData.top10ProviderWithMostSubscriberMetric[timeframe]

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const names = uniq(data.flatMap((x) => [x.name, ...x.topSubscribers.map((y) => y.name)])).map(
      (x) => ({ name: x })
    )

    const links = data.flatMap((x) =>
      x.topSubscribers.map((y) => ({
        source: x.name,
        target: y.name,
        value: y.agreementsCount,
      }))
    )

    return {
      series: {
        type: 'sankey',
        layout: 'none',
        emphasis: {
          focus: 'adjacency',
        },
        data: names,
        links,
      },
    }
  }, [data])

  const tableData: TableData = React.useMemo(() => {
    const head = ['Ente erogatore', 'Ente fruitore', 'Numero di richieste']
    const body = data.flatMap((x) =>
      x.topSubscribers.map((y) => [x.name, y.name, y.agreementsCount.toString()])
    )

    return { head, body }
  }, [data])

  return (
    <ChartAndTableWrapper
      title="Flussi di richieste tra enti"
      description="I 10 enti con maggior numero di richieste di fruizione suddivise per categoria di enti fruitori"
    >
      <Box sx={{ mb: 3 }}>
        <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
      </Box>
      <ChartAndTableTabs chartOptions={chartOptions} chartHeight={800} tableData={tableData} />
    </ChartAndTableWrapper>
  )
}

const MostSubscribedEServices = () => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [macroCategory, setMacroCategory] = React.useState<MacroCategory['id']>('0')

  const barColor = useTheme().palette.primary.main

  const data = React.useMemo(() => {
    const macroCategoryData = mockData.top10MostSubscribedEServicesMetric.find(
      (x) => x.id === macroCategory
    )!
    return macroCategoryData.top10MostSubscribedEServices[timeframe]
  }, [timeframe, macroCategory])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const yAxisData = data.map((x) => `${x.eserviceName} (${x.tenantName})`)
    const seriesData = data.map((x) => x.count)

    return {
      tooltip: {
        trigger: 'item',
      },
      yAxis: {
        type: 'category',
        data: yAxisData,
        axisLabel: {
          overflow: 'break',
        },
      },
      xAxis: {
        type: 'value',
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          color: barColor,
          itemStyle: {
            borderRadius: [0, 20, 20, 0],
          },
          barWidth: 12,
        },
      ],
    }
  }, [data, barColor])

  const tableData: TableData = React.useMemo(() => {
    const head = ['E-service', 'Numero di richieste']
    const body = data.map((x) => [`${x.eserviceName} (${x.tenantName})`, x.count.toString()])

    return { head, body }
  }, [data])

  return (
    <ChartAndTableWrapper
      title="E-service più richiesti"
      description="E-service ordinati per numero di richieste di fruizione, totale e per categoria di ente erogatore"
    >
      <Stack sx={{ mb: 3 }} direction="row" spacing={3}>
        <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
        <MacroCategorySelectInput value={macroCategory} onChange={setMacroCategory} />
      </Stack>
      <ChartAndTableTabs chartOptions={chartOptions} tableData={tableData} />
    </ChartAndTableWrapper>
  )
}

export default NumbersPage
