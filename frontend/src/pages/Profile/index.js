import React,{useEffect, useState} from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg';
import {FiPower,FiTrash2} from 'react-icons/fi'
import {Link,useHistory} from 'react-router-dom'
import api from '../../services/api.js'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect( () => {
        api.get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(res => {
        setIncidents(res.data.incidents);
      });
  }, [ongId]);

  console.log(incidents)

    async function handleDeleteIncident(id) {

        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter((incident) => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt=""/>
                <span>Bem vinda {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E20410" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
              
                {incidents.map(caso => (
                    
                    <li key={caso.id}>
                        <strong>Caso:</strong>
                        <p>{caso.titulo}</p>
                        
                        <strong>Descricao:</strong>
                        <p>{caso.descricao}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(caso.valor)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(caso.id)}>
                            <FiTrash2 size={20} color="a8a8b3" />
                        </button>
                    </li>
                ))}
               
            </ul>
        </div>
    )
}