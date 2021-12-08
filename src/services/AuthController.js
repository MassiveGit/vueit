// Exported in a shared file
import ApiInteractions from "./ApiInteractions";

const loginRoutine = user => new Promise ((resolve, reject) => {
    ApiInteractions.postSignin(user)
        .then(resp => {
            const token = resp.data.token
            localStorage.setItem('user-token', token) // store the token in localstorage
            resolve(resp)
        })
        .catch(err => {
            localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
            reject(err)
        })
})