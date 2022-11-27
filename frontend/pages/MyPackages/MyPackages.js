import React, { useState, useEffect } from 'react'
import { BaseView } from '../../components/BaseView/BaseView'
import { ActivityIndicator, StyleSheet, ScrollView } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
import { useGetPackagesByUserIdHook } from '../../hooks/useGetPackagesByUserIdHook'

const styles = StyleSheet.create({
  container: { padding: 20 },
  cell: { backgroundColor: '#D9D9D9' },
  head: { height: 80, backgroundColor: '#6B6B6B' },
  text: { margin: 6, textAlign: 'center' }
})

const tableHead = ['RETIRADO', 'DATA DE ENTREGA', 'DATA DE RETIRADA']

export const MyPackages = () => {
  const { packages, isPackagesLoading, isPackagesSuccess } = useGetPackagesByUserIdHook()
  const [tableData, setTableData] = useState()

  useEffect(() => {
    if (packages && isPackagesSuccess) {
      const packagesData = packages.map((pckg) => {
        const retrieved = pckg.retrieved ? 'SIM' : 'NÃO'
        const receivementDate = pckg.receivementDate
        const retrievalDate = pckg.retrievalDate || '-'

        return [retrieved, receivementDate, retrievalDate]
      })

      setTableData(packagesData)
    }
  }, [packages, isPackagesSuccess])

  if (isPackagesLoading) {
    return (
      <BaseView>
        <ActivityIndicator color='#005BEA' size={100} style={{ width: '100%', height: '100%' }} />
      </BaseView>
    )
  }

  return (
    <BaseView>
      <ScrollView style={styles.container}>
        <Table style={{ marginBottom: 50 }} borderStyle={{ borderWidth: 2, borderColor: '#000' }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} style={styles.cell} textStyle={styles.text} />
        </Table>
      </ScrollView>
    </BaseView>
  )
}
