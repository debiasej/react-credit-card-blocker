import appUrls from '../config/urls';

// API

let getCards = function (callback) {
  httpGet(`${appUrls.baseUrl}${appUrls.cards}`, (responseData) => {
    callback(responseData);
  });
}

let postCheckIfCardIsBlockedOrUnBlocked = function (cardId, callback) {
  httpPost(`${appUrls.baseUrl}${appUrls.checkIfCardIsBlockedOrUnBlocked}`, cardId, (responseData) => {
    callback(responseData);
  });
}

let postUnblockCard = function (requestData, callback) {
  httpPost(`${appUrls.baseUrl}${appUrls.unblockCard}`, requestData, (responseData) => {
    callback(responseData);
  });
}

let postBlockCard = function (requestData, callback) {
  httpPost(`${appUrls.baseUrl}${appUrls.blockCard}`, requestData, (responseData) => {
    callback(responseData);
  });
}

// Generic requests

let httpGet = function(url, callback) {
  let requestData = { url: url, params: {} };
  httpRequest(requestData, responseData => { callback(responseData) });
}

let httpPost = function(url, data, callback) {
  let requestData = {
    url: url,
    params: {
      method: 'post',
  	  body: data
    }
  };
  httpRequest(requestData, responseData => { callback(responseData) });
}

let httpRequest = function fetchUrl(requestData, callback) {
  fetch(requestData.url, requestData.params)
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(function(responseData) {
    callback(responseData);
  })
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
  });
}

let appHttp = {getCards, postCheckIfCardIsBlockedOrUnBlocked, postUnblockCard, postBlockCard};
export default appHttp;
