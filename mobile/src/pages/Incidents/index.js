import React, {useState,useEffect}from 'react';
import {View,FlatList,Image,Text,TouchableOpacity} from 'react-native';
import logoImg from '../../assests/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import api from '../../services/api.js'

export default function Incidents(){
    const navegation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total,setTotal] = useState(0);
    async function loadIncidents(){
        const res = await api.get("incidents");
            setIncidents(res.data.incidents);
            setTotal(res.headers['total_count']);
    }
    useEffect( () => {loadIncidents()}, []);

    function navigateToDetail(incident){
        navegation.navigate('Detail',{incident});
    }
    return(

        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerBoldText}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.titulo}>Seja bem vindo</Text>
            <Text style={styles.descricao}>Escolha um caso abaixo e salve o dia !!</Text>

            <FlatList 
                style={styles.incidentList}
                data={incidents}
                keyExtractor={caso => String(caso.id)}
                showsVerticalScrollIndicator = {false}
                renderItem={({item:caso}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG: </Text>
                        <Text  style={styles.incidentValue}>{caso.nome}</Text>

                        <Text style={styles.incidentProperty}>CASO: </Text>
                        <Text  style={styles.incidentValue}>{caso.titulo}</Text>

                        <Text style={styles.incidentProperty}>VALOR: </Text>
                        <Text  style={styles.incidentValue}>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(caso.valor)}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(caso)}>
                            <Text style={styles.detailButtonText}>Ver detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041"/>
                        </TouchableOpacity>
                    </View>


                )}
                
            />
        
        </View>
    )
}