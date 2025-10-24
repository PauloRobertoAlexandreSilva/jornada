var origem;
var etapa = null;
var desligado = true;

window.addEventListener("load", (event) => {
    geoStatus = document.getElementById("geoStatus");
    speStatus = document.getElementById("speStatus");
    recStatus = document.getElementById("recStatus");

    // críticas para que funcione
    if (navigator.connection.effectiveType == null) {
        speStatus.innerHTML = "sem internet";
    } else if (!navigator.geolocation) {
        geoStatus.innerHTML = "sem Geolocalização";
    } else if (!'speechSynthesis' in window) {
        speStatus.innerHTML = "sem fala";
    } else if (!'speechRecognition' in window && !'webkitSpeechRecognition' in window)  {
        recStatus.innerHTML = "sem reconhecimento de fala";
    } else {
        // efeito sonoro de ligação telefônica
        var som = document.getElementById("calling");

        // botões do celular
        document.getElementById('ligar').addEventListener('click', function() {
            desligado = false;
            // speStatus.innerHTML = "discando";
            document.getElementById("ligar").style.visibility = "hidden";
            document.getElementById("desligar").style.right = "37%";

            som.play();

            $.getJSON('https://json.geoiplookup.io/?callback=?', function(data) {
                origem = data.district;
                
     // geoStatus.innerHTML = origem;
            });

            setTimeout(function() {
                som.pause();
                Inicio();
            }, 12000);
        });

        document.getElementById('desligar').addEventListener('click', function() {
            desligado = true;
            speStatus.innerHTML = "";
            document.getElementById("ligar").style.visibility = "visible";
            document.getElementById("desligar").style.right = "10%";

            som.pause();
            window.speechSynthesis.cancel();
            navigator.geolocation.clearWatch(geoId);
        });

        document.getElementById("proximaEtapa").addEventListener("click", function() {
            if(!desligado) {
                if(etapa == null) { Inicio(); }
                else if(etapa == -1) { Participantes(); }
                else if(etapa == 0) { Etapa1(); }
                else if(etapa == 1) { Etapa2(); }
                else if(etapa == 2) { Etapa3(); }
                else if(etapa == 3) { Etapa4(); }
                else if(etapa == 4) { Etapa5(); }
                else if(etapa == 5) { Etapa6(); }
            }
        })
    }
});



function Inicio() {
    etapa = -1;

    setTimeout(function() {
        falar("Olá. Aguarde um instante enquanto verifico se seu telefone está cadastrado.");
        respostaDesejada = null;
    }, 1000);
    setTimeout(function() {
        falar("Perfeito. Espero que esteja preparado para participar da JORNADA. As regras são simples. Nem você, nem ninguém será colocado em risco. Você deverá passar por algumas etapas, para que no final você receba um prêmio. Você só pode fazer uma única jornada, pois seu telefone será bloqueado. Após o término da JORNADA você deverá responder um S,M,S, com o número do celular do próximo jogador. Escolha com consciência e dê o aplicativo à essa pessoa, para que ela possa participar da JORNADA. Você está pronto?");
        respostaDesejada = ["sim"];
    }, 15000);
}

function Participantes() {
    etapa = 0;
    console.log("etapa",etapa);

    setTimeout(function() {
        falar("Sua jornada começa agora. Contando com você, quantas pessoas estão participando ?");
        respostaDesejada = ["1","2","3","4","5"];
    }, 2000);
}

function Etapa1() {
    etapa = 1;
    console.log("etapa",etapa);

    setTimeout(function() {
        falar("Aguarde a criação da primeira etapa...");
        respostaDesejada = null;
    }, 2000);
    setTimeout(function() {
        geoDestino = {"latitude": -22.87080, "longitude": -43.15870, "local":"Vão Central da Ponte Rio-Niterói"}
        geoId = navigator.geolocation.watchPosition(GeoSuccess);
        falar("Preste muita atenção. Partindo de " + origem + " você deve ir até " + geoDestino.local + ". Quando chegar lá, terá novas informações.");
        respostaDesejada = null;
    }, 15000);
}

function Etapa2() {
    etapa = 2;
    console.log("etapa",etapa);

    setTimeout(function() {
        geoDestino = {"latitude": -22.89326, "longitude": -43.12375, "local":"Barca - estação Praça Araribóia"};
        geoId = navigator.geolocation.watchPosition(GeoSuccess);
        falar("Muito bem. Agora você deve ir até " + geoDestino.local + ". Quando chegar lá, terá novas informações.");
        respostaDesejada = null;
    }, 2000);
}

function Etapa3() {
    etapa = 3;
    console.log("etapa",etapa);

    setTimeout(function() {
        geoDestino = {"latitude": -22.90730, "longitude": -43.12608, "local":"Muséu de Arte Contemporânea de Niterói"};
        geoId = navigator.geolocation.watchPosition(GeoSuccess);
        falar("Você concluiu mais uma etapa. Agora você deve ir até " + geoDestino.local + ". Quando chegar lá, terá novas informações.");
        respostaDesejada = null;
    }, 2000);
}

function Etapa4() {
    etapa = 4;
    console.log("etapa",etapa);

    setTimeout(function() {
        geoDestino = {"latitude": -22.90398, "longitude": -43.11640, "local":"Praia de Icaraí"};
        geoId = navigator.geolocation.watchPosition(GeoSuccess);
        falar("Atenção. Agora você deve ir até " + geoDestino.local + ". Quando chegar lá, terá novas informações.");
        respostaDesejada = null;
    }, 2000);
}

function Etapa5() {
    etapa = 5;
    console.log("etapa",etapa);

    setTimeout(function() {
        geoDestino = {"latitude": -22.91256, "longitude": -43.10884, "local":"Joaquim Távora, 101"};
        geoId = navigator.geolocation.watchPosition(GeoSuccess);
        falar("Atenção. Esta é a última etapa. Você deve ir até " + geoDestino.local + ". Quando chegar lá, diga seu nome ao porteiro, e vá ao apartamento 903. O mais jóvem do seu grupo está com a chave do seu novo imóvel. Parabéns. O imóvel é seu. Não esqueça de responder o S,M,S, com o número de celular do próximo jogador.");
        respostaDesejada = null;
    }, 2000);
}
