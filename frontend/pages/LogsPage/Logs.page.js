import React, { useState } from 'react'
import { View, FlatList, StatusBar, Text, StyleSheet } from 'react-native'
import { BaseView } from '../../components/BaseView/BaseView'

const DATA = [
  {
    id: 1,
    userId: 1,
    text: 'Sua encomenda encomenda chegou, e está disponível na porta 2!',
    date: '12/12/1994'
  },
  {
    id: 1,
    userId: 1,
    text: 'Sua encomenda foi retirada!',
    date: '12/12/1994'
  },
  {
    id: 1,
    userId: 1,
    text: 'Sua encomenda foi retirada!',
    date: '12/12/1994'
  },
  {
    id: 1,
    userId: 1,
    text: 'Sua encomenda foi retirada!',
    date: '12/12/1994'
  },
  {
    id: 1,
    userId: 1,
    text: 'Sua encomenda foi retirada!',
    date: '12/12/1994'
  },
  {
    id: 1,
    userId: 1,
    text: 'Sua encomenda foi retirada!',
    date: '12/12/1994'
  },
  {
    id: 1,
    userId: 1,
    text: 'Sua encomenda foi retirada!',
    date: '12/12/1994'
  },
  {
    id: 1,
    userId: 1,
    text: 'Sua encomenda foi retirada!',
    date: '12/12/1994'
  },
  {
    id: 1,
    userId: 1,
    text: 'Sua encomenda foi retirada!',
    date: '12/12/1994'
  },
  {
    id: 1,
    userId: 1,
    text: 'Sua encomenda foi retirada!',
    date: '12/12/1994'
  },
  {
    id: 1,
    userId: 1,
    text: 'Sua encomenda foi retirada!',
    date: '12/12/1994'
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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
    <Text style={styles.date}>{date}</Text>
  </View>
)

export const Logs = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  return (
    <BaseView>
        <FlatList
          style={styles.container}
          data={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item text={item.text} date={item.date} />}
          refreshing={isRefreshing}
          onRefresh={() => setIsRefreshing(true)}
        />
    </BaseView>
  )
}
