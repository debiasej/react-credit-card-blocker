
const baseUrl = "http://demo9087061.mockable.io/";

var httpGet = function(url, callback) {

  let requestData = { url: url, params: {} };
  httpRequest(requestData, data => { callback(data) });
}

var httpPost = function(url, data, callback) {

  let requestData = {
    url: url,
    params: {
      method: 'post',
  	  body: data
    }
  };
  httpRequest(requestData, data => { callback(data) });
}

var httpRequest = function fetchUrl(requestData, callback) {

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

var fetchStatus = function (cardId, callback) {

  httpGet(`${baseUrl}ValidarBloqueoDesbloqueoTarjetas`, data => {
    callback(data.isBlocked );
  });
}

export { httpRequest as default, httpGet, httpPost }
