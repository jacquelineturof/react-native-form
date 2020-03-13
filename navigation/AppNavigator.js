import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import AuthScreen from '../screens/AuthScreen'
import MainScreen from '../screens/MainScreen'

const AppNavigator = createStackNavigator({
    Auth: {
        screen: AuthScreen
    },
    Main: {
        screen: MainScreen
    }
})

export default createAppContainer(AppNavigator)