import React, {useState} from 'react'//importar Reac e Estados
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUF] = useState('')

  const history = useHistory()

  async function handleRegister(e){
    e.preventDefault()// Não carregar a página na submissão

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }
    
    try{
      const response = await api.post('ongs', data)
      alert(`Seu ID de acesso: ${response.data.id}.`)
      history.push('/')
    }catch(err){
      alert(`Erro no Cadastro! Tente novamente.`)
    }
    
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e 
            ajude pessoas a encontrarem os casos da sua ONG.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
            <input 
              type = "text" 
              placeholder = "Nome da ONG"
              value = {name}
              onChange = {e => setName(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="E-mail"
              value = {email}
              onChange = {e => setEmail(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Whatsapp"
              value = {whatsapp}
              onChange = {e => setWhatsapp(e.target.value)}
            />
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Cidade"
                value = {city}
                onChange = {e => setCity(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="UF" 
                style={{ width:80}}
                value = {uf}
                onChange = {e => setUF(e.target.value)}
              />
            </div>
            {/* <buttton className="button" type="submit">Cadastrar</buttton> */}
            <input className="button" type="submit" value="Cadastrar" />
        </form>
      </div>
    </div>
  )
}