import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import FontAwesome from "@expo/vector-icons/FontAwesome6";

export default function App() {
  const [note, setNote] = useState("");
  const [noteArr, setNoteArr] = useState([]);
  const [visible, setVisible] = useState(false);
  const [noteId, setNoteId] = useState("");

  //DATABASE
  const db = SQLite.openDatabase("example.db"); //IF db doesnot exist it will be created

  useEffect(() => {
    //First check if a table exist if not create one
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS my_notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT)"
      );
    });

    //The following code will fetch the notes from sqlite db if it exist and then update the setNoteArr array
    //The purpose of the set note array is to display the existing notes in the screen
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM my_notes",
        null,
        (txObj, resultSet) => {
          setNoteArr(resultSet.rows._array);
          console.log(resultSet.rows._array);
        },
        (txObj, error) => console.log(error)
      );
    });
  }, []);

  //ADD NOTE
  const addNote = () => {
    console.log(note)
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO my_notes (note) values (?)",
        [note],
        (txObj, resultSet) => {
          let prevNotes = [...noteArr]; //prevNote is an array that will store the values of the noteArr
          prevNotes.push({ id: resultSet.insertId, note: note }); //This line will append the prevNotes array with the new note
          setNoteArr(prevNotes); //Finally the noteArr will be updated
          setNote(""); //Will make the textinput blank after adding note
          console.log(prevNotes); //TO TEST
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  // DELETE NOTE
  const deleteNote = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM my_notes WHERE id=?",
        [id], //This line will delete the note from the sqlite table
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            //But we have to seperately delete the note from the noteArr array
            let prevNotes = [...noteArr].filter((note) => note.id != id); //This line will filter out the note with that particular id from the array
            setNoteArr(prevNotes);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  //UPDATE
  //TO update the note first I will use a function to populate the text input field with the note to be updated
  // Then I will use another function to first update the note in the sqlite table and then update the noteArr array so that the updated note is displayed
  const editNote = (id) => {
    setNoteId(id);
    setVisible(true);
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT note FROM my_notes WHERE id = ?",
        [id],
        (txObj, resultSet) => setNote(resultSet.rows._array[0].note), //This will fetch the note from the table and populate the text input
        (txObj, error) => console.log(error)
      );
    });
  };

  //SECOND FUNCTION TO UPDATE THE NOTE
  const updateNote = () => {
    let text = note //There was a mistake in naming the state variables and table columns try to give different names.
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE my_notes set note = ? WHERE id = ?",
        [text, noteId], // This line will update the note in the table
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            setNoteArr((prevNotes) => {
              return prevNotes.map((note) => { //This will map over the value of the notes in the noteArr array
                if (note.id === noteId){ //if id is same as the updated note id the note will be edited.
                  return {...note, note: text}
                }
                return note
              })
            })
            setNote("");
            setVisible(false);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  return (
    <View>
      <Text style={{ margin: 30, textAlign: "center", fontWeight: "bold", fontSize: 25 }}>Notes</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TextInput
          onChangeText={setNote}
          value={note}
          placeholder="Write your note"
          style={{
            width: 350,
            height: 50,
            borderWidth: 2,
            borderColor: "gray",
            margin: 5,
            padding: 5,
          }}
        />
        {visible ? (
          <TouchableOpacity
            onPress={updateNote}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: 50,
              padding: 5,
              margin: 5,
            }}
          >
               <FontAwesome name="pen-to-square" size={20} color="blue" />
          </TouchableOpacity>
        ):(
          <TouchableOpacity
            onPress={addNote}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "orange",
              height: 50,
              width: 50,
              padding: 5,
              margin: 5,
            }}
          >
            <Text style={{ fontSize: 30, color: "white" }}>+</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ margin: 10 }}>
        {noteArr.map((item) => {
          return (
            <View
              key={item.id}
              style={{
                fontSize: 20,
                margin: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>{item.note}</Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ margin: 5 }}
                  onPress={() => deleteNote(item.id)}
                >
                  <FontAwesome name="trash-can" size={20} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ margin: 5 }}
                  onPress={() => editNote(item.id)}
                >
                  <FontAwesome name="pen-to-square" size={20} color="blue" />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
