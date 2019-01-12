import { createLogger } from 'redux-logger';
const logger = createLogger();
import thunk from 'redux-thunk';
import firewall from './firewall';

export default [
    thunk,
    logger,
    firewall
]
