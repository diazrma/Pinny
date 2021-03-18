
'use strict'

let tokenStorage = localStorage.getItem('token');

const data = {

  token: tokenStorage
}
axios.post('http://localhost:3001/api/login/authenticate/', data, {

  headers: { 'x-access-token': tokenStorage }

}).then(function (response) {
  let auth = response.data.auth;
  if (auth === true) {

    window.location.href = "http://localhost:3000/dashboard"
  }
});

axios
  .create({ baseURL: "http://localhost:3001" })
  .get('/api')
  .then(function (response) {
    console.log(response.data);
  });

$("#login-form").submit(function (event) {
  event.preventDefault();

  let username = $('#username').val();
  let password = $('#password').val();
  let remember = $('#remember').val();
  

  axios
    .post('http://localhost:3001/api/login/', {
      username: username,
      password: password,
      remember: remember
    })
    .then(function (response) {

      let auth = response.data.auth;
      let token = response.data.token;
      let remember = response.data.remember;

      if (auth === true && remember === true) {

        localStorage.setItem('token', token);
        window.location.href = 'dashboard';

      }

      if (auth === true) {

        window.location.href = 'dashboard';
      }

    });
});