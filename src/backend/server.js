const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const pug = require('pug')

// constants
const devMode = process.env.NODE_ENV === 'development'
const indexTemplate = pug.compileFile(path.resolve(__dirname, './index.pug'))

// path for the JavaScript bundle
var bundlePath = '/assets/js/'

// get the name of hashed JavaScript bundle
fs.readdir(path.resolve(__dirname, '../../dist'), (err, files) => {
  // there should only be one file
  bundlePath += files[0]
})

/**
 * routes
 */
app.get('/assets/js/:filename', (req, res) => {
  res.sendFile(path.resolve(__dirname, `../../dist/${req.params.filename}`))
})

app.get('/', (req, res) => {
  res.send(indexTemplate({
    scriptPath: devMode ? 'http://localhost:2992/assets/bundle.js' : bundlePath
  }))
})

app.listen(process.env.PORT || 9000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 9000}!`)
})
