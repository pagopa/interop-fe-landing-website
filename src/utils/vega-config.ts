import { VisualizationSpec } from 'react-vega'

export const getVegaConfigSpec = (withBackground: boolean): VisualizationSpec => ({
  height: 310,
  width: 'container',
  config: {
    locale: {
      time: {
        dateTime: '%A, %e. %B %Y, %X',
        date: '%d/%m/%Y',
        time: '%H:%M:%S',
        periods: ['AM', 'PM'],
        days: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
        shortDays: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
        months: [
          'Gennaio',
          'Febbraio',
          'Marzo',
          'Aprile',
          'Maggio',
          'Giugno',
          'Luglio',
          'Agosto',
          'Settembre',
          'Ottobre',
          'Novembre',
          'Dicembre',
        ],
        shortMonths: [
          'Gen',
          'Feb',
          'Mar',
          'Apr',
          'Mag',
          'Giu',
          'Lug',
          'Ago',
          'Set',
          'Ott',
          'Nov',
          'Dic',
        ],
      },
      number: {
        decimal: ',',
        thousands: '.',
        grouping: [3],
        currency: ['€', ''],
      },
    },
    axis: {
      gridColor: withBackground ? '#000' : '#5C6F82',
      ticks: false,
      labelPadding: 20,
      labelSeparation: 15,
      labelColor: withBackground ? '#000' : '#5C6F82',
      title: null,
    },
    font: 'Titillium Web, Helvetica, arial, sans-serif ',
    background: 'transparent',
  },
  mark: {
    font: 'Titillium Web, Helvetica, arial, sans-serif',
    type: 'line',
    color: '#0073E6',
    point: {
      filled: true,
      color: '#0073E6',
    },
    interpolate: 'monotone',
  },
  encoding: {
    x: {
      field: 'time',
      type: 'ordinal',
      //@ts-ignore
      timeUnit: 'monthdateyear',
      axis: { format: '%d %b ‘%y' },
    },
    y: { field: 'value', type: 'quantitative' },
  },
  data: { name: 'table' },
})
