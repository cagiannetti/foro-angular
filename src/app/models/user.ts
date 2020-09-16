export class User{
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public image: string,
        public role: string
    ){}
}
 //este es el modelo sobre el cual podremos crear nuevos objetos con new, luego llenamos el objeto cready y por ejemplo enviar una petición y guardar un nuevo usuario

