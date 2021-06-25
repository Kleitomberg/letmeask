import { ReactNode } from 'react';

import '../styles/questions.scss';

type QuestionProps = {
  content:string;
  author:{
    name:string;
    avatar:string;
  };
  children?:ReactNode;
  isHighLightedw?:boolean;
  isAnswered?:boolean;
}



  export function Questions({
    content,
    author,
    isHighLightedw = false,
    isAnswered = false,
    children,
  }:QuestionProps){

  return(
    <div className={`question ${isAnswered ? 'answered' : ''} ${isHighLightedw ? 'highLightedw' : ''}`}>
        <p> {content}</p>

        <footer>
          <div className="user-info">
              <img src={author.avatar} alt={author.name} />
              <span> {author.name}</span>
          </div>
          <div> {children}</div> 
        </footer>
    </div>
  )
}