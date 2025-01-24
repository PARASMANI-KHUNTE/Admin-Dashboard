// const WebSocket = require('ws');

// const initializeWebSocket = (server) => {
//   const wss = new WebSocket.Server({ server });

//   wss.on('connection', (ws) => {
//     console.log('New WebSocket connection established');

//     ws.on('message', (message) => {
//       console.log('Received message:', message);
//       // Broadcast the message to all connected clients
//       wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//           client.send(message);
//         }
//       });
//     });

//     ws.on('close', () => {
//       console.log('WebSocket connection closed');
//     });
//   });

//   return wss;
// };

// module.exports = initializeWebSocket;