import React from 'react'
import messi from '../assets/bobo.jpg'

function ErrorPage() {
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <h1 style={{fontFamily: "Qatar2022"}}>Que buscas bobo, esta pagina no existe, anda pa allá</h1>
      <div style={{textAlign: 'center'}}>
        <img src={messi} style={{width:'40%'}}/>
      </div>
    </div>
  )
}

export default ErrorPage