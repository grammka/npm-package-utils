<p>
  <img src="./images/logo960x420.png" height="100" />
</p>

# Node Package Utils (npu)

##### Utils for simple work with npm projects.

[![Npm Version](https://badge.fury.io/js/npu.svg)](https://www.npmjs.com/package/npu)
[![Month Downloads](https://img.shields.io/npm/dm/npu.svg)](http://npm-stat.com/charts.html?package=npu)
[![Npm Licence](https://img.shields.io/npm/l/npu.svg)](https://www.npmjs.com/package/npu)

[![NPM](https://nodei.co/npm/npu.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/npu/)


## Features
- Create example for packages in two steps


## Installation
```
npm install --save-dev npu
```
or, for global usage
```
npm install -g npu
```

Install pear dependencies: `react`, `react-dom`


## Example

####`/npu.config.js`
```javascript
module.exports = {
  app: './example/App.js'
}
```

####`/example/App.js`
```javascript
import React from 'react'

export default class App extends React.Component {
  render() {
    return (
      <div>Example</div>
    )
  }
}
```

Thats it! Now you can make `npu -d` to run example in dev mode, or `npu -o ./build` for building.


## TODO

- [ ] Deployment on Surge
