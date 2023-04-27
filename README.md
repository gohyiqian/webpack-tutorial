## Overview

At its core, webpack is a `static module bundler` for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph from one or more entry points and then combines every module your project needs into one or more bundles, which are static assets to serve your content from.

- To run webpack: `npx webpack`. This will generate a `main.js` file under `dist` folder.
- To se more options: `npx webpack --stats detailed`

## Asset Modules Type

Refers to various kinds of images, fonts or plain text files.

1. `asset/resource` - will duplicate the asset or image into `dist` folder and reference as path directory
2. `asset/inline` - asset in line module, asset or image is injected into JS bundle as the data URI (base 64) and inject it directly into the main JS bundle
3. `asset` - webpack will decide if the asset is a `asset/resource`(if asset size > 8kB) or `asset/inline` (if asset size < 8kB) based on image size, can be configured.
4. `asset/source` - import a text file into image src

We can modify the size:

```js
module: {
  rules: [
    {
      test: /\.(png|jpg)$/,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 3 * 1024, // 3 kilobytes
        },
      },
    },
    {
      test: /\.txt/,
      type: 'asset/source',
    },
  ],
},
```

## Webpack Loaders

- Out of the box, webpack `only understands JavaScript and JSON files`.
- Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.

```js
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.scss$/,
    //webpack will read the loader from right to left
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
```

## Babel

- javascript compiler

```js
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  },
```

## Extrace CSS into a separate Bundle using `mini-css-extract-plugin`

After `npm run build `, we will see `style.css` being created and we need to reference this in our html `<link rel="stylesheet" href="./dist/styles.css" />`

```js
plugins: [
  new MiniCssExtractPlugin({
    filename: 'styles.css',
  }),
],
```

## Browser Caching

- `browser location`: if the file didnt change between page reloads, your browser can save it as `cache`, so it does not need to download again
- however, we need a mechanism to update the cache if not browser will keep fetching the outdate cache
- we can use add a `MD5 hash` to the filename example `bundle.[contenthash].js` or `styles.[contenthash].css`

```js
output: {
  filename: 'bundle.[contenthash].js',
  path: path.resolve(__dirname, './dist'),
  publicPath: 'dist/',
},
```

## Bundle Maintenance

- new bundles are created everytime the code gets updated and build
- we can use a webpack plugin to maintain it

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*'),
      ],
    }),
  ],
};
```

- Alternatively we can use default `clean` method
- if we set `dry:true`, webpack will inform you which files it is going to remove instead of actually removing them
- `keep` tells webpack which file to keep

```js
  output: {
    filename: 'bundle.[contenthash]js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/',
    clean: {
      dry: true,
      keep: /\.css/
    },
  },
```

## Auto-generate HTML files with the hash

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*'),
      ],
    }),
  ],
};
```

## Template Engine Option

- create own template for generating HTML files
- There are plenty of template engines such as `ejs`, `handlebars` etc
- using `handlebars`

```js
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
```

## Production vs Development mode

- differentiate prod and dev config
- add a devServer from `webpack-dev-server`
- change script command in package.json
- `hot` in dev enables hot module replacement, a great feature supported out of the box

```json
    "build": "webpack --config webpack.production.config.js",
    "dev": "webpack serve --config webpack.dev.config.js --hot"
```

```js
module.exports = {
  mode: 'development',
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true,
    },
  },
};
```

## Code-splitting for Production

- splitting into more bundles
- update the entry in the webpack config
- and also the filename, use [name] so it will take the entry point as the name

```js
module.exports = {
  entry: {
    'hello-world': './src/hello-world.js',
    kiwi: './src/kiwi.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
  },
};
```

## Single Page Application

#### Run in Development Mode

1. `git checkout single-page-application`
1. `npm run dev`

Application will be served on the `http://localhost:9000/`.

#### Run in Production Mode

1. `git checkout single-page-application`
1. `npm run build`
1. `npm start`

Application will be served on the `http://localhost:3000/`.

## Multiple Page Application

#### Run in Development Mode

1. `git checkout multiple-page-application`
1. `npm run dev`

Application will be served on the `http://localhost:9000/`.
It will show an empty page.

In order to go to the "Hello World" page, go to `http://localhost:9000/hello-world.html`.

In order to go to the "Kiwi" page, go to `http://localhost:9000/kiwi.html`.

#### Run in Production Mode

1. `git checkout multiple-page-application`
1. `npm run build`
1. `npm start`

Application will be served on the `http://localhost:3000/`.
It will show an empty page.

In order to go to the "Hello World" page, go to `http://localhost:3000/hello-world`.

In order to go to the "Kiwi" page, go to `http://localhost:3000/kiwi`.
