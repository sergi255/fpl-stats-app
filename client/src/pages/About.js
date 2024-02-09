import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../css/About.css";
import { formatISODate } from "../assets/dateUtils.js";

const About = () => {
    const { teamId } = useParams();
    const [playerData, setPlayerData] = useState({
        playerName: '',
        playerLastName: '',
        teamName: '',
        region: '',
        overall_points: '',
        overall_rank: '',
        region_code: '',
    });

    const [seasonData, setSeasonData] = useState({
        current: [],
        chips: [],
        past: [],
    });

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`/api/entry/${teamId}`);
            const { player_first_name, player_last_name, name, player_region_name, summary_overall_points, summary_overall_rank, player_region_iso_code_short
            } = response.data;
            setPlayerData({
                playerName: player_first_name,
                playerLastName: player_last_name,
                teamName: name,
                region: player_region_name,
                overall_points: summary_overall_points,
                overall_rank: summary_overall_rank,
                region_code: player_region_iso_code_short,
            });
            // console.log(response);
        } catch (error) {
            console.error(error);
        }
    }, [teamId]);

    const fetchSeason = useCallback(async () => {
        try {
            const response = await axios.get(`/api/entry/${teamId}/history`);
            const { current, chips, past } = response.data;
            
            const transformedChips = chips.map(chip => ({
                event: chip.event,
                name: chip.name,
                time: chip.time,
            }));

            const transformedPasts = past.map(item => ({
                season_name: item.season_name,
                total_points: item.total_points,
                rank: item.rank,
            }));

            const transformedData = current.map(item => ({
                event: item.event,
                points: item.points,
                points_on_bench: item.points_on_bench,
                total_points: item.total_points,
                overall_rank: item.overall_rank,
                gw_rank: item.rank_sort,
                event_transfers: item.event_transfers,
                event_transfers_cost: item.event_transfers_cost,
                value: item.value,
            }));
    
            setSeasonData({
                current: transformedData,
                chips: transformedChips,
                past: transformedPasts,
            });

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }, [teamId]);
    

    function addThousandSeparator(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function convertChipName(name) {
        if (name === "3xc") {
            return "Triple Captain";
        }
        else if (name === "wildcard") {
            return "Wildcard";
        }
        else if (name === "bboost") {
            return "Bench Boost";
        } 
        else {
            return name;
        }
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]); 

    useEffect(() => {
        fetchSeason();
    }, [fetchSeason]);

    return (
        <div className="about-container">
            <div className="info-container">
                <div className="personal-data">
                    <div className="left-element">
                        <p className="info-item-player">{playerData.playerName} {playerData.playerLastName}</p>
                        <p className="info-item-team">{playerData.teamName}</p>
                    </div>
                    <div className="right-element">
                        <img src={`https://flagcdn.com/w80/${playerData.region_code.toLowerCase()}.png`} width="80" alt={playerData.region} />
                    </div>
                </div>
                <div className="team-data">
                    <ul>
                        <li>
                            <span className="info-item">Team ID</span>
                            <span className="info-value">{teamId}</span>
                        </li>
                        <li>
                            <span className="info-item">Overall points</span>
                            <span className="info-value">{playerData.overall_points}</span>
                        </li>
                        <li>
                            <span className="info-item">Overall rank</span>
                            <span className="info-value">{addThousandSeparator(playerData.overall_rank)}</span>
                        </li>
                    </ul>
                </div>
                <div className="chips-container">
                    <h2>Chips</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Chip</th>
                                <th>Event</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {seasonData.chips.map(chip => (
                                <tr key={chip.event}>
                                    <td>{formatISODate(chip.time)}</td>
                                    <td>{convertChipName(chip.name)}</td>
                                    <td>GW{chip.event}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="past-seasons">
                    <h2>Past seasons</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Season Name</th>
                                <th>Total Points</th>
                                <th>Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {seasonData.past.slice().reverse().map(season => (
                                <tr key={season.season_name}>
                                    <td>{season.season_name}</td>
                                    <td>{season.total_points}</td>
                                    <td>{addThousandSeparator(season.rank)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="detail-container">
                <h2>This season</h2>
                <div className="gameweek-data">
                    <table>
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Points</th>
                                <th>Bench Points</th>
                                <th>Total Points</th>
                                <th>Rank</th>
                                <th>GW Rank</th>
                                <th>Transfers</th>
                                <th>Hits</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {seasonData.current.slice().reverse().map((week, index, array) => {
                                const prevWeek = array[index + 1];
                                const isRankLower = prevWeek && week.overall_rank < prevWeek.overall_rank;
                                const rowClassName = prevWeek ? (isRankLower ? 'green-row' : 'red-row') : (index === array.length - 1 ? 'green-row' : '');

                                return (
                                <tr key={index} className={rowClassName}>
                                    <td>GW{week.event}</td>
                                    <td>{week.points}</td>
                                    <td>{week.points_on_bench}</td>
                                    <td>{week.total_points}</td>
                                    <td>{week.overall_rank}</td>
                                    <td>{week.gw_rank}</td>
                                    <td>{week.event_transfers}</td>
                                    <td>{week.event_transfers_cost}</td>
                                    <td>{week.value}</td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
    
};

export default About;
