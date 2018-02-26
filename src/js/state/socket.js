import { socketURL } from 'config'
import { ReconnectingWebSocket } from 'ReconnectingWebSocket'

const socket = new ReconnectingWebSocket(socketURL)

