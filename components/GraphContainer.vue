<template>
    <div class="px-4 py-6 sm:px-0">
        <div v-if="tokenDayDatas" > 
          <div class="flex justify-center items-center border-4 rounded-lg w-full p-6">
            <line-chart class="margin100" :chart-data="fillGraph" :options="{
              responsive: true,
              maintainAspectRatio: false
            }"></line-chart>
          </div>
        </div>
        <div v-else
            class="flex justify-center items-center border-4 border-dashed border-gray-200 rounded-lg h-40 w-full p-6"
        >
            <span class="text-xl text-gray-500 uppercase">Graph</span>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import LineChart from './LineChart';
import { format, compareAsc } from 'date-fns'

export default {
  name: "GraphContainer",
  components: {
    LineChart
  },
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        fill: false
      }
    }
  },
  computed: {
    fillGraph() {
      return {
        labels: this.getLabels,
        datasets: [
          {
            label: `${this.tokenDayDatas[0].token.name} Liquidity in Million USD`,
            borderColor: '#4299e1',
            data: this.getDataPoints
          }
        ]
      }
    },
    getDataPoints() {
      return this.tokenDayDatas.map((asset) => this.convertNumberMillion(asset.totalLiquidityUSD)).reverse()
    },
    getLabels() {
      return this.tokenDayDatas.map((asset) => format(new Date(asset.date*1000), 'MMM-dd-yyyy')).reverse()
    }
  },
  methods: {
    getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    convertNumberMillion(value) {
      return (Math.abs(Number(value)) / 1.0e+6).toFixed(4)
    },
  },
  apollo: {
    tokenDayDatas: {
      query: gql`
        query ($token: String) {
            tokenDayDatas(where:{ token_starts_with: $token }first: 30, orderBy: date, orderDirection:desc) {
                id,
                date,
                token {
                name
                symbol
                }
                totalLiquidityUSD
            }
        }
      `,
      variables () {
        return { token: this.token }
      }
    }
  }
}
</script>

<style scoped>
.token-title {
  font-size: 24px;
}

.margin100 {
  width: 100%
}
</style>