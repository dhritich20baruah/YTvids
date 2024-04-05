import { View, Text, Button, Image, ImageBackground, TextInput } from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import Child from './components/Child';

export default function App() {
  const [text, setText] = useState("")

  const handlePress= () => {
    console.log(text)
  }

  return (
   <>
    <View style={styles.container}>
      <ImageBackground source={require('./assets/Cover.png')} resizeMode='cover' style={styles.background}>
      <Text style={styles.text}>React Native</Text>
      <TextInput placeholder='Type Something' style={styles.input} value={text} onChangeText={setText}/>
      <Button title="Press" onPress={handlePress}/>
      <Child name={text}/>
      </ImageBackground>
    </View>
   </>
  );
}


