import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('userData', value)
  } catch (e) {
    console.log(e)
  }
}

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('userData')
    if (value !== null) {
      return value
    }
  } catch (e) {
    console.log(e)
  }
}
