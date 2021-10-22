import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3030'
})

export default class Api {  
    async userLogin(username, senha) {
        let r = await api.get(`/user/login/?username=${username}&senha=${senha}`)
        return r.data;
    }

    async userCreate(nmUsu, cpf, email, username, senha, nascimento) {
        let r = await api.post(`/user/create`, {nmUsu, cpf, email, username, senha, nascimento})
        return r.data;
    }

    async userForgotPassword(email) {
        let r = await api.post(`/user/forgotpassword`, {email})
        return r.data
    }

    async userChangePassword(codigo, email, senha) {
        let r = await api.post(`/user/changepassword`, {codigo, email, senha})
        return r.data;
    }

}