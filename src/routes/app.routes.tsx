import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { Register } from "../screens/Register";

//logged user: details, home and register

//anonymous user: signin and signup (create in the future)

const { Navigator, Screen } = createNativeStackNavigator(); //navigator -> rota, screen é a tela

export function AppRoutes() {
    return (
        <Navigator
        screenOptions={{ headerShown: false }}
        >
            <Screen name="home" component={ Home } /> 
            <Screen name="new" component={ Register } /> 
            <Screen name="details" component={ Details } /> 
        </Navigator>
    )
}

