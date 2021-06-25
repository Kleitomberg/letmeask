//import { useEffect } from 'react';
//import { useState } from 'react';
import {  useHistory, useParams} from 'react-router-dom'

import Modal from 'react-modal';

import { Fragment } from 'react';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
//import { Logout } from '../components/Logout';
//import { useAuth } from '../hooks/useAuth';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import excluirImg from '../assets/images/Icon - Excluir.svg'
import ansewerImg from '../assets/images/answer.svg';

import {database } from '../services/firebase';

import '../styles/room.scss';
import '../styles/responsividade.scss';
import '../styles/modal.scss';
import '../contexts/AuthContext.tsx';
import { Questions } from '../components/Questions';
import { useRoom } from '../hooks/useRoom';
import { useState } from 'react';
//import { async } from 'q';

type RoomParams = {
  id: string;
}

export function AdminRoom(){

  //const [] = useState() 
  //const {user} = useAuth();  

  const [questionIdModalOpen, setQuestionIdModalOpen] = useState<string | undefined>();
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
    
    await database.ref(`rooms/${roomId}/question/${questionId}`).remove();
    
  }

  async function HandleCheckQuestionAsAnswered(questionId: string){

    await database.ref(`rooms/${roomId}/question/${questionId}`).update({
      
      isAnswered:true,
    });
  }

  async function HandleHighlightQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/question/${questionId}`).update({
      isHighLighted:true,
  
    });
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
              {question.map(  question => {
                return(
                  <Fragment key={question.id}>
                    <Questions
                    key={question.id}
                    content ={question.content}
                    author = {question.author}  
                    isAnswered = {question.isAnswered}  
                    isHighLightedw={question.isHighLighted}                
                    >               
                      
                      {!question.isAnswered && (
                     <>
                        <button 
                        type="button"
                        onClick={() => HandleCheckQuestionAsAnswered(question.id)}
                        > 
                          <img src={checkImg} alt="Marcar pergunta como respondida"/>
                            
                        </button>


                        <button 
                        type="button"
                        onClick={() => HandleHighlightQuestion(question.id)}
                        > 
                          <img src={ansewerImg} alt="Destacar pergunta"/>
                            
                        </button>
                        </>
                     )}
                     
                      <button 
                      type="button"
                      onClick={() => setQuestionIdModalOpen(question.id)}
                      > 
                        <img src={deleteImg} alt="remover pergunta"/>
                          
                      </button>

                    </Questions>
                    
                    <Modal isOpen={questionIdModalOpen === question.id}
                    onRequestClose={() => setQuestionIdModalOpen(undefined)}
                    className="modal"
                    >
                      <div id="modal-delete">
                        <img src={excluirImg} alt="deletar" />
                        <h3>Excluir pergunta</h3>
                        <p>Tem certeza que você deseja excluir esa pergunta?</p>
                        <div className="modal-buttons"> 
                        <button className="cancelar" onClick={() => setQuestionIdModalOpen(undefined)}> Cancelar</button>
                        <button className="confirmar" onClick={() => HandleDeleteQuestion(question.id)}> Sim, excluir</button>
                        
                      </div>
                    </div>
                    </Modal>
                    </Fragment>
                );
              })}

         </div>
      </main>
      
      
    </div> 
  );
}