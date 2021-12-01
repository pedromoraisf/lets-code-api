module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '15'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    [
      'module-resolver',
      {
        alias: {
          '@src': './src',
          '@tests': './tests'
        }
      }
    ],
    ['add-module-exports']
  ],
  ignore: ['**/*.spec.ts', '**/*.test.ts']
}
