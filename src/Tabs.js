import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';
import InstructionsScreen from './screens/InstructionsScreen';
import { theme } from './utils/Themes';

const Tab = createBottomTabNavigator()

// determines tabs and navigation for screens
export default function Tabs() {

    // specify nav bar icons
    const screenOptions = ({ route }) => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarIcon: ({ size }) => {
            let iconName;
            if (route.name === "Home") {
                iconName = "flower-tulip";
            } else if (route.name === "Care Instructions") {
                iconName = "book-open-variant";
            }
            return <Icon source={iconName} size={size} color={theme.colors.primary} />;
        }
    })

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Care Instructions" component={InstructionsScreen}/>
        </Tab.Navigator>
    );
}