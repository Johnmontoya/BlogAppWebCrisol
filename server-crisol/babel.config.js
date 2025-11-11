export default {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      },
      modules: false // Importante: mantener ES modules
    }]
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: 'current'
          }
        }]
      ]
    }
  }
};