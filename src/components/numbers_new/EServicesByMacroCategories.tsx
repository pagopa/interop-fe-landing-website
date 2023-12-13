import React from 'react'
import { Link, Stack, Typography, useTheme } from '@mui/material'
import { ChartAndTableTabs, TableData } from '@/components/numbers/ChartAndTableTabs'
import { formatThousands } from '@/utils/formatters.utils'
import { pack, hierarchy } from 'd3-hierarchy'
import GovItLink from './GovItLink'
import { EServicesByMacroCategoriesMetric } from '@/models/numbers_new.models'
import * as echarts from 'echarts'
import sortBy from 'lodash/sortBy'
import { MACROCATEGORIES_COLORS, MACROCATEGORIES_LINK_HREF } from '@/configs/constants.config'

const PACK_SIZE = 340

const EServicesByMacroCategories = ({ data }: { data: EServicesByMacroCategoriesMetric }) => {
  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary

  const filteredData = data.filter((d) => d.count > 0)

  const tableData: TableData = React.useMemo(() => {
    const head = ["Categoria d'ente", 'E-service pubblicati']
    const sortedData = [...sortBy(filteredData, 'count')].reverse()
    const body = sortedData.map(({ name, count }) => [name, formatThousands(count).toString()])
    return { head, body }
  }, [filteredData])

  type EchartsDatum = [string, string, number, number, number, number]

  const bubbles: Array<EchartsDatum> = React.useMemo(() => {
    const packing = pack<{ children: EServicesByMacroCategoriesMetric }>().size([
      PACK_SIZE - 60,
      PACK_SIZE - 60,
    ])
    const children = hierarchy({ children: filteredData })
    const computed = packing(
      children.sum((d) => (d as unknown as EServicesByMacroCategoriesMetric[number]).count)
    )
    const leaves = computed.leaves()

    return leaves.map((l) => {
      const { x, y, r, value, data } = l
      const { name, id } = data as unknown as EServicesByMacroCategoriesMetric[number]
      return [name, id, x, y, r, value as number]
    })
  }, [filteredData])

  const chartOptions: echarts.EChartsOption = {
    textStyle: {
      fontFamily: fontFamily,
    },
    grid: {
      top: 0,
    },
    legend: {
      icon: 'circle',
      show: true,
      data: bubbles.map((d) => ({
        name: d[0]?.toString() as string,
        itemStyle: {
          color: MACROCATEGORIES_COLORS[Number(d[1]) as keyof typeof MACROCATEGORIES_COLORS],
        },
      })),
      padding: 0,
      left: 0,
      bottom: 0,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 24,
      itemStyle: {
        borderWidth: 0,
      },
    },
    tooltip: {
      padding: 0,
      borderRadius: 0,
      borderWidth: 0,
      borderColor: 'transparent',
      shadowColor: 'transparent',
      backgroundColor: 'transparent',
      formatter: (n) => {
        const item = n as unknown as { data: EchartsDatum }
        const macroCategoryName = item.data[0]
        const color =
          MACROCATEGORIES_COLORS[Number(item.data[1]) as keyof typeof MACROCATEGORIES_COLORS]
        const count = (n as unknown as { data: EchartsDatum }).data[5]
        return `<div style="box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px; background: white; border: 1px solid ${color}; padding: 10px; border-radius: 8px;">
          <p style="margin: 0;">${macroCategoryName}</p>
          <p style="margin: 0; display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
            <span style="display: inline-block; background-color: ${color}; width: 10px; height: 10px; border-radius: 100%;"></span>
            <strong>${formatThousands(count)} e-service</strong>
          </p>
        </div>`
      },
    },
    series: [
      ...bubbles.map<echarts.CustomSeriesOption>((d) => {
        return {
          coordinateSystem: 'none',
          type: 'custom',
          name: d[0],

          renderItem: (_, api) => {
            const width = api.getWidth()
            const id = api.value(1) as keyof typeof MACROCATEGORIES_COLORS
            const fill = MACROCATEGORIES_COLORS[id]
            const xPos = api.value(2) as number
            const cy = api.value(3) as number
            const r = api.value(4) as number
            const value = api.value(5) as number
            // Center the chart items
            const cx = xPos + width / 2 - PACK_SIZE / 2

            return {
              type: 'circle',
              shape: { cx, cy, r },
              style: {
                fill,
                color: fill,
                borderColor: fill,
                textPosition: 'inside',
                textFill: textColorPrimary,
                text: formatThousands(value),
              },
            }
          },
          dimensions: ['name, x, y, r, value'],
          data: [d],
        }
      }),
    ],
  }

  return (
    <React.Fragment>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={PACK_SIZE}
        info={Info}
        childrenPosition="bottom"
      >
        <Stack direction="column" sx={{ mt: 3 }}>
          <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 600 }}>
            Dimensione = n° di e-service
          </Typography>
          <LegendSVG />
        </Stack>
      </ChartAndTableTabs>

      <Stack direction="row" justifyContent="space-between">
        <GovItLink />
      </Stack>
    </React.Fragment>
  )
}

