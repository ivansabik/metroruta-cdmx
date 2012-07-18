SingletonUsuario = new Object();

SingletonUsuario.save = function(usuario) {
    window.localStorage.setItem('usuario',JSON.stringify(usuario));
}

SingletonUsuario.getInstance = function() {
    if(window.localStorage.getItem('usuario'))
        return JSON.parse(window.localStorage.getItem('usuario'));
    else
        return {"estacionOrigen": "", "estacionDestino": ""};
}
