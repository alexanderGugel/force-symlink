force-symlink
============

[![Travis](https://img.shields.io/travis/alexanderGugel/force-symlink.svg)](https://travis-ci.org/alexanderGugel/force-symlink)
[![npm](https://img.shields.io/npm/v/force-symlink.svg)](https://www.npmjs.com/package/force-symlink)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Like `fs.symlink`, but friendlier.
Handles *ENOENT*, *EEXIST* and *EPERM* errors.

Usage
-----

Install the package via [npm](https://www.npmjs.org/) (or [ied](https://github.com/alexanderGugel/ied)):

```
npm install force-symlink
```

or:

```
ied install force-symlink
```

Example
-------

Create a symlink to `/etc/hosts`:

```js
import forceSymlink from 'force-symlink'

forceSymlink('/etc/hosts', 'link-to-hosts', function (err) {
  // ...
})
```

```
.
└── link-to-hosts -> /etc/hosts
```

License
-------

Licensed under the MIT license. See [LICENSE](LICENSE.md).
