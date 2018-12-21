var planilhaDestino = SpreadsheetApp.openByUrl("");
var token = "";
act_id = "";

var ui = SpreadsheetApp.getUi();

function onOpen(e) {
  SpreadsheetApp.getUi()
      .createMenu('(=ↀωↀ=)')
      .addItem('Interesses', 'promptInteresses')
      .addSeparator()
      .addItem('Sugestões', 'promptSug')
      .addSeparator()
      .addItem('Cargos', 'promptJob')
      .addToUi();
      
  configuraPlanilha();

}

function configuraPlanilha(){
  var abaInteresses = false;
  var abaJob = false;
  var abas = planilhaDestino.getSheets();
  for ( var i = 0 ; i < abas.length ; i++ ){
    if(abas[i].getName() == "Busca") {
      abaInteresse = true;
    }
    if(abas[i].getName() == "Jobtitle") {
      abaJob = true;
    }
  }
  
  if(!abaInteresses) {
    
    var abaInteressesNova = planilhaDestino.insertSheet();
    abaInteressesNova.setName("Busca");
    Logger.log(abaInteressesNova.appendRow(["ID","Nome","Tipo","Tamanho","Atualizado em","Busca"]));
  }
  
  if(!abaJob) {
    
    var abaJobNova = planilhaDestino.insertSheet();
    abaJobNova.setName("Jobtitle");
    Logger.log(abaJobNova.appendRow(["ID","Nome","Tipo","Tamanho","Atualizado em","Busca"]));
  }
}


function promptSug(){
  var responseDem = ui.prompt('Digite sua Busca', 'Busca', ui.ButtonSet.OK);

  if (responseDem.getSelectedButton() == ui.Button.OK) {
    audiencesSuggestions(responseDem.getResponseText());
  }

}


function promptJob(){
  var responseDem = ui.prompt('Digite sua Busca', 'Busca', ui.ButtonSet.OK);

  if (responseDem.getSelectedButton() == ui.Button.OK) {
    jobTitle(responseDem.getResponseText());
  }

}

function promptInteresses(){

  var response = ui.prompt('Digite sua Busca', 'Busca', ui.ButtonSet.OK);

  if (response.getSelectedButton() == ui.Button.OK) {
    audiences(response.getResponseText());
  }
}


function audiencesSuggestions(query) {
  var search = 'https://graph.facebook.com/v3.2/search?type=adinterestsuggestion&interest_list=[%22' + query + '%22]&limit=1000&locale=pt_BR&access_token=' + token;
  var sheet = planilhaDestino.getSheetByName("Busca");
  Logger.log(search);
  var updated = new Date();
  
  var resultados = JSON.parse(UrlFetchApp.fetch(search)).data;
  Logger.log(resultados);
  for(var i = 0; i < resultados.length; i++){
    sheet.appendRow([resultados[i].id, resultados[i].name,resultados[i].type,resultados[i].audience_size,updated,query]);
  }
}

function audiences(query) {
  var search = "https://graph.facebook.com/v3.2/" + act_id + "/targetingsearch?q=" + query + "&access_token=" + token;
  var sheet = planilhaDestino.getSheetByName("Busca");
  Logger.log(search);
  var updated = new Date();
  
  var resultados = JSON.parse(UrlFetchApp.fetch(search)).data;
  Logger.log(resultados);
  for(var i = 0; i < resultados.length; i++){
    sheet.appendRow([resultados[i].id, resultados[i].name,resultados[i].type,resultados[i].audience_size,updated,query]);
  }
}

function jobTitle(query) {
  var search = "https://graph.facebook.com/v3.2/search?type=adworkposition&q=" + query + "&access_token=" + token;
  var sheet = planilhaDestino.getSheetByName("Jobtitle");
  Logger.log(search);
  var updated = new Date();
  
  var resultados = JSON.parse(UrlFetchApp.fetch(search)).data;
  Logger.log(resultados);
  for(var i = 0; i < resultados.length; i++){
    sheet.appendRow([resultados[i].id, resultados[i].name,"work_position",resultados[i].coverage,updated,query]);
  }
}



 

