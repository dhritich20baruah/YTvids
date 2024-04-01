import { View, Text, Button, Image, ImageBackground } from 'react-native';
import { styles } from './styles';

export default function App() {
  const handlePress= () => {
    alert("Hello world!")
  }

  return (
   <>
    <View style={styles.container}>
      <ImageBackground source={require('./assets/ironman.jpg')} resizeMode='cover' style={styles.background}>
      <Text style={styles.text}>React Native</Text>
      <Button title="Press" onPress={handlePress}/>
      </ImageBackground>
    </View>
   </>
  );
}


