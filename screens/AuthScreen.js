import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import Form from '../hooks/Form'

export default function AuthScreen({ navigation }) {
    return (
        <View style = { styles.container }>
            <Form navigation = { navigation } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})