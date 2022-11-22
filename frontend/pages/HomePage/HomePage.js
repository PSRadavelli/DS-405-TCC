import React from 'react'
import { StyleSheet, View } from 'react-native'
import { BaseView } from '../../components/BaseView/BaseView'
import { Card } from '../../components/Card/Card'

const styles = StyleSheet.create({
  home: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 50
  }
})

const adminCards = [
  {
    title: 'Nova Encomenda',
    iconName: 'dropbox',
    redirectPage: ''
  },
  {
    title: 'Lista de portas',
    iconName: 'list',
    redirectPage: ''
  },
  {
    title: 'Cadastro de Usuário',
    iconName: 'user-plus',
    redirectPage: ''
  }
]

const commonCards = [
  {
    title: 'Minhas Encomendas',
    iconName: 'dropbox',
    redirectPage: ''
  },
  {
    title: 'Notificações',
    iconName: 'bell',
    redirectPage: ''
  }
]

export const HomePage = () => {
  return (
    <BaseView>
      <View style={styles.home}>
        {commonCards.map((card) => (
          <Card title={card.title} iconName={card.iconName} key={card.title}/>
        ))}
      </View>
    </BaseView>
  )
}
