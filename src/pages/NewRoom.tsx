import { useState } from 'react';
import {FormEvent} from 'react'

import {Link, useHistory} from 'react-router-dom'

import ilustracaoImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'


import {Button} from '../components/Button';
import { database } from '../services/firebase';
import '../styles/auth.scss';
import '../styles/responsividade.scss';

import { useAuth } from '../hooks/useAuth'




export function NewRoom() {

 const {user} = useAuth();

 const history = useHistory();
 const[ newRoom, setNemRoom] = useState('');

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault();

      if(newRoom.trim()=== ''){
        return;
      }

   const roomRef = database.ref('rooms');

   const firebaseRoom = await roomRef.push({

    title: newRoom,
    authorId:user?.id,

   })    
   
   history.push(`/admin/rooms/${firebaseRoom.key}`);

   
  }

  return (
 <div id="page-auth">
   <aside> 
    <img src={ilustracaoImg}alt="ilustração" />
    <strong> Mande sua pergunta ao-vivo </strong>
    <p> Tire as duvidas da sua audiência em temo-real</p>
   </aside>
   <main> 
     <div className="main-content"> 
       <img src= {logoImg} alt="LetMeAsk"/>

       <div className="user-logado">

        <img src={user?.avatar} alt={user?.name} />
        <p>{user?.name}</p>

        </div>

       <h2> Criar uma Nova Sala</h2>
       
        <form onSubmit= {handleCreateRoom}> 

            <input 
            type="text"
            placeholder="Nome da sala"    
            onChange={event => setNemRoom(event.target.value)} 
            value={newRoom} 
            />

            <Button type="submit">
              Criar sala
            </Button>
        </form>
        <p> Quer entrar em uma sala existente? <Link to="/"> Clique aqui</Link> </p> 
       </div> 
   </main>
 </div> 
  )
}