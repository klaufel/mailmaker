'use strict'

var gutil = require('gulp-util')
var through2 = require('through2')
var path = require('path')
var _merge = require('lodash.merge')

function getPug(defaultOptions) {
	return (defaultOptions || { }).pug || require('pug')
}

function makeVinylOptions(vFile, defaultOptions) {
	var prod = process.env.NODE_ENV == 'production'
	return _merge({ compileDebug: !prod, pretty: !prod }, vFile, defaultOptions, { filename: vFile.path })
}

function renameVinylExt(vFile, newExt) {
	var filePath = path.parse(vFile.path)
	vFile.path = path.join(filePath.dir, filePath.name + newExt)
}

//
// Pre-render vinyl-files
//
function _pug(defaultOptions) {
	return through2.obj(function (file, enc, done) {
		if (!file.isBuffer())
			return done(new gutil.PluginError({ plugin: 'gulp-pugjs', message: 'This plugin only supports bufferred Vinyl files (null/stream content not supported).' }))

		try {
			var rendered = getPug(defaultOptions)
				.render(file.contents.toString(), makeVinylOptions(file, defaultOptions))
			file.contents = new Buffer(rendered)
			renameVinylExt(file, '.html')
			done(null, file)
		} catch (e) {
			this.emit('error', e)
		}
	})
}

//
// Pre-compile vinyl-files
//
_pug.compile = function(defaultOptions) {
	return through2.obj(function (file, enc, done) {
		if (!file.isBuffer())
			return done(new gutil.PluginError({ plugin: 'gulp-pugjs', message: 'This plugin only supports bufferred Vinyl files (null/stream content not supported).' }))

		try {
			var compiled = getPug(defaultOptions)
				.compileClient(file.contents, makeVinylOptions(file, defaultOptions)).toString()
			file.contents = new Buffer(compiled + '\nmodule.exports = template;')
			renameVinylExt(file, '.js')
			done(null, file)
		} catch (e) {
			this.emit('error', e)
		}
	})
}

module.exports = _pug
