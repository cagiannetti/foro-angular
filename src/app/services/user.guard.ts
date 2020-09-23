import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService} from './user.service';

/* este guard sirve para que los usuarios que no están identificados no puedan
entrar a la pagina de ajustes ni panel */

@Injectable()
export class UserGuard implements CanActivate{

    constructor(
        private _router: Router,
        private _userService: UserService
    ){}

    canActivate(){

        let identity= this._userService.getIdentity();
        
        //comprobamos si el usuario está correctamente identificado y devovlemos true
        if(identity && identity.name){ 
            return true;
        }else{
            this._router.navigate(['/']);
            return false;
        }
    }
}