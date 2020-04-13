import React,{useState} from 'react';
import './style.css';
import '../../global.css';
import {Link,useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api.js'


export default function Register(){
    const history = useHistory();
    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [telefone,setTelefone] = useState('');
    const [cidade,setCidade] = useState('');
    const [uf,setUf] = useState('');

    async function handleRegister(event){
        event.preventDefault();

        const data  = {
            nome,
            email,
            telefone,
            cidade,
            uf
        };

        try{
            const response = await api.post('ongs',data)
            alert(`Cadastro com Sucesso!!\nSeu ID de acesso: ${response.data.id}`)
            history.push('/')
    }catch(erro){
            alert(`Erro no cadastro!!\n${erro}`)
        }
    }
    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadasto</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrarem os casos da sua ONG</p>
                    <Link className = "back-link" to="/" >
                    <FiArrowLeft size={16} color = "#e02041"/>
                     Voltar para o Logon 
                </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={nome}
                        onChange={e=> setNome(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="Email"
                        value={email}
                        onChange={e=> setEmail(e.target.value)}/>
                    <input 
                        placeholder="Telefone"
                        value={telefone}
                        onChange={e=> setTelefone(e.target.value)}/>
                    
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={cidade}
                            onChange={e=> setCidade(e.target.value)}/>
                        <input 
                            placeholder="UF" 
                            style={{width: 80}}
                            value={uf}
                            onChange={e=> setUf(e.target.value)}/>
                    </div>
                    
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}