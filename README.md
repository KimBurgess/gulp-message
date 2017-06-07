# gulp-message

[![Build Status](https://travis-ci.org/acaprojects/gulp-message.svg?branch=master)](https://travis-ci.org/acaprojects/gulp-message)
[![Code Climate](https://codeclimate.com/github/acaprojects/gulp-message/badges/gpa.svg)](https://codeclimate.com/github/acaprojects/gulp-message)
[![Dependencies Status](https://david-dm.org/acaprojects/gulp-message/status.svg)](https://david-dm.org/acaprojects/gulp-message)
[![npm version](https://badge.fury.io/js/gulp-message.svg)](https://badge.fury.io/js/gulp-message)

Emit clean, readable log messages from gulp tasks

## Usage

### 1. Get the package

    npm install --save gulp-message

### 2. Import it

Javascript:
```javascript
const message = require('gulp-message');
```

Typescript / ES6:
```typescript
import * as message from 'gulp-message';
```
*Types are bundled with the published package and will be automatically imported.*

### 3. Use it in your gulp tasks

```javascript
gulp.task('foo', () => {
    message.warn(`Well that's not quite right...`);
});
```


## API

### `message.error(string)`

Emit an error message.

### `message.warn(string)`

Emit an warning message.

### `message.info(string)`

Emit an info message.

### `message.debug(string)`

Emit an debug message.

### `logger(opts)`

Create a custom log emitter.

Option  | Description                                       | Default
------- | ------------------------------------------------- | ---------
prefix  | A prefix to append to all outgoing messages - either a string, or `[string, style]` tuple    | ''
style   | The style to apply to the message body            | none
writer  | The log message emitter                           | `gutil.log`

Example:
```javascript
const tableFlip = message.logger({
    prefix: '(ノಠ益ಠ)ノ彡┻━┻'
})

tableFlip('Breath in, breath out.')
=> '(ノಠ益ಠ)ノ彡┻━┻ Breathe in, breathe out.'
```
