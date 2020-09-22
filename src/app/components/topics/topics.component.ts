import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';



@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [TopicService]
})
export class TopicsComponent implements OnInit {

  public page_title: string;
  public topics: Topic[];
  public total_pages;
  public page;
  public next_page;
  public prev_page;
  public number_pages;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.page_title = 'Temas';

   }

  ngOnInit(): void {
    //obtengo parámetro de la url para sacar la página deseada
    this._route.params.subscribe(params => {
      var page= +params['page']; //convierto el parámetro page que me llega a string
      
      if(!page || page==null || page==undefined || page==undefined){
        page=1;
        this.prev_page=1;
        this.next_page=2;
      };

      this.getTopics(page);
    });
    
  }

  getTopics(page = 1){
    this._topicService.getTopics(page).subscribe(
      response => {
        if(response.topics){
          this.topics = response.topics;
          
          //Navegación de paginación
          this.total_pages = response.totalPages;
          
          var number_pages = []; //creamos un array con las páginas para luego recorrerlo en la vista

          for(var i=1; i<=this.total_pages; i++){ 
            //llenamos el array
            number_pages.push(i);
          };

          this.number_pages = number_pages; //cargamos la propiedad del objeto

          //Página previa Prev
          if(page>=2){
            this.prev_page = page-1;
          }else{
            this.prev_page = 1;
          }

          //Página sigiente Next
          if(page<this.total_pages){
            this.next_page = page+1;
          }else{
            this.next_page = this.total_pages;
          }



        }else{
          this._router.navigate(['/inicio']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
