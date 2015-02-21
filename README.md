# Mozaïk time widgets

[![Travis CI](https://img.shields.io/travis/plouc/mozaik-ext-time.svg?style=flat-square)](https://travis-ci.org/plouc/mozaik-ext-time)

## Time — Clock

> Not really useful, but every dashboard composition tool must have one :)

![clock](https://raw.githubusercontent.com/plouc/mozaik-ext-time/master/preview/time.clock.png)

### parameters

- **timezone**: Name of the timezone, like `America/Los_Angeles`.
  Find all the values from http://momentjs.com/timezone/
  Optional, defaults to local time.

### usage

```javascript
{
  type: 'time.clock',
  columns: 1, rows: 1, x: 0, y: 0
}
```