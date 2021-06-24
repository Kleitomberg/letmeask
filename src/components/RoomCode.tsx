import copyImg from '../assets/images/copy.svg';

import '../styles/roomCode.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode( props: RoomCodeProps){  
  function copyCode(){
    navigator.clipboard.writeText(props.code)
  }

  return(
    <button 
    className="room-code" 
    aria-label="Clique para copiar o codigo"
    onClick={copyCode}
    >

      <div>
        <img src={copyImg} alt="copyCode" />
      </div>

      <span> Sala # {props.code}</span>    
    </button>        
  )
}