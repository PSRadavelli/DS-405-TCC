import React from 'react'
import { Pressable, Text } from 'react-native'

export const CustomButton = ({title, style, onPress}) => {
  return (
    <Pressable style={{ backgroundColor: '#6B6B6B', padding: 20, borderRadius: 10, ...style }} onPress={onPress}>
      <Text style={{ textAlign: 'center', color: 'white', textTransform: 'uppercase', fontSize: 16 }}>{title}</Text>
    </Pressable>
  )
}
