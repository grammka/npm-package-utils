import React from 'react'
import Nested from './Nested'


export default class Foo extends React.Component {
  render() {
    return (
      <div>
        <div>Component injected:</div>
        <Nested />
      </div>
    )
  }
}
