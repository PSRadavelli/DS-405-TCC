import React, { useState, useEffect } from 'react'
import { BaseView } from '../../components/BaseView/BaseView'
import { Table, Row, Rows } from 'react-native-table-component'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { useGetAllDoorsHook } from '../../hooks/useGetAllDoorsHook'

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: '50%' },
  cell: { backgroundColor: '#D9D9D9' },
  head: { height: 40, backgroundColor: '#6B6B6B' },
  text: { margin: 6, textAlign: 'center' }
})

const tableHead = ['N°', 'STATUS', 'MORADOR']

export const DoorsList = () => {
  const { doors, isDoorsLoading, isDoorsSuccess } = useGetAllDoorsHook()
  const [tableData, setTableData] = useState()

  useEffect(() => {
    if (doors && isDoorsSuccess) {
      const doorsData = doors.map((door) => {
        const number = door.doorNumber
        let status = 'LIVRE'
        let user = '-'

        if (door.packageId) {
          status = 'OCUPADA'

          user = `${door.user.name} ${door.user.surname}`
        }

        return [number, status, user]
      })

      setTableData(doorsData)
    }
  }, [doors, isDoorsSuccess])

  if (isDoorsLoading) {
    return (
      <BaseView>
        <ActivityIndicator color='#005BEA' size={100} style={{ width: '100%', height: '100%' }} />
      </BaseView>
    )
  }

  return (
    <BaseView>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: '#000' }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} style={styles.cell} textStyle={styles.text} />
        </Table>
      </View>
    </BaseView>
  )
}
