import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../snippets/Loading";
import "../styles/standings.css";

function Standings() {
  const [standings, setStandings] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Pido los datos al renderizar por primera vez
    async function getData() {
      try {
        let res = await axios.get("/standings");
        console.log(res.data);
        setStandings(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }
    getData();
  }, []);

  //Renderizo cada vez que selected cambie (que haya un filtro)
  useEffect(() => {}, [selected]);

  //Algoritmo para ordenar las tablas por puntos
  let sorted = [];
  standings &&
    standings.map((stand) =>
      sorted.push(
        stand.teams.sort((a, b) => {
          if (a.pts > b.pts) return -1;
          //Si los puntos son iguales, entonces ordenar por diferencia de gol
          if (a.pts === b.pts && a.gd > b.gd) return -1;
        })
      )
    );

  //Funcion para listar las tablas
  const listStandings = () => {
    //Si existe un filtro, entonces listar tablas con ese filtro
    if (selected) {
      return selected.map((e) => {
        return (
          <div className="standingCard" key={`div${e.group}`}>
            <h3
              style={{ textAlign: "center", margin: "5px" }}
            >{`Grupo ${e.group}`}</h3>
            <table key={e.group}>
              <thead>
                <tr>
                  <th>Equipo</th>
                  <th>GF</th>
                  <th>GC</th>
                  <th>DG</th>
                  <th>PG</th>
                  <th>PP</th>
                  <th>PJ</th>
                  <th>Pts</th>
                </tr>
              </thead>
              {e.teams.map((team) => {
                return (
                  <tbody>
                    <tr key={team.id}>
                      <td>
                        <img src={team.flag} /> {team.name_en}
                      </td>
                      <td>{team.gf}</td>
                      <td>{team.ga}</td>
                      <td>{team.gd}</td>
                      <td>{team.w}</td>
                      <td>{team.l}</td>
                      <td>{team.mp}</td>
                      <td>{team.pts}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        );
      });
    } else {
      //De lo contrario, listar todas las tablas :)
      return standings.map((e) => {
        return (
          <div className="standingCard" key={`div${e.group}`}>
            <h3
              style={{ textAlign: "center", margin: "5px" }}
            >{`Grupo ${e.group}`}</h3>
            <table key={e.group}>
              <thead>
                <tr>
                  <th>Equipo</th>
                  <th>GF</th>
                  <th>GC</th>
                  <th>DG</th>
                  <th>PG</th>
                  <th>PP</th>
                  <th>PJ</th>
                  <th>Pts</th>
                </tr>
              </thead>
              {e.teams.map((team) => {
                return (
                  <tbody key={team.team_id}>
                    <tr>
                      <td>
                        <img src={team.flag} /> {team.name_en}
                      </td>
                      <td>{team.gf}</td>
                      <td>{team.ga}</td>
                      <td>{team.gd}</td>
                      <td>{team.w}</td>
                      <td>{team.l}</td>
                      <td>{team.mp}</td>
                      <td>{team.pts}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        );
      });
    }
  };

  const handleSelection = (e) => {
    standings &&
      setSelected(standings.filter((stand) => stand.group === e.target.value));
  };

  return (
    <div className="container" style={{ fontFamily: "Qatar2022" }}>
      <nav className="standings-nav">
        <h4>Filtrar por grupo </h4>
        <select
          onChange={handleSelection}
          style={{
            margin: "auto 1rem",
            fontFamily: "Qatar2022",
            fontSize: "18px",
          }}
        >
          {!loading ? (
            standings.map((e) => {
              return <option key={e.group}>{e.group}</option>;
            })
          ) : (
            <option>Cargando...</option>
          )}
        </select>
        <button
          style={{
            fontSize: "20px",
            margin: "0 1rem",
            backgroundColor: "#03090F",
            color: "white",
            border: "0.5px solid #999",
            cursor: "pointer",
          }}
          onClick={() => setSelected(null)}
        >
          Mostrar todos
        </button>
      </nav>
      <div className="standingsContainer">
        {!loading ? listStandings() : <Loading />}
      </div>
    </div>
  );
}

export default Standings;
