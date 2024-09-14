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
    // Function to get a specific cookie by its name
    const getCookie = (cookieName: string): string | null => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(`${cookieName}=`)) {
                return cookie.substring(cookieName.length + 1);
            }
        }
        return null;
    };

    // Retrieve the 'clientToken' cookie which contains the array of user tokens
    const cookie = getCookie("clientToken");

    if (!cookie) {
        return;
    }

    // Parse the cookie value as an array (since it's stored as JSON)
    let userTokens: string[] = [];
    try {
        userTokens = JSON.parse(decodeURIComponent(cookie));
    } catch (error) {
        console.error("Error parsing cookie:", error);
        return;
    }

    // Iterate over each user token in the array
    for (const tokenString of userTokens) {
        const token = jwt.decode(tokenString) as JwtPayload | null;
        if (!token || !token.user) {
            // If the token is invalid, redirect to login
            document.location.href = '../Login';
            return;
        }
        // Set global state based on the user's token data
        setGlobalState("cookieEmailAddress", token.user.emailAddress);
        setGlobalState("cookieUserLevel", token.user.userLevel);
        setGlobalState("cookieActiveUser", token.user.id);
        setGlobalState("cookieArray", [token.user.emailAddress]);
        // You could also return an object if needed (optional)
        return {
            id: token.user.id,
            email: token.user.emailAddress,
            userlevel: token.user.userLevel,
        };
    }
};

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
