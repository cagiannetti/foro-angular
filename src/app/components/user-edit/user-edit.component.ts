import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title:string;
  public user: User;
  public identity;
  public token;
  public status;
  public afuConfig;
  public url;
  public resetVar = true; //para afu en vista necesita esta variable

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.page_title='Ajustes de usuario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = global.url;
    this.afuConfig={
      multiple: false,
      formatsAllowed: '.jpg, .jpep, .gif, .png' ,
      maxSize: '50',
      uploadAPI: {
        url: this.url+'upload-avatar',
        headers: {
          "Authorization": this.token
        }
      },
      theme: 'attachPin',
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Seleccionar archivos',
        resetBtn: 'Reset',
        uploadBtn: 'Subir',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Sube tu foto...',
        afterUploadMsg_success: 'Subida exitosa !',
        afterUploadMsg_error: 'Falló la subida !',
        sizeLimit: 'Tamaño exedido'
      }
    };
   }

  ngOnInit(): void {
  }

  
 /* 
 NO FUNCA
 avatarUpload(datos){ //este método es invocado desde el componente afu que sube la imágen, sirve para agregar la imágen al objeto de usuario que luego será enviado
    console.log(datos);
    console.log(JSON.parse(datos.response)); //guardo lo que me responde el backend parseado para poder extraer cosas
    let data = JSON.parse(datos.response); //guardo lo que me responde el backend parseado para poder extraer cosas
    this.user.image = data.image; //agrego al objeto la imagen
  }*/

  avatarUpload(data){
   // console.log(data);
    //console.log(data.body.file_name);
    //console.log(this.user);
    //let data_obj = JSON.parse(data.body);
    this.user.image = data.body.file_name;
    console.log(this.user);
  }

  onSubmit(form) {
    this._userService.update(this.user).subscribe(
      response=>{
        if(!response.user){
          this.status = 'error';
        }else{
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
        }
      },
      error => {
        this.status='error';
        console.log(error);
      }
    );
  }

}
