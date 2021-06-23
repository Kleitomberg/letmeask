import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useParams} from 'react-router-dom'

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';

type firebaseQuestions = Record<string, {
  author:{
    name: string;
    avatar: string;
  }
  content: string;
  isHighLighted:boolean;
  isAnswered:boolean;
}>

type Question = {
  id: string;
  author:{
    name: string;
    avatar: string;
  }
  content: string;
  isHighLighted:boolean;
  isAnswered:boolean;
}

type RoomParams = {
  id: string;
}

export function Room(){

  const {user} = useAuth();

  const params = useParams <RoomParams>(); //generic

  const [newQuestion, setNewQuestion] = useState('');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const dabaseRoom = room.val();
      const firebaseQuestion: firebaseQuestions = dabaseRoom.question ?? {};
     
      const parsedQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {

        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted:value.isHighLighted,
          isAnswered:value.isAnswered,          
        }        
      })
      setTitle(dabaseRoom.title);
      setQuestions(parsedQuestions);
    })
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent){
    event.preventDefault();

    if (newQuestion.trim() === ''){
      return;
    }
    if(!user) {
      throw new Error("Usuario não esta logado!")
    }
    const question = {
      content:newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted:false,
      isAnswered:false
    };
    await database.ref(`rooms/${roomId}/question`).push(question);
    
    setNewQuestion('');
  }

  return(
    <div id="page-room"> 
      <header>
        <div className="content">
            <img src={logoImg} alt="LetMeAsk"/>
            <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
            <h1> Sala {title}</h1>
            { questions.length > 0 && <span> {questions.length} Pergunta(s) </span> }

            
        </div>

        <form onSubmit={handleSendQuestion}>
             <textarea
             placeholder="Faça sua pergunta"    
             onChange={event => setNewQuestion(event.target.value)}          
             value={newQuestion}
             />

             <div className="form-footer">
               { user ? (
                 <div className="user-info"> 
                    <img src={user.avatar} alt={user.name} />
                    <span> {user.name}  </span>
                  </div>
               ) : (
                  <span> Para enviar sua pergunta, <button> faça login </button> </span>
               ) }
              
              <Button type="submit" disabled={!user}> Enviar pergunta </Button>

             </div>

          </form>       
          {JSON.stringify(questions)} 
      </main>
    </div> 
  );
}