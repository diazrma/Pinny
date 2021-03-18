'use strict'
let tokenStorage = localStorage.getItem('token');

const data = {

  token: tokenStorage
}
axios.post('http://localhost:3001/api/login/authenticate/', data, {

  headers: { 'x-access-token': tokenStorage }

}).then(function (response) {
  let auth = response.data.auth;
  
  if (auth === false) {

    window.location.href = "http://localhost:3000/"
  }
});