import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]

})
export class LoginComponent implements OnInit {
  
  public page_title:string;
  public user: User;
  public status: string;
  public identity; //para guardar el objeto de usuario que me devuelve la api
  public token;

  constructor(
    private _userService: UserService
  ){
    this.page_title = 'identificate';
    this.user = new User('','','','','','','ROLE_USER');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    //CONSEGUIR OBJETO COMPLETO DEL USUARIO LOGUEADO
    //subscribe es para utilizar el observable y recibir los datos de vuelta, puedo enviar el parámetro gettoken ó no
    this._userService.signup(this.user).subscribe(
      response => {
        if( response.user && response.user._id ){
          
          console.log('Exito, respuesta desde el backend: ', response);
          // Guardamos el usuario en una propiedad
          this.identity = response.user;

          //Conseguir el token del usuario identificado, vuelvo a hacer una petición

          this._userService.signup(this.user, true).subscribe(
            response => {
              if(response.token){

                //Guardar el token del usuario
                this.token = response.token; 
              
              }else{
              
                this.status = 'error';
                console.log('Error al obtener el token');
              }
            },
            error => {
              this.status = 'error';
              console.log(error);
            });
        }else{
          this.status = 'error';
          console.log('Error de autenticación');
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      });
  }

}
