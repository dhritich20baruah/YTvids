import {
  View,
  Text,
  ImageBackground,
  SectionList
} from "react-native";
import { styles } from "./styles";
import { useState } from "react";

export default function App() {
  const data = [
    {
      title: "Manufacturing",
      data: [
        { id: "M1", name: "Bravo" },
        { id: "M2", name: "Charlie" },
        { id: "M3", name: "Delta" },
        { id: "M4", name: "Echo" },
        { id: "M5", name: "Foxtrot" },
      ],
    },
    {
      title: "Design & Development",
      data: [
        { id: "D1", name: "Golf" },
        { id: "D2", name: "Hotel" },
        { id: "D3", name: "India" },
        { id: "D4", name: "Juliet" },
        { id: "D5", name: "Kilo" },
      ],
    }
  ]

  const renderItem = ({item}) => (
    <View>
      <Text style={{color: 'white', textAlign: 'center'}}>{item.name}</Text>
    </View>
  )

  const sectionalHeader = ({section: {title}}) => (
    <View>
      <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold', padding: 10}}>{title}</Text>
    </View>
  )
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/Cover.png")}
          resizeMode="cover"
          style={styles.background}
        >
          <Text style={styles.text}>React Native</Text>
          <SectionList sections={data} renderItem={renderItem} renderSectionHeader={sectionalHeader} keyExtractor={item => item.id}/>

        </ImageBackground>
      </View>
    </>
  );
}


