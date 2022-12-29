import React, { useEffect, useState } from 'react'
import image from '../assets/title.png'
import image2 from '../assets/campeones.jpg'
import axios from 'axios';
import Loading from '../snippets/Loading';

function Home() {

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function getData(){
      try{
        let res = await axios.get("/matches")
        setMatch(res.data[63])
        setLoading(false)
      }catch(error){
        console.log(error)
        setLoading(false)
      }
    }

    getData()
  },[])

  const listMatch = () =>{
    return(
    <div className='matchCard' key={match.id}>
      <h4 className='group'>Ultimo partido</h4>
      <div className='matchTeamNames'>
        <h4>{match.home_team_en}</h4>
        <h4>{match.away_team_en}</h4>
      </div>
      <div className='matchFlags'>
        <div className='matchLocalFlag'><img src={match.home_flag} alt={match.home_team_en}/></div>
        <div className='matchCenterArea'>
          <h3 className='matchElapsedTime'>{match.time_elapsed}</h3>
            <div className='matchScore'>
              <h1 className='localScore'>{match.home_score}</h1><h1>-</h1><h1 className='awayScore'>{match.away_score}</h1>
            </div>
        </div>
        <div className='matchAwayFlag'><img src={match.away_flag} alt={match.away_team_en}/></div>
      </div>
      <div className='matchScorers'>
        <ul className='localScorers'>
          {
          match.home_scorers[0] === 'null' ? <li style={{listStyle:'none'}}></li> : match.home_scorers.map((scorer)=><li key={match._id}>{scorer}</li>)
          }
        </ul>
        <ul className='awayScorers'>
          {match.away_scorers[0] === 'null' ? <li style={{listStyle:'none'}}></li> : match.away_scorers.map((scorer)=><li key={match._id}>{scorer}</li>)}
        </ul>
      </div>
    </div>
    )
  }


  return (
    <div className="container">
    <div className='principal'>
      <section className='principal-one'>
        <div className='title'>
          <img src={image} alt='title' className='title-img'/>
        </div>
        <div className='teamContainer'>
          {!loading ? listMatch() : <Loading/>}
        </div>
      </section>
    </div>
  </div>
  )
}

export default Home