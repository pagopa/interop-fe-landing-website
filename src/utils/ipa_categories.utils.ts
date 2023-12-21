import {
  DescriptorAttribute,
  DescriptorAttributeGroupTypeGroup,
  DescriptorAttributeGroupTypeSingle,
  DescriptorAttributeGroups,
} from '@/models/catalog.models'

export const CERTIFIED_ATTRIBUTES_IPA_TYPOLOGIES_NAMES = ['Pubbliche Amministrazioni']

export const CERTIFIED_ATTRIBUTES_IPA_CATEGORIES_NAMES = [
  'Enti di Previdenza ed Assistenza Sociale in Conto Economico Consolidato privati ',
  'Enti di Previdenza ed Assistenza Sociale in Conto Economico Consolidato pubblici',
  'Gestori di Pubblici Servizi',
  'Stazioni Appaltanti Gestori di Pubblici Servizi',
  'Agenzie ed Enti per il Turismo',
  'Agenzie ed Enti Regionali del Lavoro',
  'Agenzie ed Enti Regionali di Sviluppo Agricolo',
  "Agenzie ed Enti Regionali per la Formazione, la Ricerca e l'Ambiente",
  'Agenzie Fiscali',
  'Agenzie Regionali e Provinciale per la Rappresentanza Negoziale',
  'Agenzie Regionali per le Erogazioni in Agricoltura',
  'Agenzie Regionali Sanitarie',
  'Agenzie, Enti e Consorzi Pubblici per il Diritto allo Studio Universitario',
  'Altri Enti Locali',
  'Automobile Club Federati ACI',
  "Autorita' Amministrative Indipendenti",
  "Autorita' di Bacino",
  "Autorita' Portuali",
  "Aziende e Consorzi Pubblici Territoriali per l'Edilizia Residenziale",
  'Aziende ed Amministrazioni dello Stato ad Ordinamento Autonomo',
  'Aziende Ospedaliere, Aziende Ospedaliere Universitarie, Policlinici e Istituti di Ricovero e Cura a Carattere Scientifico Pubblici',
  'Aziende Pubbliche di Servizi alla Persona',
  'Aziende Sanitarie Locali',
  'Camere di Commercio, Industria, Artigianato e Agricoltura e loro Unioni Regionali',
  "Citta' Metropolitane",
  'Commissari Straordinari Governativi',
  'Comuni e loro Consorzi e Associazioni',
  "Comunita' Montane e loro Consorzi e Associazioni",
  'Consorzi di Bacino Imbrifero Montano',
  'Consorzi Interuniversitari di Ricerca',
  "Consorzi per l'Area di Sviluppo Industriale",
  'Consorzi tra Amministrazioni Locali',
  'Enti di Regolazione dei Servizi Idrici e o dei Rifiuti',
  'Enti e Istituzioni di Ricerca Pubblici',
  'Enti Pubblici Non Economici',
  'Enti Pubblici Produttori di Servizi Assistenziali, Ricreativi e Culturali ',
  'Federazioni Nazionali, Ordini, Collegi e Consigli Professionali',
  'Fondazioni Lirico, Sinfoniche',
  "Forze di Polizia ad Ordinamento Civile e Militare per la Tutela dell'Ordine e della Sicurezza Pubblica",
  'Istituti di Istruzione Statale di Ogni Ordine e Grado',
  'Istituti Zooprofilattici Sperimentali',
  "Istituzioni per l'Alta Formazione Artistica, Musicale e Coreutica - AFAM",
  'Organi Costituzionali e di Rilievo Costituzionale',
  'Parchi Nazionali, Consorzi e Enti Gestori di Parchi e Aree Naturali Protette',
  'Presidenza del Consiglio dei Ministri, Ministeri e Avvocatura dello Stato',
  'Province e loro Consorzi e Associazioni',
  'Regioni, Province Autonome e loro Consorzi e Associazioni',
  'Teatri Stabili ad Iniziativa Pubblica',
  'Unioni di Comuni e loro Consorzi e Associazioni',
  "Universita' e Istituti di Istruzione Universitaria Pubblici",
  "Societa' in Conto Economico Consolidato",
  'Stazioni Appaltanti',
]

function decorateAttribute(attribute: DescriptorAttribute) {
  const decoratedAttribute = { ...attribute }

  if (CERTIFIED_ATTRIBUTES_IPA_CATEGORIES_NAMES.includes(attribute.name)) {
    decoratedAttribute.description = `Categoria del Catalogo IPA: ${attribute.description}`
  }

  if (CERTIFIED_ATTRIBUTES_IPA_TYPOLOGIES_NAMES.includes(attribute.name)) {
    decoratedAttribute.description = `Tipologia di Categoria del Catalogo IPA: ${attribute.description}`
  }

  return decoratedAttribute
}

export function decorateCertifiedAttributes(attributes: DescriptorAttributeGroups) {
  return attributes.map((a) => {
    if ((a as DescriptorAttributeGroupTypeSingle).single) {
      const decoratedSingle = decorateAttribute((a as DescriptorAttributeGroupTypeSingle).single)
      return { single: decoratedSingle }
    }

    if ((a as DescriptorAttributeGroupTypeGroup).group) {
      const decoratedGroup = (a as DescriptorAttributeGroupTypeGroup).group.map(decorateAttribute)
      return { group: decoratedGroup }
    }

    return a
  })
}
