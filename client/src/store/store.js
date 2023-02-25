import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";

export default class Store {
    user;
    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.user = user;
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
}
