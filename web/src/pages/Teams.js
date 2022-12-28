import {React, useEffect, useState} from 'react'
import axios, { Axios } from 'axios';
import teamStyle from '../styles/teams.css'
import Loading from '../snippets/Loading';

function Teams() {
  let letters = ["A","B","C","D","E","F","G","H"]
  let data = []
  let group1 = [], group2 = [], group3 = [], group4 = [], group5 = [], group6 = [], group7 = [], group8 = [];
    
  const [teams, setTeams] = useState(null)
  const [selectedTeams, setSelectedTeams] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
    //Pido los datos al renderizar por primera vez
    const source = axios.CancelToken.source()

    async function getData(){
      try{
        let res = await axios.get("/teams",{ cancelToken: source.token})
        console.log(res.data)
        setTeams(res.data)
        teams && teams.filter((item, index)=> teams.indexOf(item) === index)
        setLoading(false)
      }
      catch(error){
        console.log(error)
        setLoading(false)
      }
    }
    getData();

    return () => {
      source.cancel()
    } 
  },[])

  //Renderizo cada vez que selectedTeams cambie (que haya filtro)
  useEffect(()=>{

  },[selectedTeams])

  const handleChange = (e) =>{
    teams && setSelectedTeams(teams.filter((team)=> team.groups === e.target.value))
  }

  //Funcion para listar los equipos
  const listTeams = () =>{
    //Si existe selectedTeams me muestra los equipos filtrados por grupo
    if(selectedTeams){
      return(
        <div style={{display: 'flex', flexDirection: 'column' ,justifyContent: 'center'}}>
          <h2 style={{textAlign: 'center'}}>Grupo {selectedTeams[0].groups}</h2>
          <div style={{display: 'flex'}}>
          {
          selectedTeams.map((team)=>{
            return(
              <div key={team.id} style={{textAlign:'center', margin:'1rem'}}>
                <a key={team.id} style={{textAlign:'center'}}>{team.name_en}</a>
                <div style={{width:'125px', height: '85px'}}><img src={team.flag} style={{width: '100%', height: '100%'}}/></div>
              </div>
            )
          })
          }
          </div>
        </div>
      )
    }else{
      //De lo contrario, me muestra todos los equipos
      return(
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          width: '80%',
          margin: '0 auto'
        }}>
          {
            teams.map((team)=>{
              return(
                <div className='teamCard' key={team.id}>
                  <a key={team.id} className="teamName">{team.name_en}</a>
                  <div className='teamFlag'><img src={team.flag}/></div>
                </div>
              )
            })
          }
        </div>
      )
    }
  }

  return (
    <div>
      <nav style={{
        display : 'flex',
        justifyContent : 'center',
        margin: '1rem'
      }}>
        <h3 style={{
          fontFamily: 'Qatar2022',
          fontSize : '20px',
          margin: '0 1rem'
        }}>Filtrar por grupo</h3>
        <select onChange={handleChange} style={{
          fontSize: '20px',
          fontFamily: 'Qatar2022'
        }}>
          {
            teams ? letters.map((group)=>{
              return(
                <option key={group} value={group} style={{fontFamily: 'Qatar2022'}}>{group}</option>
              )
            }) : <option>Loading...</option>
          }
        </select>
        <button style={{
          fontSize: '20px',
          margin: '0 1rem'
        }} onClick={()=>setSelectedTeams(null)}>Mostrar todos</button>
      </nav>
        {
        !loading ? 
        <div style={{display: 'flex', justifyContent: 'center', fontFamily: 'Qatar2022'}}>
          {listTeams()}
        </div>
        : 
        <Loading/>
        }
    </div>
  )
}

export default Teams