import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    background:{
      flex: 1,
      justifyContent: 'center'
    },
    text: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white',
      textAlign:"center"
    },
    addContainer: {
      display: 'flex', 
      flexDirection: 'row'
    },
    input: {
      backgroundColor: 'white',
      height: 50,
      width: 350,
      padding: 2
    },
    childText: {
      color: 'white',
      fontSize: 30,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    title: {
      color: "white",
      textAlign: 'center',
      fontWeight: 'bold'
    },
    btn:{
      width: 50,
      height: 50,
      elevation: 5,
      backgroundColor: "orange",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnText: {
      color: "white",
      fontWeight: 'bold'
    }
  })