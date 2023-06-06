import { serverHttp } from './http.js';
import './websocket.js';

serverHttp.listen(3000, () => console.log('Listening on PORT 3000'));