const Info = (
  <React.Fragment>
    <Typography color="text.secondary">
      Il totale per categoria è calcolato aggregando il numero di e-service unici pubblicati e
      attivi.
    </Typography>
    <Typography color="text.secondary">
      Le categorie sono riportate nel{' '}
      <Link underline="hover" href={MACROCATEGORIES_LINK_HREF} target="_blank">
        file
      </Link>
      .
    </Typography>
  </React.Fragment>
)

const LegendSVG = () => {
  return (
    <svg width="98" height="49" viewBox="0 0 98 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24.3198" r="23.5" stroke="#D9D9D9" />
      <circle cx="24.5" cy="40.8198" r="7" stroke="#D9D9D9" />
      <path
        d="M53.446 38.0798V47.3198H52.368V39.2838L49.988 40.8518L49.498 40.0398L52.438 38.0798H53.446Z"
        fill="#17324D"
      />
      <path
        d="M53.446 5.07982V14.3198H52.368V6.28382L49.988 7.85182L49.498 7.03982L52.438 5.07982H53.446ZM59.74 4.92582C60.5053 4.92582 61.126 5.07049 61.602 5.35982C62.61 5.95716 63.114 7.45049 63.114 9.83982C63.114 11.5292 62.834 12.7238 62.274 13.4238C61.714 14.1145 60.874 14.4598 59.754 14.4598C58.634 14.4598 57.7893 14.1192 57.22 13.4378C56.66 12.7472 56.38 11.5245 56.38 9.76982C56.38 8.00582 56.6553 6.75982 57.206 6.03182C57.766 5.29449 58.6107 4.92582 59.74 4.92582ZM59.754 5.89182C59.222 5.89182 58.802 6.00382 58.494 6.22782C57.8313 6.68516 57.5 7.89382 57.5 9.85382C57.5 11.2352 57.682 12.1918 58.046 12.7238C58.41 13.2465 58.9793 13.5078 59.754 13.5078C60.5287 13.5078 61.098 13.2418 61.462 12.7098C61.826 12.1778 62.008 11.1932 62.008 9.75582C62.008 8.30916 61.8307 7.30582 61.476 6.74582C61.1307 6.17649 60.5567 5.89182 59.754 5.89182ZM67.574 4.92582C68.3393 4.92582 68.96 5.07049 69.436 5.35982C70.444 5.95716 70.948 7.45049 70.948 9.83982C70.948 11.5292 70.668 12.7238 70.108 13.4238C69.548 14.1145 68.708 14.4598 67.588 14.4598C66.468 14.4598 65.6233 14.1192 65.054 13.4378C64.494 12.7472 64.214 11.5245 64.214 9.76982C64.214 8.00582 64.4893 6.75982 65.04 6.03182C65.6 5.29449 66.4446 4.92582 67.574 4.92582ZM67.588 5.89182C67.056 5.89182 66.636 6.00382 66.328 6.22782C65.6653 6.68516 65.334 7.89382 65.334 9.85382C65.334 11.2352 65.516 12.1918 65.88 12.7238C66.244 13.2465 66.8133 13.5078 67.588 13.5078C68.3626 13.5078 68.932 13.2418 69.296 12.7098C69.66 12.1778 69.842 11.1932 69.842 9.75582C69.842 8.30916 69.6646 7.30582 69.31 6.74582C68.9646 6.17649 68.3906 5.89182 67.588 5.89182Z"
        fill="#17324D"
      />
    </svg>
  )
}

export default EServicesByMacroCategories
