import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../css/Home.css";

const Home = () => {
    const apiUrl = 'http://localhost:3001/home';
    const [teamId, setTeamId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiUrl, { teamId });
            if (response.status === 200) {
                setTeamId('');
                navigate(`/about/${teamId}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box width="50%" margin="auto">
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                        <div className='home-header'>
                                Fantasy Premier League
                        </div>
                        <div className='home-subheader'>
                            Enter your team ID to view your team details
                        </div>
                        <div className='home-input'>
                            <input type="text" value={teamId} onChange={(e) => setTeamId(e.target.value)} placeholder="Enter your team ID"/>
                        </div>
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <button type="submit" variant="contained" color="primary">
                                Submit
                            </button>
                        </Box>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
