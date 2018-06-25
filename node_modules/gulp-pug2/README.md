gulp-pug2
=========

> Pre-render or pre-compile Pug templates using Gulp.

[![Travis CI](https://travis-ci.org/jrop/gulp-pug2.svg)](https://travis-ci.org/jrop/gulp-pug2)
[![Coverage Status](https://coveralls.io/repos/github/jrop/gulp-pug2/badge.svg?branch=master)](https://coveralls.io/github/jrop/gulp-pug2?branch=master)

[![NPM](https://nodei.co/npm/gulp-pug2.png)](https://nodei.co/npm/gulp-pug2/)


## Installation

```sh
npm install --save-dev gulp-pug2
```

## Use

Use in your gulpfile like so:

```js
'use strict'

const pug = require('gulp-pug2')

gulp.task('views:render', function() {
    return gulp.src('your/files/example.pug')
        .pipe(pug({ yourTemplate: 'Locals' })
        .pipe(gulp.dest('build/views')
        // => build/views/example.html
})

gulp.task('views:compile', function() {
    return gulp.src('your/files/example.pug')
        .pipe(pug.compile())
        .pipe(gulp.dest('build/views'))
        // => build/views/example.js
        /*
        Use:
        const renderer = require('./build/views/example.js')
        const html = renderer({ yourTemplate: 'Locals' })
        */
})
```

Furthermore, data passed via the vinyl file object (for example, with plugins such as `gulp-data` or `gulp-front-matter`) is preserved and avalable as locals (`data` or `frontMatter`, respectively).

## Options

See the pug API for options you may pass.  Additionally, you may pass your own pug instance by setting `options.pug`.

## Contributing

If you want to contribute, open an issue and/or submit a pull request.

## License

ISC License (ISC)
Copyright (c) 2016, Jonathan Apodaca <jrapodaca@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
