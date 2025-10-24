window.addEventListener("load", (event) => {

    // críticas para que funcione
    if ( ! 'speechSynthesis' in window) {
        console.error("não consegue transformar texto para fala");
    } else {

        // efeito sonoro de ligação telefônica 
        var som = document.getElementById("calling");


        // botões do celular
        document.getElementById('ligar').addEventListener('click', function() {
            som.play();

            setTimeout(function() {
                som.pause();
                Inicio();
            }, 12000);
        });
        document.getElementById('desligar').addEventListener('click', function() {
            som.pause();
        });

        var etapa = -1;
        var respostaDesejada=[];
        var speech = new SpeechSynthesisUtterance();
        var voices = speechSynthesis.getVoices();

        function getVoices() {
            voices = speechSynthesis.getVoices();
            if(!voices.length) {
                speechSynthesis.speak(speech);
                voices = speechSynthesis.getVoices();
            }
            return voices;
        }

        function falar(texto) {          
            speech.lang = "pt-BR";
            speech.rate = 1.5;  // velocidade 0.1 to 10
            speech.volume = 1;  // From 0 to 1
            speech.pitch = 0.2; // From 0 to 2
            speech.voice = getVoices()[0];
            speech.text = texto;
            window.speechSynthesis.speak(speech);
        }

        function ouvir(array) {
            respostaDesejada = array;
            recognition.start();
        }

        speech.onend = (event) => {
            if(etapa == 0) ouvir( ["SIM."] );
            if(etapa == 1) ouvir( ["3.","4.","5."] );
            if(etapa == 2) ouvir( ["RIO DE JANEIRO.","MARICÁ."] );

            // console.log(`finished on ${event.elapsedTime} seconds.`);
        };
        

        var grammer = "#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;";
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

        var recognition = new SpeechRecognition();
        var speechRecognitionGrammerList = new SpeechGrammarList();
        speechRecognitionGrammerList.addFromString(grammer, 1);

        recognition.grammers = speechRecognitionGrammerList;
        recognition.lang = "pt-BR";
        recognition.interimResults = false;
        // recognition.continuous = false;
        // recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            var last = event.results.length - 1;
            var resposta = event.results[last][0].transcript;
            console.log(`resposta: ${resposta}`);

            if(respostaDesejada.indexOf(resposta.toUpperCase()) >= 0 ) {
                // console.log("ok");

                if (etapa == 0) Etapa1();
                if (etapa == 1) Etapa2();
                if (etapa == 2) Etapa3();
                if (etapa == 3) Etapa4();
            } else {
                console.log(respostaDesejada);
                console.log(resposta.toUpperCase());
                console.log(respostaDesejada.indexOf(resposta.toUpperCase()));

                falar("Você pode repetir ?");
                recognition.start();
            }
        };
        recognition.onspeechend = () => {
            recognition.stop();
        };
        recognition.onerror = (event) => {
            console.error(`Error occurred in recognition: ${event.error}`);
            falar("Você pode repetir ?");
            recognition.start();
        };
        // recognition.onnomatch = (event) => {
        //     console.log("I didn't recognize that color.");
        // };


        function Inicio() {
            etapa = -1;
            setTimeout(function() {
                falar("Olá. Aguarde um instante enquanto verifico se seu telefone está cadastrado.");
            }, 2000);
            setTimeout(function() {
                falar("Perfeito. Espero que esteja preparado para participar da sua JORNADA. As regras são simples. Você precisa seguir todas as etapas para que no final você receba seu prêmio. Em nenhum momento você pode deixar de fazer o que é pedido. Você só pode fazer uma única jornada, pois seu telefone será descartado. Após o término da sua JORNADA informe o número do celular do próximo jogador. Escolha com consciência e dê o aplicativo a essa pessoa para que possa ter a chance de participar da JORNADA. Você está pronto?");
                etapa = 0;
            }, 15000);

        }
        function Etapa1() {
            etapa = -1;
            setTimeout(function() {
                falar("Sua jornada começa agora. Contando com você, quantas pessoas estão participando?");
                etapa = 1;
            }, 2000);
        }
        function Etapa2() {
            etapa = -1;
            setTimeout(function() {
                falar("Perfeito. Em que cidade você se encontra?");
                etapa = 2;
            }, 2000);
        }
        function Etapa3() {
            etapa = -1;
            setTimeout(function() {
                falar("Aguarde a criação da primeira etapa...");
            }, 2000);
            setTimeout(function() {
                falar("Você deve ir até o vão central da Ponte Presidente Costa e Silva. Quando chegar lá, terá novas informações.");
                etapa = 3;
            }, 15000);
        }
        function Etapa4() {
            etapa = -1;
            setTimeout(function() {
                falar("Perfeito. Vocês devem ir até as Barcas - Terminal Araribóia. Quando chegar lá, terá novas informações.");
                etapa = 4;
            }, 2000);
        }
    }
});