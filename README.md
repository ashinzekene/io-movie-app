# [Google IO Extended Unilag Codelab](https://ashinzekene.github.io/io-movie-app/)

[Check it out the preview](https://ashinzekene.github.io/io-movie-app/)

## How to set up.

The project has three folders,
- initial - This is the initial state of the app. No PWA capabilities 
- final - This is thefinal state of the app with PWA capabilities
- docs - Live preview 

To start, run `npm run start`, to develop run `npm run dev`. You need [express](https://expressjs.com) and [nodemon](https://www.npmjs.com/package/nodemon).

To change the current folder being served, edit the `server.js` file like so:

```js
var app,
  server,
  express = require('express'),
  path = require('path'),
  port = process.env.PORT || 5000,
  root = path.resolve(__dirname, 'src'); // Change this to the folder you want to serve
...
```
## Building a FIRE PWA

- Fast
- Integrated
- Reliable
- Engaging

## Things to consider

### - Service worker

### - Manifest.json

### - Meta Theme Color

```html
<link name="theme-color" content="#989489"/>
```

### - Resource Prioritization

- prefetch: informing the browser of a resource that is expected to be needed as part of a future navigation or user interaction, for example, something that might be needed later,

```html
<link rel="prefetch" href="page-2.html">
```

- preconnect

```html
<link rel="preconnect" href="image.tmdb.org">
```

- preload: very important resources

```html
<link rel="preload" as="font" crossorigin="crossorigin" type="font/woff2" href="myfont.woff2">
```

### - Intersection observer:

Fetch images only when they are in view

```js
const observer = new IntersectionObserver();
```

## Feel free to contribute