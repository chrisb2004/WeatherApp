const { defineConfig } = require('cypress')

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // no webpack needed
    },
  },
})