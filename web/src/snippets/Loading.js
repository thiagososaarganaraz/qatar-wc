import React from 'react'
import loadingStyle from '../styles/loading.css'

function Loading() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', margin: '5rem auto'}}>
      <div style={loadingStyle} className="loading">
          <h2>Cargando</h2>
          <span></span>
          <span></span>
          <span></span>
      </div>
    </div>
  )
}

export default Loading