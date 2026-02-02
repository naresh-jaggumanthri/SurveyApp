module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // ✅ 1. Decorators FIRST
    ['@babel/plugin-proposal-decorators', { legacy: true }],

    // ✅ 2. Class properties SECOND
    ['@babel/plugin-proposal-class-properties', { loose: true }],

    // ✅ 3. Reanimated plugin MUST be LAST
    'react-native-reanimated/plugin',
  ],
};
