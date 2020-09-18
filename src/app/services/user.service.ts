//Peticiones ajax hacia la api rest que tengan que ver con usuarios
import { Injectable } from '@angular/core'; //inyectar este servicio en una propiedad en cualquier componente
import { HttpClient, HttpHeaders } from '@angular/common/http'; //hacer peticiones
import { Observable } from 'rxjs'; //Recibir resultados que devuelva el api
import { User } from '../models/user'; //importamos modelo de usuario
import { global } from './global';

/* Clase injectable:
    permite posteriormente inyectar esta clase como una propiedad
    en cualquier componente
    _http: indica que esto es un servicio
*/ 
@Injectable()
export class UserService{
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient){
        this.url = global.url;
    }

    prueba(){
        return "Hola mundo desde el servicio de angular";
    }

    /* --------método register -------------
        recibe un usuario y lo envía a la API (la API lo graba)
        recibe la respuesta por el Observable
    */
    register(user): Observable<any>{
        // Convertir el usuario a un jsgon string y enviarla en la petición
        let params = JSON.stringify(user);

        // Definir las cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        // Hacer petición ajax
        console.log ('registrando usuario' , this.url);
        return this._http.post(this.url+'register', params, {headers: headers});
    }

    /* --------método signup -------------
        busca el usuario en la bd
        si le mando el parámetro gettoken me devolverá el token, si no me devuelve datos de usuario para almacenar en localstorage
        si no está devuelve error    
    */
    signup(user, gettoken = null):Observable<any>{

        // Comprobar si llega gettoken
        if(gettoken != null){
            user.gettoken = gettoken; //le agrego a user un parámetro gettoken
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'login', params, {headers: headers});
    }


    /* --------método getidentity -------------
        sirve para sacar datos del local storage    
    */
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity && identity != null && identity != undefined && identity !='undefined'){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');
        if(token && token != null && token != undefined && token !='undefined'){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }
}