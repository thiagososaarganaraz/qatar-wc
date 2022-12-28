import React from 'react'
import image from '../assets/title.png'
import image2 from '../assets/campeones.jpg'

function home() {
  return (
    <div className="container">
    <div className='principal'>
      <section className='principal-one'>
        <div className='title'>
          <img src={image} alt='title' className='title-img'/>
        </div>
        <div className='hero'>
          <img src={image2} className='world-champions-img'/>
        </div>
      </section>
    </div>
  </div>
  )
}

export default home