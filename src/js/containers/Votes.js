import React from 'react'
import { connect } from 'react-redux'
import { createVote, setCurrentVote, updateVote } from 'state'
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

        {/* <form>
          Fråga: <TextInput inline />
          Alternativ 1: <TextInput inline placeholder='Namn 1' />
          Alternativ 2: <TextInput inline placeholder='Namn 2' />
          Öppen: <ToggleBox />
          <button>Lägg till alternativ</button>
          <button>Spara</button>
        </form> */}
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
