import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('@notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.log('Error fetching notes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.mainView}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteDetails}>{item.details}</Text>
            </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNote', { note: null })}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 40,
  },
  noteItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "red",
  },
  noteDetails:{
    fontSize: 17,
    marginHorizontal: 10,
    color: "#999"
  },
  mainView: {
    //alignItems: "center",
    padding: 5,
    marginBottom: 20,
    borderWidth: 0.5,
    //borderColor: "grey",
    borderRadius: 15,
    shadowColor: '#000000',  
    elevation: 8,
    backgroundColor: "white"
  },
  addButton: {
    position: 'absolute',
    bottom: 15,
    right: 40,
    backgroundColor: 'red',
    borderRadius: 30,
    padding: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
