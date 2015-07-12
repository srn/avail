# avail [![Build Status][travis-badge]](https://travis-ci.org/srn/avail) [![Dependency Status][gemnasium-badge]](https://gemnasium.com/srn/avail)
> Check if a domain is available

Using the [Domainr](https://domainr.com/) API.

## Install

```sh
$ npm install avail --save
```

## Usage

```js
var avail = require('avail');

avail('example.com', function (err, domains) {
  if (err) return;
  
  console.log(domains);

  => [ { domain: 'avail.io', availability: 'unavailable' }, { domain: 'avai.li/o', availability: 'available' } ...
});
```

## CLI

```sh
$ npm install --global avail
```

```sh
$ avail --help

  Example
    avail avail.io

    ✔ avail.io︎
    ✖ avail.com
```


## License

MIT © [Søren Brokær](http://srn.io)

[travis-badge]: http://img.shields.io/travis/srn/avail.svg?style=flat-square
[gemnasium-badge]: http://img.shields.io/gemnasium/srn/avail.svg?style=flat-square
