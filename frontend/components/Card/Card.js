import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    padding: 10
  }
})

export const Card = ({ title, iconName, redirectPage}) => {
  return (
  <View style={styles.card}>
      <Icon name={iconName} size={20} color="#000" style={{ margin: 10 }}/>
      <Text style={{ fontSize: 12, textAlign: 'center' }}>{title}</Text>
    </View>
  )
}
