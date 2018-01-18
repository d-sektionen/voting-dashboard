// action types
export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'
export const SET_SECTION = 'SET_SECTION'
export const SET_MEETING = 'SET_MEETING'

// action creators
export const login = () => ({ type: LOGGED_IN })
export const logout = () => ({ type: LOGGED_OUT })
export const setSection = section => ({ type: SET_SECTION, payload: section })
export const setMeeting = meeting => ({ type: SET_MEETING, payload: meeting })
