import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import {useState, useEffect} from "react"
import * as SQLite from "expo-sqlite"

export default function App() {
  const [note, setNote] = useState("")
  const [noteArr, setNoteArr] =useState([])
  const [visible, setVisible] = useState(false)

  //DATABASE
  const db = SQLite.openDatabase("example.db") //IF db doesnot exist it will be created

  useEffect(() => {
    //First check if a table exist if not create one
    db.transaction((tx)=> {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS my_notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT)"
      )
    })

    //The following code will fetch the notes from sqlite db if it exist and then update the setNoteArr array 
    //The purpose of the set note array is to display the existing notes in the screen
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM my_notes",
        null,
        (txObj, resultSet) => setNoteArr(resultSet.rows._array),
        (txObj, error) => console.log(error)
      )
    })
  }, [])

  //ADD NOTE
  const addNote = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO my_notes (note) values (?)",
        [note],
        (txObj, resultSet) => {
          let prevNotes = [...noteArr]; //prevNote is an array that will store the values of the noteArr
          prevNotes.push({ id: resultSet.insertId, note: note}) //This line will append the prevNotes array with the new note
          setNoteArr(prevNotes) //Finally the noteArr will be updated
          setNote("") //Will make the textinput blank after adding note
          console.log(prevNotes) //TO TEST 
        },
        (txObj, error) => console.log(error)
      )
    })
  }

  return (
  <View>
    <Text style={{margin: 30, textAlign: 'center', fontWeight: 'bold', fontSize: 25}}>Notes</Text>
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <TextInput onChangeText={setNote} value={note} placeholder="Write your note" style={{width: 350, height: 50, borderWidth: 2, borderColor: 'gray', margin: 5, padding: 5}}/>
      <TouchableOpacity onPress={addNote} style={{display: 'flex', justifyContent: "center", alignItems: 'center', backgroundColor: 'orange', height: 50, width: 50, padding: 5, margin: 5}}>
        <Text style={{fontSize: 30, color: 'white'}}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}
