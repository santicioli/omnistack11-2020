import React, {useEffect, useState} from 'react'
// Algo Clicável TouchableOpacity, Button apresenta layout padrão do celular
import { View, FlatList, Image, Text, TouchableOpacity, Button } from 'react-native'
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

import styles from './styles'
import logoImg from '../../assets/logo.png'

export default function Detail(){
  //iniciar o estao com tipo que será colocado depois
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)//Inicia com 1
  //Evitar chamar uma requisição enquanto outra estiver sendo realizada
  const [loading, setLoading] = useState(false)

  const navigation= useNavigation()

  function navigateToDetail(incident){
    //passando incidente para detail
    navigation.navigate('Detail', {incident})
  }

  async function loadIncidents(){
    if (loading) {
      return
    }

    if (total > 0 && incidents.length >= total) {
      return
    }

    setLoading(true)

    const response = await api.get(`incidents?page=${page}`)

    //juntar vetores para não substituir
    setIncidents([...incidents, ...response.data])
    setTotal(response.headers['x-total-count'])
    setPage(page + 1)
    setLoading(false)
  }

   //array de dependencia
  //useEffect(() => função que executa quando as varáveis do array muda
  //useEffect(() => {}, []) como array está vazio executa apenas uma vez
  useEffect(() => {
    loadIncidents()
  }, [])

  return(
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}> {total} casos</Text>
        </Text>
      </View>
      <Text style={styles.title}> Ben-Vindo!</Text>
      <Text style={styles.description}> Escolha um dos casos abaixo e salve o dia</Text>
      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsHorizontalScrollIndicator = {true}//barra de rolagem
        //Chama a função ao chegar ao final da lista
        onEndReached = {loadIncidents}
        //A 20% do fim da lista chama a função loadIncident 
        onEndReachedThreshold = {0.2}
        // item padrão da preopriedade que possui o retorno
        renderItem={({ item: incident } )=>(
          <View style={styles.incident}>
            <Text style={styles.incidenteProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidenteProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>

            <Text style={styles.incidenteProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR',
                { style: 'currency',
                  currency: 'BRL'
                }).format(incident.value)
              }
            </Text>
            <TouchableOpacity 
              style={styles.detailsButton} 
              onPress={()=>navigateToDetail(incident)}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" siza ={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />      
    </View>
  )
}