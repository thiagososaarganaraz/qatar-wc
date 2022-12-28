const axios = require('axios')
const url = 'http://api.cup2022.ir/api/v1'

let data = []

const getToken = async () =>{
  //VALIDACION
  try {
    response = await axios.post(url+'/user/login', {
      "email": "ts.facebook.ts@gmail.com",
      "password": "12345678"
    })
    //Almaceno el token
    return response.data.data.token
    
    // //Limpio el array data inicialmente
    // data = []
    
    // //Invoco los getters con el token para traer los datos
    // await getTeams(token)
    // await getMatches(token)
    // await getStandings(token)
    
    // //Envío la data por el res
    // console.log(data.length)

    // //Limpio el array
    // data = []
  
  } catch (error) {
    throw error;
  }
}

//TRAER TODOS LOS EQUIPOS
const getTeams = async (req, res) => {
  let token = await getToken();
  try {
    let response = await axios.get(url+'/team', {
      headers: {
        "Authorization" : "Bearer "+token,
        "Content-Type" : "application/json"
      }
    })

      res.json(response.data.data)
      console.log('teams')

  } catch (error) {
    console.log('en TEAMS\n'+error.message)
  }
};

const getMatches = async (req, res) =>{
  let token = await getToken();
  try {
    let response = await axios.get(url+'/match', {
      headers: {
        "Authorization" : "Bearer "+token,
        "Content-Type" : "application/json"
      }
    })

      res.json(response.data.data)
      console.log('matches')
      
  } catch (error) {
    console.log('en MATCHES\n'+error.message)
  }
}

const getStandings = async (req, res) =>{
  let token = await getToken();
  try {
    let response = await axios.get(url+'/standings', {
      headers: {
        "Authorization" : "Bearer "+token,
        "Content-Type" : "application/json"
      }
    })

      res.json(response.data.data)
      console.log('standings')
      
  } catch (error) {
    console.log('en STANDINGS\n'+error.message)
  }
}

module.exports = {getTeams, getMatches, getStandings}