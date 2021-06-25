
import { useHistory } from 'react-router-dom'
import { FormEvent } from 'react';
import ilustracaoImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'


import {Button} from '../components/Button';

import '../styles/auth.scss';
import '../styles/responsividade.scss';
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react';
import { database } from '../services/firebase';



export function Home() {
const history = useHistory();
const {user, signInWithGoogle } = useAuth()
const [roomCode, setRoomCode] = useState('');

async function handleCreateRoom(){
  if (!user){
    await signInWithGoogle()
  }

  history.push('/rooms/new');  
}

async function handleJoinRoom(event: FormEvent){
  event.preventDefault();

  if (roomCode.trim() === ''){
    return;
  }
  
  
    

  const roomRef = await database.ref(`rooms/${roomCode}`).get();
  
  if(!roomRef.exists()){
    alert("Sala não Existe.");
    return;
  }

    if(roomRef.val().endeDat){
      alert("A Sala foi encerrada");
      return;
    }

  history.push(`/rooms/${roomCode}`);
}

  return (
 <div id="page-auth">
   <aside> 
    <img src={ilustracaoImg}alt="ilustração" />
    <strong> Crie salas de Q&amp;A ao-vivo </strong>
    <p> Tire as duvidas da sua audiência em temo-real</p>
   </aside>
   <main> 
     <div className="main-content"> 
       <img src= {logoImg} alt="LetMeAsk"/>
       <button onClick={handleCreateRoom} className="criarSala"> 
          <img src={googleImg} alt="google logo"/>
          Criar sala com o Google
        </button>
        <div className="separador"> ou entre em uma sala </div>
        <form onSubmit={handleJoinRoom}> 
            <input 
            type="text"
            placeholder="Digite o código da sala"   
            onChange={event => setRoomCode(event.target.value)}  
            value={roomCode}
            />

            <Button type="submit">
              Entrar na sala
            </Button>
        </form>
       </div> 
   </main>
 </div> 
  )
}