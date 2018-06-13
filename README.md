# Google IO Extended Unilag Codelab

## Building a FIRE PWA

- Fast
- Integrated
- Reliable
- Engaging

## Things to consider

### - Service worker

### - Manifest.json

### - Meta theme-name

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
