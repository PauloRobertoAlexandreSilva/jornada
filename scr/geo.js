var geoId;

var geoStatus;
var geoDestino = {"latitude": 0, "longitude": 0, "local": ""};

function GeoSuccess(position) {

    var latitude   = parseFloat(position.coords.latitude + 0);
    var longitude  = parseFloat(position.coords.longitude + 0);
    var altitude   = parseFloat(position.coords.altitude + 0);
    var velocidade = parseFloat(position.coords.speed + 0);
    var precisao   = parseFloat(position.coords.accuracy + 0);
    var raio = 0.005;

    geoStatus.innerHTML = geoDestino.local;

    if( ( latitude  >= (geoDestino.latitude - raio) && latitude  <= (geoDestino.latitude + raio) ) &&
        ( longitude >= (geoDestino.longitude - raio) && longitude <= (geoDestino.longitude + raio) ) )
    {
        navigator.geolocation.clearWatch(geoId);
        geoDestino = {"latitude": 0, "longitude": 0, "local": ""};
        
        if(etapa == 1) { navigator.geolocation.clearWatch(geoId); Etapa2(); }
        if(etapa == 2) { navigator.geolocation.clearWatch(geoId); Etapa3(); }
        if(etapa == 3) { navigator.geolocation.clearWatch(geoId); Etapa4(); }
        if(etapa == 4) { navigator.geolocation.clearWatch(geoId); Etapa5(); }
    }
    else if(velocidade == 0)
    {
        // geoStatus.innerHTML += "<br>parado";
    }
    else
    {
        // geoStatus.innerHTML += "<br>andando";
    }
    // geoStatus.innerHTML += "<br>" + (Math.abs(geoDestino.latitude) - raio).toFixed(3) + " até " + (Math.abs(geoDestino.latitude) + raio).toFixed(3);
    // geoStatus.innerHTML += " / " + (Math.abs(geoDestino.longitude) - raio).toFixed(3) + " até " + (Math.abs(geoDestino.longitude) + raio).toFixed(3);


    velocidade = (velocidade * 3.6).toFixed(0);
    // geoStatus.innerHTML += `<br>Lat: ${latitude} ° / Lng: ${longitude} °<br>Vel: ${velocidade} Km/h`;
}
// utilização: 
// geoId = navigator.geolocation.watchPosition(GeoSuccess);
