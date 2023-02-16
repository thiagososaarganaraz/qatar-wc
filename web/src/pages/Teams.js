import { React, useEffect, useState } from "react";
import axios, { Axios } from "axios";
import teamStyle from "../styles/teams.css";
import Loading from "../snippets/Loading";

function Teams() {
  let letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const [teams, setTeams] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    //Pido los datos al renderizar por primera vez
    const source = axios.CancelToken.source();

    async function getData() {
      try {
        let res = await axios.get("/teams", { cancelToken: source.token });
        console.log(res.data);
        setTeams(res.data);
        teams && teams.filter((item, index) => teams.indexOf(item) === index);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
    getData();

    return () => {
      source.cancel();
    };
  }, []);

  //Renderizo cada vez que selectedTeams cambie (que haya filtro)
  useEffect(() => {}, [selectedTeams]);

  const handleChange = (e) => {
    teams &&
      setSelectedTeams(teams.filter((team) => team.groups === e.target.value));
  };

  //Funcion para listar los equipos
  const listTeams = () => {
    //Si existe selectedTeams me muestra los equipos filtrados por grupo
    if (selectedTeams) {
      return (
        <div className="container-filtered">
          <h2>Grupo {selectedTeams[0].groups}</h2>
          <div className="container-team">
            {selectedTeams.map((team) => {
              return (
                <div key={team.id} className="teamCard">
                  <a key={team.id}>{team.name_en}</a>
                  <div className="teamFlag">
                    <img src={team.flag} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      //De lo contrario, me muestra todos los equipos
      return (
        <div className="container-all">
          {teams?.map((team) => {
            return (
              <div className="teamCard" key={team.id} style={noFlag(team.flag)}>
                <a key={team.id} className="teamName">
                  {team.name_en}
                </a>
                <div className="teamFlag">
                  <img src={team.flag} />
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  let noFlag = (flag) => {
    if (!flag) return { display: "none" };
  };

  return (
    <div>
      <nav className="teams-nav">
        <h3
          style={{
            fontFamily: "Qatar2022",
            fontSize: "20px",
            margin: "0 1rem",
          }}
        >
          Filtrar por grupo
        </h3>
        <select
          onChange={handleChange}
          style={{
            fontSize: "20px",
            fontFamily: "Qatar2022",
          }}
        >
          {teams ? (
            letters.map((group) => {
              return (
                <option
                  key={group}
                  value={group}
                  style={{ fontFamily: "Qatar2022" }}
                >
                  {group}
                </option>
              );
            })
          ) : (
            <option>Loading...</option>
          )}
        </select>
        <button className="showBtn" onClick={() => setSelectedTeams(null)}>
          Mostrar todos
        </button>
      </nav>
      {!loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "Qatar2022",
          }}
        >
          {listTeams()}
        </div>
      ) : (
        <Loading />
      )}
      {error ? <h1>No se pudo conectar con el servidor.</h1> : <></>}
    </div>
  );
}

export default Teams;
