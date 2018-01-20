import React from 'react'
import { connect } from 'react-redux'
import Panel from 'components/Panel'
import { createVote, updateVote } from 'state'
import ListContainer from 'components/ListContainer'

const votes = props => (
  <Panel
    title='Omröstning'
    newItemText='Ny omröstning'
    onAddItem={(text) => console.log('Created vote', text)}
  >
    <ListContainer noItemsText='Inga omröstningar skapde än'>
      {console.log(props)}
      {[]}
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(votes)
