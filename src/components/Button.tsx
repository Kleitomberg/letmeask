import {useState} from "react"

export function Button(){
const [cont, setCont] = useState(0); //Estado

function incremento(){
  setCont(cont + 1);
}

  return(
    <button onClick={incremento}> 
    {cont} 
    </button>
  )
}