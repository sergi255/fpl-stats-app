import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/About.css";
import { formatISODate } from "../assets/dateUtils.js";
import { Link } from "react-router-dom";
const Gameweek = () => {

  const { teamId, gameweek } = useParams();

  const [gameweekData, setGameweekData] = useState({
    entryHistory: "" ,
  });
  
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/entry/${teamId}/event/${gameweek}/picks`);
      const { 
        entry_history 
      } = response.data; 
      setGameweekData({
        entryHistory: entry_history,
      });
    } catch (error) {
      console.error(error);
    }
  }, [teamId, gameweek]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  useEffect(() => {
    console.log(gameweekData.entryHistory);
  }, [gameweekData]);
  

  return (
    <div>
      <h1> Team ID: {teamId} </h1>
      <h1>Gameweek {gameweek} </h1>
      <h2>Points: {gameweekData.entryHistory.points}</h2>
      <h2>Total Points: {gameweekData.entryHistory.total_points}</h2>
      <h2>Rank: {gameweekData.entryHistory.rank}</h2>
      <h2>Overall Rank: {gameweekData.entryHistory.overall_rank}</h2>
      <h2>Event Transfers: {gameweekData.entryHistory.event_transfers}</h2>
      <h2>Event Transfers Cost: {gameweekData.entryHistory.event_transfers_cost}</h2>
      <h2>Points on Bench: {gameweekData.entryHistory.points_on_bench}</h2>
    </div>
  );
  };

export default Gameweek;
