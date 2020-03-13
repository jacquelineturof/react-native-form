import React, { useState } from 'react'
import { View, StyleSheet, Button, Image } from 'react-native'
import { useDispatch } from 'react-redux'

import { checkValidity } from '../shared/utility'
import * as actions from '../store/actions'

import Input from '../components/UI/Input'

// Validation rules for our inputs
const EMAIL_RULES = {
    required: true,
    isEmail: true
}

const PASSWORD_RULES = {
    required: true,
    minLength: 6
}

export default function Form({ navigation }) {
    const dispatch = useDispatch()
    /*
        Form State
    */
    // default form is login, 3 formTypes: login, register, forgotPassword
    const [ formType, setFormType ] = useState('login')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const submitHandler = () => {
        let isEmailValid
        let isPasswordValid

        if (formType === 'login') {
            isEmailValid = checkValidity(email, EMAIL_RULES)
            isPasswordValid = checkValidity(password, PASSWORD_RULES)

            if (isEmailValid && isPasswordValid) {
                dispatch(actions.auth(email, password, false))
                navigation.navigate('Main')
            }
        } else if (formType === 'register') {
            isEmailValid = checkValidity(email, EMAIL_RULES)
            isPasswordValid = checkValidity(password, PASSWORD_RULES)

            if (password !== confirmPassword) {
                console.log('Not matching!')
                return
            } else {
                if (isEmailValid && isPasswordValid) {
                    dispatch(actions.auth(email, password, true))
                }
            }
        } else {
            if (isEmailValid) {
                dispatch(actions.accountRecovery(email))
            }
        }
    }

    return (
        <View style = { styles.container }>
            <Image
                source = { require('../assets/iconfinder_Ecology_leaves_and_symbols-11_257424.png')}
                style = { styles.icon } />
            <Input
                value = { email }
                changed = { setEmail }
                placeholder = "Enter Email Here"
                icon = "ios-mail"
                validationRules = { EMAIL_RULES }
                validationMessage = "Must be a valid email address." />
            {
                formType !== 'forgotPassword' 
                    ? (
                        <Input
                            value = { password }
                            changed = { setPassword }
                            placeholder = "Enter Password Here"
                            icon = "ios-lock"
                            password = { true }
                            validationRules = { PASSWORD_RULES }
                            validationMessage = "Must be a minium of six characters." />
                    )
                    : null
            }
            {
                formType === 'register'
                    ? (
                        <Input
                            value = { confirmPassword }
                            changed = { setConfirmPassword }
                            placeholder = "Confirm Password Here"
                            icon = "ios-checkmark"
                            password = { true }
                            validationRules = { PASSWORD_RULES }
                            validationMessage = "Must be a minium of six characters." />
                    )
                    : null
            }
            <Button
                title = "SUBMIT"
                color = "#76BD1C"
                style = { styles.button }
                onPress = { submitHandler } />
            <View style = { styles.linkContainer }>
            {
                formType !== 'forgotPassword'
                    ? (
                        <Button 
                            title = "Forgot Password?"
                            color = "#124E78"
                            onPress = { () => setFormType('forgotPassword') } />
                    )
                    : null
            }
            {
                formType !== 'register'
                    ? (
                        <Button 
                            title = "Register"
                            color = "#124E78"
                            onPress = { () => setFormType('register') } />
                    )
                    : null
            }
            {
                formType !== 'login'
                    ? (
                        <Button 
                            title = "Login"
                            color = "#124E78"
                            onPress = { () => setFormType('login') } />
                    )
                    : null
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '80%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    icon: {
        width: 200,
        height: 200
    },
    linkContainer: {
        height: '20%',
        width: '90%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    }
})