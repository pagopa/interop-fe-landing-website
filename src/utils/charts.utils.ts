import { formatThousands, toFormattedLongDate } from './formatters.utils'
import * as ECharts from 'echarts'

interface ChartItem {
  value: number
  color: string
  seriesName: string
}
export function tooltipLinearChart(data: any, type: 'TOTAL' | 'GENERAL') {

  const formattedDate = toFormattedLongDate(data[0].axisValueLabel)
  let tooltip = `<div style="display:flex; padding-bottom:15px;">
                  <strong>${formattedDate}</strong>            
                </div>`
  data.map((item: any) => {
    tooltip += formatTooltipItem(item, type)
  })

  return tooltip
}

function formatTooltipItem(item: ChartItem, type: 'TOTAL' | 'GENERAL'): string {
  const label =
    type === 'TOTAL'
      ? `${item.value ? formatThousands(item.value) : 0} enti totali`
      : `${(item.value || 0).toFixed(2)}%`

  return `<div style="display:flex; justify-content: start;">
  <div style="display:flex;  margin-right:5px;  display: flex; align-items: center;justify-content: center;">
    <div style=" width: 10px;height: 10px;background: ${item.color}; border-radius:10px;"></div>
    </div>
    <div>
      <span>
        ${label}
      </span>
    </div>
  </div>`
}

export function optionLineChart(
  fontFamily: string | (string & object) | undefined,
  data: string[],
  seriesData: any,
  mediaQuerySm?: number,
  grid?: ECharts.GridComponentOption,
  yAxis?: unknown
): ECharts.EChartsOption {
  return {
    textStyle: {
      fontFamily,
    },
    tooltip: {
      trigger: 'axis',
      formatter: (data: ECharts.TooltipComponentFormatterCallbackParams) => {
        return tooltipLinearChart(data, 'TOTAL')
      },
    },
    legend: {
      show: true,
      bottom: 0,
      left: 'left',
      selectedMode: false,
      // itemWidth: 12,
      // itemHeight: 12,
      // itemGap: 8,
      // itemStyle: {
      //   borderWidth: 0,
      // },
    },
    media: [
      {
        query: {
          minWidth: mediaQuerySm,
        },
        option: {
          grid: {
            bottom: 100,
          },
        },
      },
    ],
    grid: grid
      ? grid
      : {
          left: 10,
          right: 30,
          bottom: 60,
          containLabel: true,
        },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data,
    },
    yAxis: yAxis ? yAxis : { type: 'value' },
    series: seriesData.sort((one: any, two: any) => (one.name > two.name ? 1 : -1)),
  }
}
