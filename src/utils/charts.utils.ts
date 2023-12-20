import { formatThousands, toFormattedLongDate } from "./formatters.utils"
import * as ECharts from 'echarts'

interface ChartItem {
  value: number;
  color: string;
  seriesName: string;
}
export function tooltipLinearChart(data: any, type: "TOTAL" | "GENERAL") {

  const formattedDate = toFormattedLongDate(data[0].axisValueLabel)
  let tooltip = `<div style="display:flex; padding-bottom:15px;">
                  <strong>${formattedDate}</strong>            
                </div>`
  data.map((item: any) => {
    tooltip += formatTooltipItem(item, type);
  })

  return tooltip
}


function formatTooltipItem(item: ChartItem, type: "TOTAL" | "GENERAL"): string {
  const label =
    type === "TOTAL" ? `${item.value ? formatThousands(item.value) : 0} ` : `${(item.value || 0).toFixed(2)}%`;

  return `<div style="display:flex; justify-content: space-between;">
            <div style="display: flex; align-items: center; flex-shrink: 0;">
               <div style="margin-right: 5px; width: 10px; height: 10px; background: ${item.color}; border-radius: 100%"></div>
                ${item.seriesName}
            </div>
            <span style="margin-left: 16px">
              ${label} 
            </span>
          </div>`;
}

export function optionLineChart(fontFamily: string | (string & {}) | undefined, data: string[], seriesData: any, mediaQuerySm?: any, grid?: any, yAxis?: any): ECharts.EChartsOption {
  return {
    textStyle: {
      fontFamily,
    },
    tooltip: {
      trigger: 'axis',
      formatter: (data: any) => {
        return tooltipLinearChart(data, 'TOTAL')
      },
    },
    legend: {
      padding: 0,
      left: 0,
      bottom: 0,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 8,
      itemStyle: {
        borderWidth: 0,
      },
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
    grid: grid ? grid : {
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
    yAxis: yAxis ? yAxis : {},
    series: seriesData.sort((one: any, two: any) => (one.name > two.name ? 1 : -1)),
  }
}