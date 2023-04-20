## Overview

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

## Branches

There are 2 special branches that you may want to check out:

- single-page-application. Contains webpack configuration for a Single Page Application.
- multiple-page-application. Contains webpack configuration for a Multiple Page Application.

#### Please don't use the master branch

There are separate git branches in this repository related to each Lesson. They are usually named the same as the Lessons are named. For example, if you are watching Lesson 33 "How To Generate Multiple HTML Files", there are 2 branches related to this lesson:

- how-to-generate-multiple-html-files-begin
- how-to-generate-multiple-html-files-end

There is a separate video explaining how to use Github repository in this course.
In this video I talk about how to switch between branches and how to use the repository.

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
