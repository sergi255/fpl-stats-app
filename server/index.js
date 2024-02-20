const express = require('express');
const app = express();
const port = 3001;

const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,           
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', createProxyMiddleware({ target: 'https://fantasy.premierleague.com', changeOrigin: true }));

app.post('/home', async (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: 'Team ID received' });
});

app.get('/about/:teamId', async (req, res) => {
    const teamId = req.params.teamId;
    try {
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching team data' });
    }
});

app.get('/about/:teamId/:gameweek', async (req, res) => {
    const teamId = req.params.teamId;
    const gameweek = req.params.gameweek;
    try {
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching team data' });
    }
});

const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    });
