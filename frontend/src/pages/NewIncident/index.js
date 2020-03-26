import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

import './styles.css'

export default function NewIncident() {
  const [title, setTitle] = useState('')
  const [description, setDescrition] = useState('')
  const [value, setValue] = useState('')

  const ongId = localStorage.getItem('ongId')

  const history = useHistory()

  async function handleNewIncident(e){
    e.preventDefault()

    const data = {
      title,
      description,
      value
    }

    try{
      await api.post('incidents', data,{
        headers:{
          Authorization: ongId,
        }
      })

      history.push('/profile')
      
    }catch(err){
      alert(`Erro ao Cadastrar Caso!.`)
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro no caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um ferói para resolver isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para a home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
            <input 
              type="text" 
              placeholder="Título do Caso"
              value = {title}
              onChange = {e => setTitle(e.target.value)}
            />
            <textarea 
              type="text" 
              placeholder="Descrição"
              value = {description}
              onChange = {e => setDescrition(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Valor em Reais"
              value = {value}
              onChange = {e => setValue(e.target.value)}
            />
            <input className="button" type="submit" value="Cadastrar" />
        </form>
      </div>
    </div>
  )
}