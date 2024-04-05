import { View, Text } from "react-native";
import { styles } from "../styles";

export default function Child(props){
    return(
        <View>
            <Text style={styles.childText}>Hello, I am {props.name}.</Text>
        </View>
    )
}