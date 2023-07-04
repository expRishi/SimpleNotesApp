import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const AddNoteScreen = ({ navigation, route }) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDetails, setNoteDetails] = useState('');
  const { note } = route.params;

  useEffect(() => {
    if (note) {
      setNoteTitle(note.title);
      setNoteDetails(note.details);
    }
  }, [note]);

  const saveNote = async () => {
    try {
      const newNote = { id: Date.now(), title: noteTitle, details: noteDetails };
      let updatedNotes = [];
      const storedNotes = await AsyncStorage.getItem('@notes');
      if (storedNotes) {
        updatedNotes = JSON.parse(storedNotes);
      }
      if (note) {
        const noteIndex = updatedNotes.findIndex((n) => n.id === note.id);
        if (noteIndex !== -1) {
          updatedNotes[noteIndex] = newNote;
        }
      } else {
        updatedNotes.push(newNote);
      }
      await AsyncStorage.setItem('@notes', JSON.stringify(updatedNotes));
      navigation.goBack();
      Alert.alert("Added");
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Note title"
        value={noteTitle}
        onChangeText={(text) => setNoteTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Note details"
        value={noteDetails}
        onChangeText={(text) => setNoteDetails(text)}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} 
        onPress={saveNote}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 6,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AddNoteScreen;
