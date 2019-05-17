const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {shouldUseRelativeAssetPaths, shouldUseSourceMap} = require('./production-variables');

const productionCssExtractor =  {
  loader: MiniCssExtractPlugin.loader,
  options: Object.assign(
    {},
    shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
  ),
};

const devStyleLoader = require.resolve('style-loader');


const getStyleLoaders = (cssOptions, preProcessor, dev = false) => {
  const loaders = [
    dev ? devStyleLoader: productionCssExtractor,
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
        ...(dev ? {}: {sourceMap: shouldUseSourceMap})
      },
    },
  ];
  if (preProcessor) {
    loaders.push({ ... preProcessor, options: {
        ...preProcessor.options, ...(dev ? {}: {sourceMap: shouldUseSourceMap})
      }
    });
  }
  return loaders;
};

module.exports = getStyleLoaders;
