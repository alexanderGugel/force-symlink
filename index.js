'use strict'

var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')

function handleEEXIST (srcPath, dstPath, type, cb) {
  fs.readlink(dstPath, function (err, linkString) {
    if (err || srcPath === linkString) return cb(err)

    fs.unlink(dstPath, function (err) {
      if (err) return cb(err)
      forceSymlink(srcPath, dstPath, type, cb)
    })
  })
}

function handleENOENT (srcPath, dstPath, type, cb) {
  mkdirp(path.dirname(dstPath), function (err) {
    if (err) return cb(err)
    forceSymlink(srcPath, dstPath, type, cb)
  })
}

function forceSymlink (srcPath, dstPath, type, cb) {
  type = typeof type === 'string' ? type : null

  cb = cb || arguments[2]

  fs.symlink(srcPath, dstPath, type, function (err) {
    if (err && err.code === 'ENOENT') {
      handleENOENT(srcPath, dstPath, type, cb)
      return
    }

    if (err && err.code === 'EEXIST') {
      handleEEXIST(srcPath, dstPath, type, cb)
      return
    }

    if (cb) cb(err)
  })
}

module.exports = forceSymlink
