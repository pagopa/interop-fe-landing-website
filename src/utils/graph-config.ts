import { VisualizationSpec } from 'react-vega'

export const getGraphConfigSpec = (withBackground: boolean): VisualizationSpec => ({
  height: 310,
  width: 'container',
  config: {
    axis: {
      gridColor: withBackground ? '#000' : '#5C6F82',
      ticks: false,
      labelPadding: 20,
      labelColor: withBackground ? '#000' : '#5C6F82',
      title: null,
    },
    font: 'Titillium Web',
    background: 'transparent',
  },
  mark: {
    font: 'Titillium Web',
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
      timeUnit: 'yearmonth',
      axis: { format: '%b ‘%y' },
    },
    y: { field: 'value', type: 'quantitative' },
  },
  data: { name: 'table' },
})
