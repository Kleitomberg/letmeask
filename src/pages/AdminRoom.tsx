//import { useEffect } from 'react';
//import { useState } from 'react';
import {  useHistory, useParams} from 'react-router-dom'

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
//import { Logout } from '../components/Logout';
//import { useAuth } from '../hooks/useAuth';
import deleteImg from '../assets/images/delete.svg';

import {database } from '../services/firebase';

import '../styles/room.scss';
import '../contexts/AuthContext.tsx';
import { Questions } from '../components/Questions';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
  id: string;
}

export function AdminRoom(){

  //const [] = useState() 
  //const {user} = useAuth();  
  const history = useHistory()
  const params = useParams <RoomParams>(); //generic
 // const [newQuestion, setNewQuestion] = useState(''); 
  
  const roomId = params.id;

  const {title, question} = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endeDat: new Date(),
    })

    history.push('/');
    
  }

  //Colocar modal posteriormente 
  async function HandleDeleteQuestion(questionId: string){
    if (window.confirm('Tem certeza que você deseja excluir esa pergunta?')){

      await database.ref(`rooms/${roomId}/question/${questionId}`).remove();
    }
  }
  
  return(
    <div id="page-room"> 
      <header>

        <div className="content">
            <img src={logoImg} alt="LetMeAsk"/>
            <div  className="canto">
            <RoomCode code={roomId}  />
            <Button isOutlined onClick={handleEndRoom}> Encerrar a sala</Button>
          
            </div>
        </div>
        

      </header>

      <main>
        <div className="room-title">
            <h1> Sala {title}</h1>
            { question.length > 0 && <span> {question.length} Pergunta(s) </span> }
            </div>
   
          <div className="question_list">
              {question.map(question => {
                return(
                    <Questions
                    key={question.id}
                    content ={question.content}
                    author = {question.author}                    
                    >

                      <button 
                      type="button"
                      onClick={() => HandleDeleteQuestion(question.id)}
                      > 
                        <img src={deleteImg} alt="remover pergunta"/>
                          
                      </button>

                    </Questions>
                );
              })}

         </div>
      </main>
    </div> 
  );
}