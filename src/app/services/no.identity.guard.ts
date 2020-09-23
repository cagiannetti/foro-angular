import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService} from './user.service';

/* este guard sirve para que los usuarios una vez que fueron identificados no puedan
entrar a la pagina de login / registro */

@Injectable()
export class NoIdentityGuard implements CanActivate{

    constructor(
        private _router: Router,
        private _userService: UserService
    ){}

    canActivate(){

        let identity= this._userService.getIdentity();
        
        //comprobamos si el usuario no está identificado correctamente
        if(identity && identity.name){ 
            this._router.navigate(['/']);
            return false;
        }else{
            return true;
        }
    }

}