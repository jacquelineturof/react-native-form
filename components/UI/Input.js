import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { checkValidity } from '../../shared/utility'

/*
    Input UI
    @value string, value of the input field connected to state in form
    @changed function, change handler
    @placeholder, string, field placeholder text
    @icon, string the name of the icon from the ionicons package
    @password, boolean true if it is a password field (secureTextEntry)
    @validationRules, object containing the validation rules to use (checkValidity)
    @validationMessage, string a message to the user to let them know how the input
    should be formatted. 
*/
const Input = ({ 
    value, changed, placeholder, icon, password, validationRules, validationMessage }) => {
    
    const [ isValid, setIsValid ] = useState(false)
    const [ isTouched, setIsTouched ] = useState(false)

    const onChangeHandler = text => {
        setIsTouched(true)
        const valid = checkValidity(text, validationRules)
        setIsValid(valid)
        changed(text)
    }

    return (
        <View style = { styles.outerContainer }>
            <View style = { isTouched && !isValid 
            ? [ styles.container, styles.invalid ] : styles.container }>
            <Ionicons 
                name={ icon }
                size={28} 
                color="#76BD1C" 
                style = { styles.icon } />
            <TextInput 
                onChangeText = { changed } 
                value = { value}
                style = { styles.input }
                placeholder = { placeholder }
                secureTextEntry = { password }
                onChangeText = { text => onChangeHandler(text) } />
        </View>
            <Text style = { styles.warning }>
                { isTouched && !isValid 
                    ? validationMessage : ''}
            </Text>
        </View>


    )
}

const styles = StyleSheet.create({
    outerContainer: {
        width: '100%',
        height: 60,
        alignItems: 'center'
    },
    container: {
        borderRadius: 50,
        borderColor: '#5D576B',
        borderWidth: 2,
        width: '90%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    icon: {
        marginHorizontal: 20
    },
    invalid: {
        borderColor: 'red'
    },
    warning: {
        color: 'red'
    }
})

export default Input