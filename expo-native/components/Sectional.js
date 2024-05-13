import React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";

const Sectional = () => {
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
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text>{title}</Text>
    </View>
  );

  return (
    <SectionList
      sections={data}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={(item, index) => item.id}
    />
  );
};

export default Sectional;

const styles = StyleSheet.create({
    item: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      display: 'flex'
    },
    sectionHeader: {
      backgroundColor: '#f2f2f2',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      display: 'flex'
    },
  });