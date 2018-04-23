import React from 'react'
import { connect } from 'utils'
import TextInput from 'components/common/TextInput'
import ToggleBox from 'components/common/ToggleBox'
import Alternative from './Alternative'

class VoteModal extends React.Component {
  updateVote = change => {
    this.props.setEditedVote({
      ...this.props.editedVote,
      ...change
    })
  }

  openNewVote = () => {
    this.props.resetEditedVote()
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
      <div className='modal' id='modal'>
        <div className='modal-body'>
          <TextInput
            label='Fråga'
            placeholder=''
            id='question'
            value={this.props.editedVote.question}
            onChange={question => this.updateQuestion(question)}
          />
          <hr />
          {
            this.props.editedVote.alternatives.map((alternative, i) => (
              <React.Fragment>
                <Alternative
                  label={`Alternativ ${i + 1}`}
                  placeholder={`Namn ${i + 1}`}
                  value={alternative.text}
                  id={`Alternativ ${i}`}
                  onChange={text => this.updateAlternative(i, text)}
                  onDelete={event => this.removeAlternative(event, i)}
                  key={`alternative${i}`}
                />

              </React.Fragment>
            ))
          }
          <button onClick={event => this.addAlternative(event)} className='button-primary new-alternative'>
            Lägg till alternativ
          </button>
          <hr />
          <ToggleBox
            value={this.props.editedVote.open}
            text='Håll frågan öppen'
            onChange={open => this.setVoteOpen(open)}
          />
          <hr />
          {
            this.props.editedVote.id === null
              ? <button onClick={event => this.handleNewVote(event)} className='button-primary'>
                Skapa ny omröstning
              </button>
              : <button onClick={event => this.handleUpdatedVote(event)} className='button-primary'>
                Spara
              </button>
          }
        </div>
      </div>
    )
  }
}

export default connect(VoteModal)
