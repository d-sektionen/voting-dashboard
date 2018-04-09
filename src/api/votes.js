import { fetchAPI, postAPI, updateAPI, deleteAPI } from 'api/common'

const votingURL = '/voting/votes'

export const getVotes = () => fetchAPI(`${votingURL}/`)

export const getVote = voteID => fetchAPI(`${votingURL}/${voteID}/`)

export const createVote = (meeting, question, open, alternatives) => postAPI(`${votingURL}/`, {
  meeting, question, open, alternatives
})

export const updateVote = (voteID, question, open, alternatives) => updateAPI(
  `${votingURL}/${voteID}`,
  { question, open, alternatives }
)

export const deleteVote = voteID => deleteAPI(`${votingURL}/${voteID}/`)
