const path = require('path');

const withSass = require('@zeit/next-sass');
const getTsAliases = (tsconfigPath = './tsconfig.json') => {
  const { paths } = require(tsconfigPath).compilerOptions;
  
  return Object.keys(paths).reduce((acc, key) => {
    const name = key.replace("/*", "");
    const aliasPath = paths[key][0].replace("/*", "");
    
    return {
      ...acc,
      [name]: path.join(__dirname, aliasPath)
    };
  }, {});
};


module.exports = withSass({
  webpack: (config) => {
    
    // add graphql
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    
    // resolve aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      ...getTsAliases()
    };
    return config;
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
});
