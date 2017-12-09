import React from 'react'
import Nested from './Nested'


export default class App extends React.Component {

  render() {

    return (
      <div>
        <div>App Component</div>
        <Nested />
      </div>
    )
  }
}
