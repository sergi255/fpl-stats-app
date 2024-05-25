import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatISODate } from "../assets/dateUtils.js";
import { Link } from "react-router-dom";


const Gameweek = () => {
    const { teamId, gameweek } = useParams();
    const [picks, setPicks] = useState([]);
    const [GW, setGW] = useState({});
    const [playersInfo, setPlayersInfo] = useState({});
    const [liveData, setLiveData] = useState({});

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`/api/entry/${teamId}/event/${gameweek}/picks/`);
            setPicks(response.data.picks);
            setGW(response.data.entry_history);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [teamId, gameweek]);

    const fetchLiveData = useCallback(async () => {
        try {
          const response = await axios.get(`/api/event/${gameweek}/live/`);
          const liveElements = response.data.elements;
          const liveDataMapping = {};
          liveElements.forEach((element, index) => {
            liveDataMapping[index + 1] = element;
          });
          setLiveData(liveDataMapping);
        } catch (error) {
          console.error(error);
        }
      }, [gameweek]);

    const fetchPlayerData = useCallback(async () => {
      try {
        const response = await axios.get(`/api/bootstrap-static/`);
        const players = response.data.elements;
        const playersMapping = {};
        players.forEach(player => {
          playersMapping[player.id] = {
            name: player.web_name,
            team: player.team,
            position: player.element_type,
          };
        });
        setPlayersInfo(playersMapping);
        console.log(playersMapping);
      } catch (error) {
        console.error(error);
      }
    }, []);

    useEffect(() => {
        fetchPlayerData();
        fetchData();
        fetchLiveData();
      }, [fetchPlayerData, fetchData, fetchLiveData]);


      return (
        <div>
          <h1>Team {teamId} Gameweek {gameweek}</h1>
          <Link to={`/about/${teamId}`}>Back to Team {teamId}</Link>
          <ul>
            {picks.map((pick) => {
              const playerInfo = playersInfo[pick.element];
              const livePlayerData = liveData[pick.element];
              return (
                <li key={pick.element}>
                  <p>{playerInfo?.name || "Loading..."}</p>
                  <p>Team: {playerInfo?.team || "Loading..."}</p>
                  <p>Position: {playerInfo?.position || "Loading..."}</p>
                  <p>Multiplier: {pick.multiplier}</p>
                  <p>Captain: {pick.is_captain ? "Yes" : "No"}</p>
                  <p>Vice Captain: {pick.is_vice_captain ? "Yes" : "No"}</p>
                  <p>Points: {livePlayerData ? livePlayerData.stats.total_points : "Loading..."}</p>
                </li>
              );
            })}
          </ul>
          <p>Points: {GW.points}</p>
        </div>
      )
    }

export default Gameweek