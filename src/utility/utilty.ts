import jwt from 'jsonwebtoken';

function getToken(authHeader: string | undefined) {
    let token: string | null = null;

    if (authHeader) {
        // first part is Bearer. second part is the token
        token = authHeader.split(' ')[1];
    }

    return token
}

function verifyToken(
    token: string, 
    authenticated: () => void, 
    unaothorized: () => void) 
{
    jwt.verify(token, process.env.TOKEN as string, (error, payload) => {
        if (error) {
            unaothorized()
        }
        
        authenticated();
    })
}

export {
    getToken,
    verifyToken
}