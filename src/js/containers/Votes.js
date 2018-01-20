import React from 'react'
import { connect } from 'react-redux'
import { store } from 'state'
import Panel from 'components/Panel'

export default class Votes extends React.Component {
  componentWillMount() {

  }

  render() {
    return (
      <Panel title='Omröstning' newItemText='Ny omröstning' />
    )
  }
}
