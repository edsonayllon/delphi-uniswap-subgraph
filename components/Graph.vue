<template>
    <div class="px-4 py-6 sm:px-0">
        <div
            class="flex justify-center items-center border-4 border-dashed border-gray-200 rounded-lg h-40 w-full p-6"
        >
            <span class="text-xl text-gray-500 uppercase">Graph</span>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: "Graph",
    props: {
    token: {
      type: String,
      required: true,
      default: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
    },
  },
  methods: {
    
  },
  apollo: {
    tokenDayDatas: {
      query: gql`
        query ($token: String) {
            tokenDayDatas(where:{ token_starts_with: $token }first: 7, orderBy: date, orderDirection:desc) {
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

</style>