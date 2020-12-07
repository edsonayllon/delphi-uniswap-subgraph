<template>
  <div class="container mx-auto">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          Dashboard
        </h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p class="leading-relaxed my-8 text-lg font-light">
          Your mission, should you choose to accept it is to use
          <a
            class="text-blue-400 hover:text-blue-800"
            href="https://thegraph.com/"
            >The Graph</a
          >'s
          <a
            class="text-blue-400 hover:text-blue-800"
            href="https://thegraph.com/explorer/subgraph/uniswap/uniswap-v2"
            >Uniswap V2 Subgraph</a
          >
          to find historical <code>totalLiquidityUSD</code> for the top 5 tokens
          by trade volume, display this information in a digestible way (e.g:
          table and graph), and help us see how you approach a problem.
        </p>
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <Graph :token="token" />
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <AssetsTable :date="latestHour"/>
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
    <NuxtLink to="config">
      <TButton>Tailwind Config</TButton>
    </NuxtLink>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: "index",
  data () {
    return {
      latestHour: new Date(new Date().setHours(19, 0, 0, 0)) > new Date() 
        ? (new Date().setHours(19, 0, 0, 0) / 1000) - 86400
        : new Date().setHours(19, 0, 0, 0) / 1000,
      token: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
    }
  },
  computed: {
    hoursForDay() {
      return Array.from({ length: 24 }, (v, i) => this.latestHour - i * 86400)
    }
  },
  methods: {
    convertNumberString(value) {
      return Math.abs(Number(value)) >= 1.0e+9
      ? `${(Math.abs(Number(value)) / 1.0e+9).toFixed(2)} B`
      // Millions 
      : Math.abs(Number(value)) >= 1.0e+6
      ? `${(Math.abs(Number(value)) / 1.0e+6).toFixed(2)} M`
      // Thousands
      : Math.abs(Number(value)) >= 1.0e+3
      ? `${(Math.abs(Number(value)) / 1.0e+3).toFixed(2)} K`
      : Math.abs(Number(value));
    }
  },
  apollo: {
    tokenDayDatas: {
      query: gql`
        query ($date: Int) {
          tokenDayDatas(where:{date: $date}, first: 5, orderBy: totalLiquidityUSD, orderDirection:desc) {
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
        return { date: this.latestHour }
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>