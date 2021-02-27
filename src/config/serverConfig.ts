var helmet = require('helmet');
import express from 'express';

function configServerMiddlewares(app: express.Application) {
    app.use(helmet({contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
}

/**
 * should be run before any environment calls
 */
function config() {
    if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config();
    }
}
config();

export default configServerMiddlewares;