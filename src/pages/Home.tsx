
import { useHistory } from 'react-router-dom'

import ilustracaoImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'


import {Button} from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth'


export function Home() {
const history = useHistory();

const {user,signInWithGoogle } = useAuth()

async function handleCreateRoom(){
  if (!user){
 await signInWithGoogle()
  }

  history.push('/rooms/new');

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
        <form> 
            <input 
            type="text"
            placeholder="Digite o código da sala"      
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