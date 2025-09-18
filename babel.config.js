module.exports = function (api) {
  api.cache(true);

  let workletsPlugin = null;
  try {
    workletsPlugin = require.resolve('react-native-worklets-core/plugin');
  } catch {}
  if (!workletsPlugin) {
    try {
      workletsPlugin = require.resolve('react-native-worklets/plugin');
    } catch {}
  }

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      // Prefer -core, fallback to legacy package if present
      ...(workletsPlugin ? [workletsPlugin] : []),
      'react-native-reanimated/plugin',
    ],
  };
};
