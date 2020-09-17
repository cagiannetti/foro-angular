import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'; //importamos el modelo de usuario
import { UserService } from '../../services/user.service'; //Cargamos el servicio de usuario que enviará los datos a la API

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService //inyecto el servicio de usuario como una propiedad
  ) {
    this.page_title = 'Registrate';
    this.user = new User('','','','','','','ROLE_USER'); //creamos un objeto vacío, siempre con valores en sus propiedades
  }

  ngOnInit(): void {
    console.log(this._userService.prueba());
  }

  onSubmit(form){
    console.log('enviando datos al servicio de usuario' , this.user);
    this._userService.register(this.user).subscribe(
      response => {
        if(response.user && response.user._id){
          this.status='success';
          form.reset();
        }else{
          this.status='error'
        }
      },
      error => {
        console.log(error);
      }

    );
  }

}
