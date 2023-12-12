import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/Tabs';
import { theme } from './src/utils/Themes';

export default function App() {

    // PaperProvider acts as a wrapper for the color theme
    // NavigationContainer acts as a wrapper for navigating

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Tabs/>
            </NavigationContainer>
        </PaperProvider>
    );
};