var recStatus;
var respostaDesejada = null;
var recognition;

if ('speechRecognition' in window || 'webkitSpeechRecognition' in window)  {
    
  recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "pt-BR";
  recognition.interimResults = false;
  // recognition.continuous = false;
  // recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {  
    var last = event.results.length - 1;
    
    var resposta = event.results[last][0].transcript;
    recStatus.innerHTML += "/" + resposta;

    if(resposta=="um") resposta = "1";
    else if(resposta=="uma") resposta = "1";
    else if(resposta=="dois") resposta = "2";
    else if(resposta=="duas") resposta = "2";
    else if(resposta=="três") resposta = "3";
    else if(resposta=="quatro") resposta = "4";
    else if(resposta=="cinco") resposta = "5";
   
    recStatus.innerHTML += "/" + resposta;
      
    if(respostaDesejada.length == 0) {

      recStatus.innerHTML += "/resposta livre";
    
    } else if(respostaDesejada.indexOf(resposta) >= 0 ) {

      recStatus.innerHTML += "/achou/etapa: " + etapa;

      if(etapa == -1) Participantes();
      else if(etapa == 0) Etapa1();
      else if(etapa == 1) Etapa2();
      else if(etapa == 2) Etapa3();
      else if(etapa == 3) Etapa4();
    } else {
      //console.log(resposta.toUpperCase());
      //console.log(respostaDesejada.indexOf(resposta.toUpperCase()));
            falar("Você pode repetir?");
    }
  };
  
  recognition.onspeechend = () => {
    //recStatus.innerHTML += "/finalizou";
    recognition.stop();
  };
  
  recognition.onerror = (event) => {
    
    if (event.error == 'no-speech') {
      console.log('info_no_speech');
    }
    if (event.error == 'audio-capture') {
      console.log('info_no_microphone');
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        console.log('info_blocked');
      } else {
        console.log('info_denied');
      }
    }



    recStatus.innerHTML += "/erro";
    // console.error(`Error occurred in recognition: ${event.error}`);
    falar("Você pode repetir ?");
    // recognition.start();
  };
    
  recognition.onnomatch = () => {
    recStatus.innerHTML += "/desconheço";
    setTimeout(function() {
      recognition.start();
    }, 200);
  };
    
  recognition.onstart = () => {
    recStatus.innerHTML = "ouvindo";
  };
    
  recognition.onend = () => {
    recStatus.innerHTML += "/surdo";
  };
}
