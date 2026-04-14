import axios from "axios";

const API = "http://localhost:3000/api/auth"; // ✅ cleaner base URL


export async function register({ username, email, password }) {
    try {
        const response = await axios.post(
            `${API}/register`,   // ✅ FIXED (was login ❌)
            { username, email, password },
            { withCredentials: true }
        );

        return response.data;
    } catch (err) {   // ✅ FIXED variable name
        console.log(err);
    }
}

export async function login({ email, password }) {
    try {
        const response = await axios.post(
            `${API}/login`,   // ✅ FIXED (was register ❌)
            { email, password },
            { withCredentials: true }
        );

        return response.data;
    } catch (err) {
        console.log(err);
    }
}


export async function logout() {
    try {
        const response = await axios.get(
            `${API}/logout`,
            { withCredentials: true }
        );

        return response.data;
    } catch (err) {
        console.log(err);
    }
}
export async function getMe() {
    try {
        const response = await axios.get(
            `${API}/get-me`,
            { withCredentials: true }
        );

        return response.data;
    } catch (err) {
        console.log(err);
    }
}