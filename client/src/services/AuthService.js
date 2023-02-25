import $api from "../http";

export default class AuthService {
    static async login(nickname, password){
        return $api.post('/login', {nickname, password}).then((response) => {
            const items = response.data;
            console.log(response.data)
            return items;
        })
        .catch((err) => console.log(err));;
    }

    static async registration(nickname, password) {
        return $api.post('/registration', {nickname, password}).then((response) => {
            console.log(response)
            const items = response.data;
            return items;
        })
        .catch((err) => console.log(err));;
    }

}

