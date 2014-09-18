# avail [![Build Status](http://img.shields.io/travis/srn/avail.svg?style=flat-square)](https://travis-ci.org/srn/avail)

> Check if a domain is available

Using the [domainr](https://domai.nr/) API.

## Install

```sh
$ npm install avail --save
```

## Usage

```js
var avail = require('avail');

avail(function (domains) {
  domains.forEach(function(domain){
    console.log(domain);
  });

  => avail.io ✖
  => avai.li/o ✔︎
  => avail.io.eu ✔︎
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

    avail.io ✔︎
    avail.com ✖
```


## License

MIT © [Søren Brokær](http://srn.io)
