// Setup server
import http from 'http';
import app from './app';

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
