import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
        <Box width="50%" margin="auto" fontFamily="RadikalBold">
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
                            Fantasy Premier League
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Enter your team ID to view your team details
                        </Typography>
                        <TextField 
                            fullWidth
                            type="text"
                            value={teamId}
                            onChange={(e) => setTeamId(e.target.value)}
                            label="Team ID"
                            variant="outlined"
                        />
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
