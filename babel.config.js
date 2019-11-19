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
          config: './src/config',
          components: './src/components',
          utils: './src/utils',
          mocks: './src/mocks',
        },
      },
    ],
  ],
};
