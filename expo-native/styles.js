import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
      flex:1, 
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
    input: {
      backgroundColor: 'white',
      height: 30,
      padding: 2
    },
    childText: {
      color: 'white',
      fontSize: 30,
      textAlign: 'center',
      fontWeight: 'bold'
    }
  })