import { get } from 'utils'
import { socketURL } from 'config'
import { ReconnectingWebSocket } from 'ReconnectingWebSocket'

let socket

export const subscribeToMeeting = meetingID => {
  const token = get('token')

  socket = new ReconnectingWebSocket(`${socketURL}/${meetingID}/?token=${token}`)
}
