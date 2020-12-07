export default {
  // Auto-load components/
  components: true,
  /*
   ** Nuxt.js modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss",
  ],
  tailwindcss: {
    // add '~tailwind.config` alias
    exposeConfig: true
  },
  plugins: ["~/plugins/composition-api.js"],
  modules: [ "@nuxtjs/apollo" ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:
          "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
      }
    }
  }
};
