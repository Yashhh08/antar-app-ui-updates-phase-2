module.exports = function (api) {
  api.cache(true);

  // Attempt to resolve optional worklets plugin(s) safely. If not present, omit.
  const optionalPlugins = [];
  const candidates = [
    'react-native-worklets-core/plugin',
    'react-native-worklets/plugin',
  ];
  for (const name of candidates) {
    try {
      // Only push resolved absolute path so Babel won’t try to resolve a missing string.
      optionalPlugins.push(require.resolve(name));
      break; // use the first one that resolves
    } catch (_) {}
  }

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            alias: { '~': './' },
        },
      ],
      ...optionalPlugins,
      // Reanimated plugin must remain last
      'react-native-reanimated/plugin',
    ],
  };
};
