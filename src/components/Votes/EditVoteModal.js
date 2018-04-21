import React from 'react'
import { connect } from 'utils'
import TextInput from 'components/common/TextInput'
import ToggleBox from 'components/common/ToggleBox'
import M from 'materialize-css'

class VoteModal extends React.Component {
  openModal = () => {
    const modalElement = document.getElementById('editVoteModal')
    const instance = M.Modal.init(modalElement)
    instance.open()
  }

  updateVote = change => {
    this.props.setEditedVote({
      ...this.props.editedVote,
      ...change
    })
  }

  openNewVote = () => {
    this.props.resetEditedVote()
    this.openModal()
  }

  handleNewVote = event => {
    event.preventDefault()
    this.props.createVote()
  }

  handleUpdatedVote = event => {
    event.preventDefault()
    this.props.updateVote()
  }

  updateQuestion = question => {
    this.updateVote({question})
  }

  updateAlternative = (index, alternativeText) => {
    const alternatives = [...this.props.editedVote.alternatives]
    alternatives[index] = { text: alternativeText }

    this.updateVote({alternatives})
  }

  removeAlternative = (event, i) => {
    event.preventDefault()
    const alternatives = [...this.props.editedVote.alternatives]
    alternatives.splice(i, 1)

    this.updateVote({alternatives})
  }

  addAlternative = event => {
    event.preventDefault()

    const alternatives = [
      ...this.props.editedVote.alternatives,
      {text: ''}
    ]

    this.updateVote({alternatives})
  }

  setVoteOpen = open => {
    this.updateVote({open})
  }

  render () {
    return (
      <React.Fragment>
        <div className='section right-align'>
          <button className='waves-effect waves-light btn' onClick={this.openNewVote}>Ny omröstning</button>
        </div>
        <div id='editVoteModal' className='modal'>
          <div className='modal-content edit-modal'>
            <form>
              <TextInput
                text='Fråga'
                placeholder=''
                value={this.props.editedVote.question}
                onChange={question => this.updateQuestion(question)}
              />
              <div className='section'>
                {
                  this.props.editedVote.alternatives.map((alternative, i) => (
                    <div className='row'>
                      <div className='col s10'>
                        <TextInput
                          text={`Alternativ ${i + 1}`}
                          placeholder={`Namn ${i + 1}`}
                          value={alternative.text}
                          onChange={text => this.updateAlternative(i, text)}
                          key={`alternative${i}`}
                        />
                      </div>
                      <div className='col s2'>
                        <button
                          className='waves-effect waves-light btn red remove-alternative' tabIndex='-1'
                          onClick={event => this.removeAlternative(event, i)}>
                          <i className='material-icons'>clear</i>
                        </button>
                      </div>
                    </div>
                  ))
                }
                <div className='right-align'>
                  <button onClick={event => this.addAlternative(event)} className='waves-effect waves-light btn grey lighten-1 right-align'>
                    <i className='material-icons left'>add</i>
                    Lägg till alternativ
                  </button>
                </div>
              </div>
              <div className='section'>
                <ToggleBox
                  className='right-align'
                  value={this.props.editedVote.open}
                  onText='Öppna frågan'
                  offText='Stäng frågan'
                  onChange={open => this.setVoteOpen(open)}
                />
              </div>
              <div className='modal-footer right-align'>
                {
                  this.props.editedVote.id === null
                    ? <a
                      onClick={event => this.handleNewVote(event)}
                      className='btn waves-effect waves-light modal-action modal-close green'
                      type='submit'
                      name='action'
                      role='button'
                    >
                      <i className='material-icons left'>save</i>
                    Skapa ny omröstning
                    </a>
                    : <a
                      onClick={event => this.handleUpdatedVote(event)}
                      className='btn waves-effect waves-light modal-action modal-close green'
                      type='submit'
                      name='action'
                      role='button'
                    >
                      <i className='material-icons left'>save</i>
                    Spara
                    </a>
                }
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(VoteModal)
