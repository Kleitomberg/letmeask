import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";


type firebaseQuestion = Record<string, {
  author:{
    name: string;
    avatar: string;
  }
  content: string;
  isHighLighted:boolean;
  isAnswered:boolean;
  likes: Record<string, {
    authorId:string;
  } >
}>


type QuestionType = {
  id: string;
  author:{
    name: string;
    avatar: string;
  }
  content: string;
  isHighLighted:boolean;
  isAnswered:boolean;
  likeCount: number;
  likeId: string | undefined;
}



export function useRoom(roomId: string){

  const {user} = useAuth();

  const [question, setQuestion] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const dabaseRoom = room.val();
      const firebaseQuestion: firebaseQuestion = dabaseRoom.question ?? {};
     
      const parsedQuestion = Object.entries(firebaseQuestion).map(([key, value]) => {

        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted:value.isHighLighted,
          isAnswered:value.isAnswered,  
          likeCount:Object.values(value.likes ?? {}).length,
          likeId:  Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],      
        }        
      })
      setTitle(dabaseRoom.title);
      setQuestion(parsedQuestion);
    })

    return () => {
      roomRef.off('value');
    }

  }, [roomId, user?.id]);

return {question, title}
}