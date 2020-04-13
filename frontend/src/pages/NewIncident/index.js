import React,{useState} from 'react';
import './style.css';
import '../../global.css';
import {Link,useHistory} from 'react-router-dom'
import api from '../../services/api.js'
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';


export default function NewIncident(){
    const [titulo,setTitulo] = useState('');
    const [descricao,setDescricao] = useState('');
    const [valor,setValor] = useState('');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();
    async function handleCreateIcident(event){
        event.preventDefault();

        const data  = {
           titulo,
           descricao,
           valor
        };

        try{
            const response = await api.post('incidents',data,{headers:{Authorization:ongId}})
            alert(`Caso cadastrado com Sucesso!!`)
            history.push('/profile')
        }catch(erro){
            alert(`Erro no cadastro!!`)
        }
    }
    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva detalhaente o caso para encontrar um heroi pra resolver-lo.</p>
                    
                    <Link className = "back-link" to="/profile" >
                    <FiArrowLeft size={16} color = "#e02041"/>
                     Voltar 
                </Link>
                </section>

                <form onSubmit={handleCreateIcident}>
                    <input 
                        placeholder="Titulo do caso"
                        value={titulo}
                        onChange={e=> setTitulo(e.target.value)}/>
                    <textarea 
                        placeholder="Descrição" 
                        value={descricao}
                        onChange={e=> setDescricao(e.target.value)}/>
                    <input 
                        placeholder="Valor em reais"
                        value={valor}
                        onChange={e=> setValor(e.target.value)}/>
                    
                    <button type="submit" className="button">Cadastrar</button>
                </form>

            </div>
        </div>
    )


}