module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          screens: './src/screens',
          store: './src/store',
          modules: './src/modules',
          api: './src/api',
          constants: './src/constants',
          config: './src/config',
          components: './src/components',
          mocks: './src/mocks',
        },
      },
    ],
  ],
};
