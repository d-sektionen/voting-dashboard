import { get } from 'utils'
import { socketURL } from 'config'
import { store, setAttendants, setScanners } from 'state'
import ReconnectingWebSocket from 'reconnectingwebsocket'

const ATTENDANTS_UPDATE = 'attendants_list'
const SCANNERS_UPDATE = 'scanner_list'

let socket

export const updateSocket = meetingID => {
  const token = get('token')

  if (socket) {
    socket.close()
  }

  socket = new ReconnectingWebSocket(`${socketURL}/meeting/${meetingID}/?token=${token}`)

  socket.onmessage = message => {
    const { type, data } = JSON.parse(message.data)

    switch (type) {
      case ATTENDANTS_UPDATE:
        store.dispatch(setAttendants(data))
        break
      case SCANNERS_UPDATE:
        store.dispatch(setScanners(data))
        break
      default:
        console.error('Unkowned socket data: ', type, data)
    }

    console.log(type, data)
  }
}

