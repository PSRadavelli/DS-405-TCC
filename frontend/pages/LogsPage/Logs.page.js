import React from 'react'
import { View, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native'
import { BaseView } from '../../components/BaseView/BaseView'
import { useGetLogsByUserIdHook } from '../../hooks/useGetLogsByUserIdHook'
import { parseDateString } from '../../util/parseDateString'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: '#D9D9D9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  date: {
    fontSize: 14,
    textAlign: 'right'
  }
})

const Item = ({ text, date }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{text}</Text>
    <Text style={styles.date}>{parseDateString(date)}</Text>
  </View>
)

export const Logs = () => {
  const { logs, isLogsLoading, refetch } = useGetLogsByUserIdHook()

  return (
    <BaseView>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.container}
          data={logs}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item text={item.text} date={item.date} />}
          refreshing={isLogsLoading}
          onRefresh={refetch}
        />
      </SafeAreaView>
    </BaseView>
  )
}
