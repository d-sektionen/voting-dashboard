import React from 'react'
import { connect } from 'react-redux'
import { createVote, getVote, updateVote } from 'state'
import Panel from 'components/Panel'
import ListContainer from 'components/ListContainer'
import ListItem from 'components/ListItem'
import TextInput from 'components/TextInput'
import ToggleBox from 'components/ToggleBox'

const votes = props => (
  <Panel
    title='Omröstning'
    newItemText='Ny omröstning'
    onAddItem={question => props.createVote(question, props.currentMeeting)}
  >
    <form>
      Fråga: <TextInput inline />
      Alternativ: <TextInput inline />
      Öppen: <ToggleBox />
    </form>
    <ListContainer noItemsText='Inga omröstningar skapde än'>
      {props.votes.map(vote => (
        <ListItem
          active={vote.id === props.currentVote.id}
          onClick={() => props.setCurrentVote(vote.id)}
          key={`vote${vote.id}`}
        >
          {vote.question}
        </ListItem>
      ))}
    </ListContainer>
  </Panel>
)

const mapStateToProps = state => ({
  currentVote: state.vote.currentVote,
  votes: state.vote.list,
  currentMeeting: state.meeting.currentMeeting,
})

const mapDispatchToProps = dispatch => ({
  createVote: (question, currentMeeting) => dispatch(createVote(question, currentMeeting)),
  updateVote: (voteID, question, open, alternatives) => dispatch(updateVote(voteID, question, open, alternatives)),
  setCurrentVote: voteID => dispatch(getVote(voteID)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(votes)
