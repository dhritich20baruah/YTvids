import React from 'react'
import {FlatList,View, Text, StyleSheet } from 'react-native'

const data = [
    {id: '1', name: 'Bravo'},
    {id: '2', name: 'Charlie'},
    {id: '3', name: 'Delta'},
    {id: '4', name: 'Echo'},
    {id: '5', name: 'Foxtrot'}
]

const Separator = () => <View style={styles.separator}></View>

const Flatslist = () => {
    const renderElement = ({item}) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
        </View>
    )

  return (
    <FlatList data={data} renderItem={renderElement} keyExtractor={item=>item.id} ItemSeparatorComponent={Separator}/>
  )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 8,
      },
      title: {
        fontSize: 20,
      },
    separator: {
        height: 1,
        backgroundColor: 'gray',
      },
})

export default Flatslist