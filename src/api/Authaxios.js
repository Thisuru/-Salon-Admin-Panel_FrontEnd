import axios from "axios";

const AuthService = axios.create({
    timeout: 60000,
    headers: {
        'Authorization': `jwt ${localStorage.getItem('token')}`
    }
});

export default AuthService