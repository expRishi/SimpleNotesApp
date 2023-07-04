import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddNoteScreen from './screens/AddNoteScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer style={styles.headView}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Notes' }} />
        <Stack.Screen name="AddNote" component={AddNoteScreen} options={{ title: 'Add Note' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headView: {
    backgroundColor: "#000000"
  },
})

export default App;
