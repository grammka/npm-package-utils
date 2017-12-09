<p>
  <img src="./images/logo960x420.png" height="80" />
</p>

### Create React apps fast with no Webpack

[![Npm Version](https://badge.fury.io/js/npu.svg)](https://www.npmjs.com/package/npu)
[![Month Downloads](https://img.shields.io/npm/dm/npu.svg)](http://npm-stat.com/charts.html?package=npu)
[![Npm Licence](https://img.shields.io/npm/l/npu.svg)](https://www.npmjs.com/package/npu)


## Features
- Create React examples for your packages in two steps


## Installation
```
npm install -g npu
```

Install peer dependencies in project root:
```
npm install react react-dom
```


## Example

`./lib/index.js`
```
const MyComponent = () => (
  <div>My Component</div>
)

module.exports = MyComponent
```

`./npu.config.js`
```javascript
module.exports = {
  app: './example/App.js'
}
```

`./example/App.js`
```javascript
import React from 'react'
import MyComponent from '../lib'

export default class App extends React.Component {
  render() {
    return (
      <div>
        Example:
        <MyComponent />
      </div>
    )
  }
}
```

**That's it!** 

Now you can make `npu -d` to run example in dev mode, or `npu -o ./build` to build app.


## TODO

- [ ] Deployment to surge.sh
