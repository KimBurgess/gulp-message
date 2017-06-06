# gulp-message

[![Build Status](https://travis-ci.org/acaprojects/skype-native.svg?branch=master)](https://travis-ci.org/acaprojects/gulp-message)
[![Code Climate](https://codeclimate.com/github/acaprojects/gulp-message/badges/gpa.svg)](https://codeclimate.com/github/acaprojects/gulp-message)
[![Dependencies Status](https://david-dm.org/acaprojects/gulp-message/status.svg)](https://david-dm.org/acaprojects/gulp-message)
[![npm version](https://badge.fury.io/js/gulp-message.svg)](https://badge.fury.io/js/gulp-message)

Emit clean, readable log messages from gulp tasks

## Usage

### Get the package.

    npm install --save gulp-message

### Import it.

Javascript:
```javascript
const message = require('gulp-message');
```

Typescript / ES6:
```typescript
import * as message from 'gulp-message';
```
*Types are bundled with the published package and will be automatically imported.*

### Use it in your gulp tasks

```
gulp.task('foo', () => {
    message.warn('Well that's not quite right...');
});
```


## API



