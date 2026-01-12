const path = require('path');
const fs = require('fs');

function hydrateEnv() {
    const rootEnvPath = path.resolve(__dirname, '../../.env');

    if (fs.existsSync(rootEnvPath)) {
        require('dotenv').config({ path: rootEnvPath });
    }

    if (!process.env.REACT_APP_API_URL) {
        const apiBase = process.env.API_BASE_URL || process.env.BACKEND_URL || process.env.VITE_API_BASE_URL;
        if (apiBase) {
            process.env.REACT_APP_API_URL = apiBase;
        }
    }

    if (!process.env.REACT_APP_API_URL) {
        process.env.REACT_APP_API_URL = 'http://localhost:5000';
    }

    if (!process.env.CLIENT_ORIGIN) {
        process.env.CLIENT_ORIGIN = process.env.REACT_APP_CLIENT_ORIGIN || 'http://localhost:3000';
    }
}

module.exports = hydrateEnv;
