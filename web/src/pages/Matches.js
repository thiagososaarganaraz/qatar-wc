import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../snippets/Loading';
import '../styles/matches.css'

function Matches() {
  let data = []
  const [matches, setMatches] = useState(null);
  const [selectedMatches, setSelectedMatches] = useState(null);
  const [loading, setLoading] = useState(true);

  //Pido los datos al renderizar por primera vez
  useEffect(()=>{
    async function getData(){
      try{
        let res = await axios.get("/matches")
        console.log(res.data)
        setMatches(res.data)
        setLoading(false)
      }
      catch(error){
        console.log(error.message)
        setLoading(false)
      }
    }
    getData();
  },[])

  //Renderizo cada vez que selectedMatches cambie (que haya filtros)
  useEffect(()=>{

  },[selectedMatches])

  let matchdays = []
  if(matches){
    matches.map((match)=> matchdays.push(match.matchday))
    matchdays = matchdays.filter((value, index)=>{
      return matchdays.indexOf(value) === index;
    })
    matchdays.sort((a,b)=> a - b);
  }
  

  const handleChange = (e) =>{
    matches && setSelectedMatches(matches.filter((match)=> match.matchday === e.target.value))
  }

  const listMatches = () =>{
    if(selectedMatches){
      return(
        selectedMatches.map((match)=>{
          return(
          <div className='matchCard' key={match.id}>
            <h4 className='group'>Group {match.group}</h4>
            <div className='matchTeamNames'>
              <h4>{match.home_team_en}</h4>
              <h4>{match.away_team_en}</h4>
            </div>
            <div className='matchFlags'>
              <div className='matchLocalFlag'><img src={match.home_flag}/></div>
              <div className='matchCenterArea'>
                <h3 className='matchElapsedTime'>{match.time_elapsed}</h3>
                  <div className='matchScore'>
                    <h1 className='localScore'>{match.home_score}</h1><h1>-</h1><h1 className='awayScore'>{match.away_score}</h1>
                  </div>
              </div>
              <div className='matchAwayFlag'><img src={match.away_flag}/></div>
            </div>
            <div className='matchScorers'>
              <ul className='localScorers'>
                {
                match.home_scorers[0] == 'null' ? <li style={{listStyle:'none'}}></li> : match.home_scorers.map((scorer)=><li key={match._id}>{scorer}</li>)
                }
              </ul>
              <ul className='awayScorers'>
                {match.away_scorers[0] == 'null' ? <li style={{listStyle:'none'}}></li> : match.away_scorers.map((scorer)=><li key={match._id}>{scorer}</li>)}
              </ul>
            </div>
          </div>)
        })
      )
    }else{
      return(
        (matches.filter((match)=> match.matchday === '1')).map((match)=>{
          return(
          <div className='matchCard' key={match.id}>
            <h4>Group {match.group}</h4>
            <div className='matchTeamNames'>
              <h4>{match.home_team_en}</h4>
              <h4>{match.away_team_en}</h4>
            </div>
            <div className='matchFlags'>
              <div className='matchLocalFlag'><img src={match.home_flag}/></div>
              <div className='matchCenterArea'>
              <h3 className='matchElapsedTime'>{match.time_elapsed}</h3>
                <div className='matchScore'>
                  <h1 className='localScore'>{match.home_score}</h1><h1>-</h1><h1 className='awayScore'>{match.away_score}</h1>
                </div>
              </div>
              <div className='matchAwayFlag'><img src={match.away_flag}/></div>
            </div>
            <div className='matchScorers'>
              <ul className='localScorers'>
                {
                match.home_scorers[0] == 'null' ? <li style={{listStyle:'none'}}></li> : match.home_scorers.map((scorer)=><li key={match._id}>{scorer}</li>)
                }
              </ul>
              <ul className='awayScorers'>
                {match.away_scorers[0] == 'null' ? <li style={{listStyle:'none'}}></li> : match.away_scorers.map((scorer)=><li key={match._id}>{scorer}</li>)}
              </ul>
            </div>
          </div>)
        })
      )
    }
  }

  return (
    <div className='matchContainer'>
      <nav style={{
        display : 'flex',
        justifyContent: 'center',
        margin: '1rem'
      }}>
        <h3 style={{margin:'0 1rem'}}>Filtrar por dia</h3>
        <select onChange={handleChange} style={{fontFamily:'Qatar2022', fontSize: '16px'}}>
          {
            matchdays.length ? matchdays.map((match)=>{
              return(
                <option key={match} value={match}>{match}</option>
              )
            }) : <option>Cargando...</option>
          }
        </select>
      </nav>  
      {matches ? listMatches() : <Loading/>}
    </div>
  )
}

export default Matches