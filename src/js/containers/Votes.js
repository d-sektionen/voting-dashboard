import React from 'react'
import { connect } from 'react-redux'
import { createVote, setCurrentVote, updateVote } from 'state'
import { isEmpty } from 'utils'
import Panel from 'components/Panel'
import ListContainer from 'components/ListContainer'
import ListItem from 'components/ListItem'
import TextInput from 'components/TextInput'
import ToggleBox from 'components/ToggleBox'

class Votes extends React.Component {
  // read off props
  // push to state (current vote)
  componentDidMount() {

  }

  render() {
    return (
      <Panel
        title='Omröstning'
        newItemText='Ny omröstning'
        onAddItem={question => this.props.createVote(question, this.props.currentMeeting)}
      >


        {/* If alternativs.length > 0 ? */}
        {isEmpty(this.props.currentVote) ?
          <div className='empty-box' />
            :
          <form>
            <TextInput text='Fråga' />
            <div className='section'>
              <TextInput text='Alternativ 1' placeholder='Namn 1' />
              <TextInput text='Alternativ 2' placeholder='Namn 2' />
              <div className='right-align'>
                <a className='waves-effect waves-light btn grey lighten-1 right-align'>
                  Lägg till alternativ
                  <i className='material-icons right'>add</i>
                </a>
              </div>
            </div>
            <ToggleBox className='right-align' onText='Öppna frågan' offText='Stäng frågan' />
            <div className='section right-align'>
              <button className='btn waves-effect waves-light add-alternative-button green' type='submit' name='action'>
                Spara
                <i className='material-icons right'>save</i>
              </button>
            </div>
          </form>
        }
        <div className='divider' />
        <ListContainer noItemsText='Inga omröstningar skapde än'>
          {
            this.props.votes.filter(vote => vote.meeting === this.props.currentMeeting)
              .map(vote => (
                <ListItem
                  active={vote.id === this.props.currentVote.id}
                  onClick={() => this.props.setCurrentVote(vote.id)}
                  key={`vote${vote.id}`}
                >
                  {vote.question}
                </ListItem>
            ))
          }
        </ListContainer>
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  currentVote: state.vote.current,
  votes: state.vote.all,
  currentMeeting: state.meeting.current,
})

const mapDispatchToProps = dispatch => ({
  createVote: (question, currentMeeting) => dispatch(createVote(question, currentMeeting)),
  updateVote: (voteID, question, open, alternatives) => dispatch(updateVote(voteID, question, open, alternatives)),
  setCurrentVote: voteID => dispatch(setCurrentVote(voteID)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Votes)
