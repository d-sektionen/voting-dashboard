import { fetchAPI, postAPI, deleteAPI, updateAPI } from './requests'

/**
 * --------------------- ATTENDANTS ---------------------
 */
const attendantURL = '/voting/attendants/'

export function getAttendants (meetingID) {
  return fetchAPI(`${attendantURL}?meeting=${meetingID}`)
}

export function addAttendant (liuID, meetingID) {
  return postAPI(attendantURL, { username: liuID.toLowerCase(), meeting: meetingID })
}

export function removeAttendant (attendantID, meetingID) {
  return deleteAPI(`${attendantURL}${attendantID}/?meeting=${meetingID}`)
}

/**
 * --------------------- MEETINGS ---------------------
 */
const meetingURL = '/voting/meetings/'

export function getMeetings () {
  return fetchAPI(meetingURL)
}

export function getMeeting (meetingID) {
  return fetchAPI(`${meetingURL}${meetingID}/`)
}

export function createMeeting (name, section) {
  return postAPI(meetingURL, { name, section })
}

export function updateMeeting (meetingID, name, sectionID, archived) {
  return updateAPI(
    `${meetingURL}${meetingID}`,
    { name, section: sectionID, archived }
  )
}

/**
 * --------------------- VOTES ---------------------
 */
const votingURL = '/voting/votes'

export function getVotes () {
  return fetchAPI(`${votingURL}/`)
}

export function getVote (voteID) {
  return fetchAPI(`${votingURL}/${voteID}/`)
}

export function createVote (meeting, question, open, alternatives) {
  return postAPI(`${votingURL}/`, {
    meeting, question, open, alternatives
  })
}

export function updateVote (voteID, question, open, alternatives) {
  return updateAPI(
    `${votingURL}/${voteID}`,
    { question, open, alternatives }
  )
}

export function deleteVote (voteID) {
  return deleteAPI(`${votingURL}/${voteID}/`)
}

/**
 * --------------------- SCANNERS ---------------------
 */
const userURL = '/voting/scanners/'

export function getScanners (meetingID) {
  return fetchAPI(`${userURL}?meeting=${meetingID}`)
}

export function addScanner (liuID, meetingID) {
  return postAPI(userURL, { username: liuID.toLowerCase(), meeting: meetingID })
}

export function removeScanner (scanner, meetingID) {
  return deleteAPI(`${userURL}${scanner}/?meeting=${meetingID}`)
}

/**
 * --------------------- USER INFO ---------------------
 */
const userInfoURL = '/account/user/me/'

export function getUserInfo () {
  return fetchAPI(userInfoURL)
    .then(userInfo => ({
      userName: userInfo.username,
      firstName: userInfo.first_name,
      lastName: userInfo.last_name,
      sections: userInfo.sections
    }))
}
