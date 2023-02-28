import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import {API_URL} from "../http";
import axios from "axios";

export default class Store {
    user;
    isLoading;
    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async login(nickname, password) {
        try {
            const response = await AuthService.login(nickname, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(nickname, password) {
        try {
            const response = await AuthService.registration(nickname, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}
