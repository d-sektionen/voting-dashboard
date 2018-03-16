import React from 'react'
import { connect } from 'react-redux'
import {
  setEditedVote,
  createVote,
  updateVote,
  defaultVote,
  setEditedVoteQuestion,
  setEditedVoteAlternatives,
  setEditVoteOpen,
} from 'state'
import TextInput from 'components/TextInput'
import ToggleBox from 'components/ToggleBox'
import M from 'materialize-css'

class VoteModal extends React.Component {
  constructor(props) {
    super(props)

    this.modalID = 'voteModal'

    this.handleNewVote = this.handleNewVote.bind(this)
    this.handleUpdatedVote = this.handleUpdatedVote.bind(this)
    this.handleAlternativeChange = this.handleAlternativeChange.bind(this)
    this.handleNewAlternative = this.handleNewAlternative.bind(this)
    this.handleAlternativeRemoval = this.handleAlternativeRemoval.bind(this)
  }

  componentDidMount() {
    const modalElement = document.getElementById(this.modalID)
    this.instance = M.Modal.init(modalElement, {})
  }

  openVoteModal() {
    this.props.setEditedVote(defaultVote)
    this.instance.open()
  }

  handleNewVote(event) {
    event.preventDefault()
    this.props.createVote(this.props.editedVote, this.props.currentMeeting)
  }

  handleUpdatedVote(event) {
    event.preventDefault()
    this.props.updateVote(this.props.editedVote)
  }

  handleAlternativeChange(index, alternativeText) {
    const alternatives = [...this.props.editedVote.alternatives]
    alternatives[index] = { text: alternativeText }

    this.props.setEditedVoteAlternatives(alternatives)
  }

  handleAlternativeRemoval(index) {
    const alternatives = [...this.props.editedVote.alternatives]
    alternatives.splice(index, 1)

    this.props.setEditedVoteAlternatives(alternatives)
  }

  handleNewAlternative(e) {
    e.preventDefault()
    const alternatives = [...this.props.editedVote.alternatives]
    alternatives.push({ text: '' })

    this.props.setEditedVoteAlternatives(alternatives)
  }

  render() {
    return (
      <React.Fragment>
        <button className='btn' onClick={this.openVoteModal}>Ny omröstning</button>
        <div id={this.modalID} className='modal'>
          <div className='modal-content'>
            <form>
              <TextInput
                text='Fråga'
                placeholder=''
                value={this.props.editedVote.question}
                onChange={question => this.props.setEditedVoteQuestion(question)}
              />
              <div className='section'>
                {
                this.props.editedVote.alternatives.map((alternative, i) => (
                  <TextInput
                    text={`Alternativ ${i + 1}`}
                    placeholder={`Namn ${i + 1}`}
                    value={alternative.text}
                    onChange={text => this.handleAlternativeChange(i, text)}
                    key={`alternative${i}`}
                  />
                ))
                }
                <div className='right-align'>
                  <button onClick={this.handleNewAlternative} className='waves-effect waves-light btn grey lighten-1 right-align'>
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
                  onChange={open => this.props.setEditVoteOpen(open)}
                />
              </div>
              <div className='modal-footer right-align'>
                {
                this.props.editedVote.id === null ?
                  <a
                    onClick={event => this.handleNewVote(event)}
                    className='btn waves-effect waves-light modal-action modal-close green'
                    type='submit'
                    name='action'
                    role='button'
                  >
                    <i className='material-icons left'>save</i>
                    Skapa ny omröstning
                  </a>
                  :
                  <a
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


const mapStateToProps = state => ({
  editedVote: state.votes.editedVote,
  currentMeeting: state.meetings.current,
})

const mapDispatchToProps = dispatch => ({
  createVote: (vote, meeting) => dispatch(createVote(meeting, vote.question, vote.open, vote.alternatives)),
  updateVote: vote => dispatch(updateVote(vote.id, vote.question, vote.open, vote.alternatives)),
  setEditedVote: vote => dispatch(setEditedVote(vote)),
  setEditedVoteQuestion: question => dispatch(setEditedVoteQuestion(question)),
  setEditedVoteAlternatives: alternatives => dispatch(setEditedVoteAlternatives(alternatives)),
  setEditVoteOpen: open => dispatch(setEditVoteOpen(open)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VoteModal)
