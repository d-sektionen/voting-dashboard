import React from 'react'
import { connect } from '../../common'
import TextInput from '../common/TextInput'
import Alternative from './Alternative'
import Results from './Results'

class VoteModal extends React.Component {
  updateVote = change => {
    this.props.setEditedVote({
      ...this.props.editedVote,
      ...change
    })
  }

  updateQuestion = question => this.updateVote({ question })

  updateAlternative = (index, alternativeText) => {
    const alternatives = [...this.props.editedVote.alternatives]
    alternatives[index] = { text: alternativeText }

    this.updateVote({ alternatives })
  }

  removeAlternative = (event, i) => {
    event.preventDefault()
    const alternatives = [...this.props.editedVote.alternatives]
    alternatives.splice(i, 1)

    this.updateVote({ alternatives })
  }

  addAlternative = event => {
    event.preventDefault()

    const alternatives = [
      ...this.props.editedVote.alternatives,
      { text: '' }
    ]

    this.updateVote({ alternatives })
  }

  setVoteOpen = open => this.updateVote({ open })

  closeModal = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal()
    }
  }

  render () {
    if (!this.props.modalOpen) {
      return null
    }

    return (
      <div onClick={this.closeModal} className='modal' id='modal'>
        <div className='modal-body'>
          {
            !this.props.modalEditMode
              ? <Results />
              : <React.Fragment>
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
                    <Alternative
                      label={`Alternativ ${i + 1}`}
                      placeholder={`Namn ${i + 1}`}
                      value={alternative.text}
                      id={`alternative${i}`}
                      onChange={text => this.updateAlternative(i, text)}
                      onDelete={event => this.removeAlternative(event, i)}
                      key={`alternative${i}`}
                    />
                  ))
                }
                <button onClick={event => this.addAlternative(event)} className='button-primary new-alternative'>
                  Lägg till alternativ
                </button>
                <hr />
                <label>
                  <input
                    checked={this.props.editedVote.open}
                    onChange={event => this.setVoteOpen(event.target.checked)}
                    type='checkbox'
                  />
                  <span className='label-body'>Nuvarande frågan</span>
                </label>
                <hr />
                {
                  this.props.editedVote.id === null
                    ? <button onClick={event => this.props.createVote()} className='button-primary'>
                      Skapa ny omröstning
                    </button>
                    : <button onClick={event => this.props.updateVote()} className='button-primary'>
                      Spara
                    </button>
                }
              </React.Fragment>
          }
        </div>
      </div>
    )
  }
}

export default connect(VoteModal)
