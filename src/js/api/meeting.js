import { fetchAPI, postAPI, updateAPI } from 'api/common'

const meetingURL = '/voting/meetings/'

export const getMeetings = () => fetchAPI(meetingURL)

export const getMeeting = meetingID => fetchAPI(`${meetingURL}${meetingID}`)

export const createMeeting = (name, section) => postAPI(meetingURL, { name, section })

export const updateMeeting = (meetingID, name, section, archived) => updateAPI(
  `${meetingURL}${meetingID}`,
  { name, section, archived }
)
