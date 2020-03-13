import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function MainScreen() {
    return (
        <View style = { styles.container }>
            <Text>Main Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
})