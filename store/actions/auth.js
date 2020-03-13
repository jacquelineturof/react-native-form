import * as actionTypes from './actionTypes'

import { AsyncStorage } from 'react-native'

import axios from '../../axios-backend'

/*
    AUTH ACTION CREATORS
*/
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authLoginSuccess = token => {
    return {
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        token
    }
}

export const authRegisterSuccess = message => {
    return {
        type: actionTypes.AUTH_REGISTER_SUCCESS,
        message
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const authReset = () => {
    return {
        type: actionTypes.AUTH_RESET
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

/*
    Check for saved token on localStorage to have a persistant state
*/
export const authCheckState = () => {
    return async dispatch => {
        try {
            let token = await AsyncStorage.getItem('x-token')
            if (!token) throw new Error()
            dispatch(authLoginSuccess(token))
        } catch (e) {
            dispatch(logout())
        }
    }
}

/* 
    Send auth data to backend.
    param isSignup will determine which url we send our auth data to.
    Will set error or success on auth store depending on which action we dispatch
    from try / catch block
*/
export const auth = (email, password, isSignup) => {
    return async dispatch => {
        dispatch(authStart())
        const authData = { email, password }
        let url = 'user/login'
        if (isSignup) {
            url = 'user'
        }
        
        try {
            const response = await axios.post(url, authData)

            if (!response) throw new Error('User Not Found')
            
            if (!isSignup) {
                await AsyncStorage.setItem('x-token', response.data.token);
                dispatch(authLoginSuccess( response.data.token ))
            } else {
                dispatch(authRegisterSuccess( response.data.user.email ))
            }
        } catch (e) {
            console.log(e)
            let errorMessage = 'Login Failed, Make Sure Your Email Has Been Verified'

            if (isSignup) errorMessage = 'Sign up failed!'

            dispatch(authFail(errorMessage))
        }
    }
}

/**
 * Hit backend logout route to clear old user tokens
 */
export const startLogout = token => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'x-auth': token
                }
            }

            await axios.delete('user/login', config)
            AsyncStorage.removeItem('x-token')
            dispatch(logout())
        } catch (e) {
            dispatch(authFail(e.message))
        }
    }
}

/*
    Hit the forgot password route. Will generate an email
    to send to the user.
    Only param is user email
*/
export const accountRecovery = email => {
    return async dispatch => {
        try {
            const response = await axios.post('user/password/forgot', { email })
            if (!response) throw new Error('Could not recover account! Contact admin.')
            dispatch(authRegisterSuccess(response.data))
        } catch(e) {
            dispatch(authFail(e.message))
        }
    }
}