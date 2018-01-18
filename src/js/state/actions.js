// action types
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const SET_SECTION = 'SET_SECTION'
export const SET_MEETING = 'SET_MEETING'

// action creators
export const login = token => ({ type: LOG_IN, payload: token })
export const logout = () => ({ type: LOG_OUT })
export const setSection = section => ({ type: SET_SECTION, payload: section })
export const setMeeting = meeting => ({ type: SET_MEETING, payload: meeting })
