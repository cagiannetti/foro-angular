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

    constructor(private _http: HttpClient){
        this.url = global.url;
    }

    prueba(){
        return "Hola mundo desde el servicio de angular";
    }

    /* método register
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
}