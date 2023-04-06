import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import {API_URL} from "../http";
import axios from "axios";

export default class Store {
    user;
    isAuthorized;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.user = user;
    }

    async login(nickname, password) {
        try {
            const response = await AuthService.login(nickname, password);
            localStorage.setItem('token', response.accessToken);
            this.setUser(response.user);
            return true;
        } catch (e) {
            console.log(e.response?.message);
        }
    }

    async registration(nickname, password) {
        try {
            const response = await AuthService.registration(nickname, password);
            localStorage.setItem('token', response.accessToken);
            this.setUser(response.user);
        } catch (e) {
            console.log(e.response?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.accessToken);
            this.setUser(response.user);
            this.isAuthorized = true;
        } catch (e) {
            console.log(e.response?.message);
        }
    }
}
