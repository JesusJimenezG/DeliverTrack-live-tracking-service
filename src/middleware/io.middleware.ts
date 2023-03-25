import { Server } from 'socket.io';
import cookie from 'cookie';
import { verifyToken } from 'session-authentication-middleware/utils/jwt.handler';
import { hashString } from 'session-authentication-middleware/utils/encrypt.handler';

const jwt_secret = process.env.JWT_SECRET || 'secret';

export const IOMiddleware = (io: Server) =>
    io.use((socket, next) => {
        // Get the token from the Authorization header
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Token is missing'));
        }

        // Verify the token and extract the user context
        let decodedToken;
        try {
            decodedToken = verifyToken(token, jwt_secret);
        } catch (err) {
            return next(new Error('Invalid token'));
        }

        const fingerprint = decodedToken.fingerprint;

        // Get the cookie and compare it with the hashed user context
        const cookies = socket.handshake.headers.cookie;
        const parsedCookies = cookie.parse(cookies as string);
        const session_fingerprint = parsedCookies.fingerprint;

        const hash = hashString(session_fingerprint);
        if (hash !== fingerprint) {
            return next(new Error('Invalid session_fingerprint'));
        }

        return next();
    });
