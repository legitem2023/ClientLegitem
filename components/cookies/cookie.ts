import jwt, { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';
import { setGlobalState } from 'state';

interface JwtPayload extends DefaultJwtPayload {
    user: {
        id: string;
        emailAddress: string;
        userLevel: string;
    };
}

export const cookies = () => {
    const getCookie = (cookieName: string): string | null => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(`${cookieName}=`)) {
                return cookie.substring(cookieName.length + 1);
            }
        }
        return null;
    }

    const cookie = getCookie("token");

    if (!cookie) {
        return;
    }

    const token = jwt.decode(cookie) as JwtPayload | null;

    if (!token || !token.user) {
        document.location.href = '../Management';
        return;
    }

    setGlobalState("cookieEmailAddress", token.user.emailAddress);
    setGlobalState("cookieUserLevel", token.user.userLevel);
    setGlobalState("cookieActiveUser", token.user.id);

    return {
        id: token.user.id,
        email: token.user.emailAddress,
        userlevel: token.user.userLevel,
    };
}
