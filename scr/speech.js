var speStatus;

if ('speechSynthesis' in window) {
    var vozes = speechSynthesis.getVoices();
    var vozesBR = [];
    var speech = new SpeechSynthesisUtterance();
    speech.lang = "pt-BR";
    speech.rate = 1;  // velocidade 0.1 to 10
    speech.volume = 1;  // VOLUME de 0 até 1
    speech.pitch = 0; // TOM de 0 até 2


    function CarregarVoz() {
        vozes = speechSynthesis.getVoices();
        for(x=0;x<vozes.length;x++){
            if(vozes[x].lang == 'pt_BR' || vozes[x].lang == 'pt-BR') {
                vozesBR.push(vozes[x]);
            }
        }

        speech.voice = vozesBR[0];
    }

    function falar(texto) {
        speStatus.innerHTML = "";
        
        if(!desligado) {
            speech.text = texto;
            window.speechSynthesis.speak(speech);
        }
    }

    speech.onstart = (event) => {
        // console.log(`O texto que será falado: ${event.utterance.text}`);
        // speStatus.innerHTML = "falando";
    };
    speech.onend = (event) => {
        //console.log(`finished on ${event.elapsedTime} seconds.`);
        // speStatus.innerHTML ="calado";
        
        if(respostaDesejada != null) {
            speStatus.innerHTML = respostaDesejada;
            
            recognition.start();
        }
    };

    window.addEventListener("load", (event) => {
        CarregarVoz();
        // speStatus.innerHTML ="voz carregada: " + speech.voice.name;
    });
}
