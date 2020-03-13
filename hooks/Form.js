import React, { useState } from 'react'
import { View, StyleSheet, Button, Image } from 'react-native'

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

export default function Form() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    console.log(email)
    console.log(password)

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
            <Input
                value = { password }
                changed = { setPassword }
                placeholder = "Enter Password Here"
                icon = "ios-lock"
                password = { true }
                validationRules = { PASSWORD_RULES }
                validationMessage = "Must be a minium of six characters." />
            <Button
                title = "Login"
                color = "#76BD1C"
                style = { styles.button } />
            <View style = { styles.linkContainer }>
                <Button 
                    title = "Forgot Password?"
                    color = "#124E78" />
                <Button 
                    title = "Register"
                    color = "#124E78" />
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