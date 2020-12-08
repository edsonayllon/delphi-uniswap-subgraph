<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead>
      <tr>
        <th
          scope="col"
          class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Name
        </th>
        <th
          scope="col"
          class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Symbol
        </th>
        <th
          scope="col"
          class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Total Liquidity (USD)
        </th>
      </tr>
    </thead>
    <tbody v-if="tokenDayDatas" class="bg-white divide-y divide-gray-200">
      <tr  
        v-for="tokenDayData in tokenDayDatas" 
        :key="tokenDayData.id" 
        @click="setToken(tokenDayData.id)"
        class="hover-style"
      >
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="h-6">{{ tokenDayData.token.name }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="w-3/4 h-6">{{ tokenDayData.token.symbol }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="w-3/4 h-6">$ {{ convertNumberString(tokenDayData.totalLiquidityUSD) }}</div>
        </td>
      </tr >
    </tbody>
    <tbody  class="bg-white divide-y divide-gray-200" v-else >
      <tr class="animate-pulse" v-for="index in 5" :key="index">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="bg-gray-400 h-6"></div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="bg-gray-400 w-3/4 h-6"></div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="bg-gray-400 w-3/4 h-6"></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: "AssetsTable",
  props: {
    date: {
      type: Number,
      required: true
    },
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
    },
    setToken(token) {
      this.$emit('update-token', token.split('-')[0])
      console.log(token.split('-')[0])
    }
  },
  apollo: {
    tokenDayDatas: {
      query: gql`
        query ($date: Int) {
          tokenDayDatas(where:{date: $date}, first: 5, orderBy: dailyVolumeUSD, orderDirection:desc) {
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
        return { date: this.date }
      }
    }
  }
};
</script>

<style lang="postcss" scoped>

.hover-style {
  cursor: pointer;
}

</style>