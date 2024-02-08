import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const About = () => {
    const { teamId } = useParams();
    const [playerData, setPlayerData] = useState({
        playerName: '',
        playerLastName: '',
        teamName: '',
        region: '',
        overall_points: '',
        overall_rank: '',
    });

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`/api/entry/${teamId}`);
            const { player_first_name, player_last_name, name, player_region_name, summary_overall_points, summary_overall_rank} = response.data;
            setPlayerData({
                playerName: player_first_name,
                playerLastName: player_last_name,
                teamName: name,
                region: player_region_name,
                overall_points: summary_overall_points,
                overall_rank: summary_overall_rank,
            });
        } catch (error) {
            console.error(error);
        }
    }, [teamId]); 

    useEffect(() => {
        fetchData();
    }, [fetchData]); 

    return (
        <div>
            <h1>About</h1>
            <p>Team ID: {teamId}</p>
            <p>First: {playerData.playerName}</p>
            <p>Surname: {playerData.playerLastName}</p>
            <p>Team name: {playerData.teamName}</p>
            <p>Country: {playerData.region}</p>
            <p>Overall points: {playerData.overall_points}</p>
            <p>Overall rank: {playerData.overall_rank}</p>
        </div>
    );
};

export default About;
