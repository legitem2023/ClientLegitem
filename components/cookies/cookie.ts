import { useMutation } from '@apollo/client';
import jwt, { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';
import { setGlobalState } from 'state';
import DataManager from 'utils/DataManager';
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

    const cookie = getCookie("clientToken");

    if (!cookie) {
        return;
    }

    const token = jwt.decode(cookie) as JwtPayload | null;

    if (!token || !token.user) {
        document.location.href = '../Login';
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

export const deletecookies = (token:any) =>{
        const setCookie = (name: string, value: string, days: number) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const deleteCookie = (name: string) => {
        // Setting the cookie with a past expiration date effectively deletes it
        setCookie(name, '', -1);
    };
    const conf = confirm("Are you sure you want to logout?");
    if(conf){
        deleteCookie(token);
        setGlobalState("cookieEmailAddress", "");
        setGlobalState("cookieUserLevel", "");
        setGlobalState("cookieActiveUser", "");
        document.location.href = '../Login';
    }
}
