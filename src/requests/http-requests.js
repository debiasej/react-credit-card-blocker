import appUrls from '../config/urls';


let getCards = function (callback) {

  httpGet(`${appUrls.baseUrl}${appUrls.cards}`, (data) => {
    callback(data);
  });
}

let postCheckIfCardIsBlockedOrUnBlocked = function (cardId, callback) {

  httpPost(`${appUrls.baseUrl}${appUrls.checkIfCardIsBlockedOrUnBlocked}`, cardId, (data) => {
    callback(data);
  });
}

let httpGet = function(url, callback) {

  let requestData = { url: url, params: {} };
  httpRequest(requestData, data => { callback(data) });
}

let httpPost = function(url, data, callback) {

  let requestData = {
    url: url,
    params: {
      method: 'post',
  	  body: data
    }
  };
  httpRequest(requestData, data => { callback(data) });
}

let httpRequest = function fetchUrl(requestData, callback) {

  fetch(requestData.url, requestData.params)
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(function(data) {
    callback(data);
  });
}

// var fetchStatus = function (cardId, callback) {
//
//   httpGet(`${baseUrl}ValidarBloqueoDesbloqueoTarjetas`, data => {
//     callback(data.isBlocked );
//   });
// }

let appHttp = {getCards, postCheckIfCardIsBlockedOrUnBlocked};

export default appHttp;
