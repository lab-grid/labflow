import { Auth0ClientOptions } from "@auth0/auth0-spa-js";

export type LabflowAuthProvider = 'none' | 'auth0';

export const auth0Scopes = [
    'read:runs',
    'read:protocols',
    'write:runs',
    'write:protocols',
];

export interface LabflowOptions {
    authProvider: LabflowAuthProvider;
    apiURL: string;

    // Auth type options
    auth0Options?: Auth0ClientOptions;

    // Google Analytics config
    measurementId?: string;
}

export const labflowOptions: LabflowOptions = {
    authProvider: parseAuthProvider(),
    apiURL: parseAPIURL(),

    auth0Options: parseAuth0Options(),

    measurementId: parseMeasurementId(),
};


function getEnv(envVar: string, defaultValue?: string): string | undefined {
    if (window.runtime && runtime[envVar]) {
        return runtime[envVar];
    }
    if (process && process.env && process.env[envVar]) {
        return process.env[envVar];
    }
    return defaultValue;
}


// Parse function helpers
function parseAuthProvider(): LabflowAuthProvider {
    switch (getEnv('REACT_APP_AUTH_PROVIDER')) {
        case 'auth0':
            return 'auth0';
        case 'none':
        case '':
        case null:
        case undefined:
            return 'none';
        default:
            throw new Error('Please provide either "auth0" or "none" to the environment variable "REACT_APP_AUTH_TYPE"');
    }
}

function parseAPIURL(): string {
    const apiURL = getEnv('REACT_APP_API_URL');
    if (!apiURL) {
        throw new Error('Please provide a value for the environment variable "REACT_APP_API_URL"');
    }

    return apiURL;
}

function parseAuth0Options(): Auth0ClientOptions | undefined {
    switch (parseAuthProvider()) {
        case 'auth0':
            const domain = getEnv('REACT_APP_AUTH0_DOMAIN');
            const client_id = getEnv('REACT_APP_AUTH0_CLIENT_ID');
            const redirect_uri = window.location.origin;
            const audience = getEnv('REACT_APP_AUTH0_API_AUDIENCE');
            const scope = auth0Scopes.join(' ');
            if (!domain) {
                throw new Error('Please provide a value for the environment variable "REACT_APP_AUTH0_DOMAIN"');
            }
            if (!client_id) {
                throw new Error('Please provide a value for the environment variable "REACT_APP_AUTH0_CLIENT_ID"');
            }
            if (!audience) {
                throw new Error('Please provide a value for the environment variable "REACT_APP_AUTH0_AUDIENCE"');
            }

            return {
                domain,
                client_id,
                redirect_uri,
                audience,
                scope,
                // onRedirectCallback={onRedirectCallback}
                // WARNING: Storing tokens in the browsers localstorage has some unfortunate security
                //          implications: https://auth0.com/docs/tokens/concepts/token-storage#browser-local-storage-scenarios
                cacheLocation: 'localstorage',
            };
        default:
            return;
    }
}

function parseMeasurementId(): string | undefined {
    return getEnv('REACT_APP_MEASUREMENT_ID');
}
