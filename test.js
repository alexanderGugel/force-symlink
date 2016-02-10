'use strict'

var forceSymlink = require('./')
var test = require('tape')
var fs = require('fs')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')
var path = require('path')

var sandbox = path.join(__dirname, 'sandbox')

function setup (t) {
  t.test('setup', function (t) {
    mkdirp(path.join(sandbox), function (err) {
      t.end(err)
    })
  })
}

function cleanup (t) {
  t.test('cleanup', function (t) {
    rimraf(path.join(sandbox), function (err) {
      t.end(err)
    })
  })
}

function verify (t) {
  t.test('verify', function (t) {
    fs.readlink(path.join(sandbox, 'some-link'), function (err, linkString) {
      t.equal(linkString, '../some-file', 'should have created a symlink to "../some-file"')
      t.end(err)
    })
  })
}

test('when symlink doesn\'t exist', function (t) {
  cleanup(t)
  setup(t)

  t.test('it should create the symlink', function (t) {
    forceSymlink('../some-file', path.join(sandbox, 'some-link'), function (err) {
      t.end(err)
    })
  })

  verify(t)
  cleanup(t)
})

test('when symlink already exists', function (t) {
  cleanup(t)
  setup(t)

  t.test('setup incorrect symlink', function (t) {
    fs.symlink('../some-other-file', path.join(sandbox, 'some-link'), function (err) {
      t.end(err)
    })
  })

  t.test('it should unlink and create a new symlink', function (t) {
    forceSymlink('../some-file', path.join(sandbox, 'some-link'), function (err) {
      t.end(err)
    })
  })

  verify(t)
  cleanup(t)
})

test('when containing directory doesn\'t exist', function (t) {
  cleanup(t)

  t.test('mkdirp the directory and create a new symlink', function (t) {
    forceSymlink('../some-file', path.join(sandbox, 'some-link'), function (err) {
      t.end(err)
    })
  })

  verify(t)
  cleanup(t)
})

test('when type is given', function (t) {
  cleanup(t)
  setup(t)

  t.test('it should invoke the callback', function (t) {
    forceSymlink('../some-file', path.join(sandbox, 'some-link'), 'dir', function (err) {
      t.end(err)
    })
  })

  verify(t)
  cleanup(t)
})
