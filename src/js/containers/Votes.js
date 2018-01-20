import React from 'react'
import { connect } from 'react-redux'
import Panel from 'components/Panel'
import { createVote, getVote, updateVote } from 'state'
import ListContainer from 'components/ListContainer'
import ListItem from 'components/ListItem'

const votes = props => (
  <Panel
    title='Omröstning'
    newItemText='Ny omröstning'
    onAddItem={question => props.createVote(question, props.currentMeeting)}
  >
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
