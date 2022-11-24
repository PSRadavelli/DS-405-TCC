import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { BaseView } from '../../components/BaseView/BaseView'
import { Card } from '../../components/Card/Card'
import { getData } from '../../util/asyncStorage'

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
    redirectPage: 'AdministratorPage'
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
    redirectPage: 'Logs'
  }
]

export const HomePage = () => {
  const [cardData, setCardData] = useState(null)

  useEffect(() => {
    const manageUserData = async () => {
      const userData = await getData()

      const userDataJson = JSON.parse(userData)

      if (userDataJson.user.admin) {
        setCardData(adminCards)
      } else {
        setCardData(commonCards)
      }
    }

    manageUserData()
  }, [])

  if (!cardData) {
    return (
      <BaseView>
        <ActivityIndicator color='#005BEA' size={100} style={{ width: '100%', height: '100%' }} />
      </BaseView>
    )
  }

  return (
    <BaseView>
      <View style={styles.home}>
        {cardData.map((card) => (
          <Card title={card.title} iconName={card.iconName} redirectPage={card.redirectPage} key={card.title}/>
        ))}
      </View>
    </BaseView>
  )
}
