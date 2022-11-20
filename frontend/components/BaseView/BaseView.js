
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export const BaseView = ({ children, style }) => {
  return (
    <View style={{ ...style }}>
      <LinearGradient colors={['#5790F4', '#04BEFE99']} style={{ height: '100%', width: '100%' }}>
        {children}
      </LinearGradient>
    </View>
  )
}
