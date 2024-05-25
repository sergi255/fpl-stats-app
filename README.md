# fpl-stats-app

Fpl stats app is an app created for Fantasy Premier League players. It allows you to track a player's progress throughout the season. It displays, depending on the player's points score, the promotion or relegation, the number of positions by which the ranking has changed, the percentage change in ranking and the rankings in a every gameweek. In addition to data for individual gameweeks, it also shows data for the entire season - the best/worst score, the biggest promotion and relegation, and the player's rankings in previous years. The site also shows the history of the use of “chips” (additional options offered by the game).

# Server side
This code defines a simple server application based on Node.js and the Express.js framework.  App listens on port 3001. It uses cors middleware to handle CORS requests, which allows communication between the server and a client application running on port 3000 on a local host. It also implements a proxy that redirects requests directed to the '/api' path to an external Fantasy Premier League server (https://fantasy.premierleague.com), allowing the client to access data from that source through the proxy server.

# Client side
The client application is built on React.js and uses many of the core features of the framework.  App also uses React Router to navigate between views and axios to make HTTP requests. Styling was implemented using CSS style sheets. Through the use of React hooks such as useEffect and useState, the app allows for dynamic fetching and updating of data from the server in real time. Finally, the structure and organization of the components allows intuitive navigation and convenient use of the application's functions by the user.

# Page screenshots
