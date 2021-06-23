
import { ButtonHTMLAttributes} from 'react'
import logoutImg from '../assets/images/logout.svg'
import '../styles/logout.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Logout (props: ButtonProps ){
  return(
    <button className="sair" {...props}> 
    
    <div>
        <img src={logoutImg} alt="sair" />
    </div>


    </button>
       
  )
}