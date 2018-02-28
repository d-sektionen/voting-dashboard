import { fetchAPI, postAPI, updateAPI } from 'api/common'

const votingURL = '/voting/votes/'

export const getVotes = () => fetchAPI(votingURL)

export const getVote = voteID => fetchAPI(`${votingURL}${voteID}/`)

export const createVote = (meetingID, question, open, alternatives) => postAPI(votingURL, {
  meetingID, question, open, alternatives,
})

export const updateVote = (voteID, question, open, alternatives) => updateAPI(
  `${votingURL}${voteID}`,
  { question, open, alternatives }
)
