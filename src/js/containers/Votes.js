import React from 'react'
import { connect } from 'react-redux'
import { getVotes, getVote, removeVote, setEditedVote } from 'state'
import Panel from 'components/Panel'
import ListContainer from 'components/ListContainer'
import ListItem from 'components/ListItem'
import VoteModal from 'containers/VoteModal'
import M from 'materialize-css'


class Votes extends React.Component {
  handleNewEditedVote(vote) {
    this.props.setEditedVote(vote)
    // find a better way of doing this
    const modalElement = document.getElementById('voteModal')
    const modalInstance = M.Modal.getInstance(modalElement)
    modalInstance.open()
  }

  render() {
    return (
      <Panel title='Omröstning'>
        {
        this.props.currentMeeting ?
          <React.Fragment>
            <div className='section right-align'>
              <VoteModal />
            </div>
            <div className='divider' />
            {this.props.selectedVote.id &&
            <div className='section'>
              <h5>{this.props.selectedVote.question}</h5>
              <ul>
                {
              this.props.selectedVote.alternatives.sort((alt1, alt2) => alt1.num_votes > alt2.num_votes).map(vote => (
                <li key={`vote${vote.id}`}>
                  {vote.text}, {vote.num_votes}
                </li>
              ))
              }
              </ul>

            </div>

            }
            <ListContainer noItemsText='Inga omröstningar skapde än'>
              {
              this.props.votes.filter(vote => vote.meeting === this.props.currentMeeting)
                .map(vote => (
                  <ListItem
                    active={vote.id === this.props.selectedVote.id}
                    onClick={() => this.props.getVote(vote.id)}
                    key={`vote${vote.id}`}
                  >
                    {vote.question}
                    <i className='material-icons right'>
                      <a
                        onClick={() => this.handleNewEditedVote(vote)}
                        title='Redigera omrösting'
                        role='button'
                      >
                        edit
                      </a>
                    </i>
                  </ListItem>
                ))
              }
            </ListContainer>
          </React.Fragment>
          :
          <p>Inget möte valt</p>
        }
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  selectedVote: state.votes.selectedVote,
  votes: state.votes.all,
  currentMeeting: state.meetings.current,
  token: state.token,
})

const mapDispatchToProps = dispatch => ({
  getVote: voteID => dispatch(getVote(voteID)),
  getVotes: voteID => dispatch(getVotes(voteID)),
  removeVote: voteID => dispatch(removeVote(voteID)),
  setEditedVote: vote => dispatch(setEditedVote(vote)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Votes)
