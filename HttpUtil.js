function HttpUtil() {
	Alloy.Globals.autoincHttpUtil ++;
	Ti.API.info("HTTPUTIL INSTANCE "+Alloy.Globals.autoincHttpUtil);
	var self = new Object();
	var httpClient = null; 
	var requestsNumber = 0; 
  // -------------------------------------------------------------------------------------------------------------------
  // request
  // -------------------------------------------------------------------------------------------------------------------
  self.request = function(url, metodo, oParametro, sucesso, erro) {
    requestsNumber++;
    // httpClient
  	var objetoEnvio = oParametro;
  	
  	if (httpClient == null){
  		Alloy.Globals.autoincHttpClient++;
  		Ti.API.info("HTTPCLIENT INSTANCE "+Alloy.Globals.autoincHttpClient);
  		httpClient  = Ti.Network.createHTTPClient({
  			timeout : 90000,
  			cache   : false
  		});
  		httpClient.open(metodo, url);
	 }
	 
	// httpClient.enableKeepAlive = true;
	 	   
	// onload
	 httpClient.onload = function(e){
	 	Alloy.Globals.sucessoHttpUtil ++;
	 	Ti.API.info("SUCESSO REQUEST "+requestsNumber);
	 	sucesso(this);
	 	//this.abort();
	 	//this = null;   
	 };
	 	   
	 // onerror
	 httpClient.onerror = function(e){
	 	erro(e);
	 	this.abort();
	 	this = null;   	
	 };
	 
	
	
	Ti.API.info("REQUEST NUMBER "+requestsNumber);	
	   // abre conexão e faz chamada passando parâmetros
	  Ti.API.info("HTTP UTIL REQUEST  "+JSON.stringify(objetoEnvio));
	  httpClient.send(objetoEnvio);
  };  
  
  // -------------------------------------------------------------------------------------------------------------------
  // requestViaPost
  // -------------------------------------------------------------------------------------------------------------------
  self.requestViaPost = function(url, oPametro, sucesso, erro) {
  	//Ti.API.info("REQUEST VIA POST");
  	 Ti.API.info("HTTP UTIL REQUEST VIA POST "+JSON.stringify(oPametro));
  	 self.request(url, "POST", oPametro, sucesso, erro);
  };
  
  // -------------------------------------------------------------------------------------------------------------------
  // requestViaGet
  // -------------------------------------------------------------------------------------------------------------------
  self.requestViaGet = function(url, oPametro, sucesso, erro) {
  	 self.request(url, "GET", oPametro, sucesso, erro);
  };

	 // Retorna o objeto self
	 return self;
}

module.exports = HttpUtil;