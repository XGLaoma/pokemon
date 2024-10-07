import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ListPokemon, NamePokemon, DetailPokemon } from '../../models/pokemonModel';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})


export class ListCardsComponent {


  public modal!: boolean;

  /**Variables para los datos*/
  public nombresPokemon!: ListPokemon;
  public nombres!:        Array<NamePokemon>;
  public detallePokemon!: DetailPokemon;
  
  /**Variables para el paginado de los resultados */
  public paginado:        boolean = false;
  public previo:          boolean = false;
  public siguiente:       boolean = true;
  public contador:        number  = 0;
  public deshabilitar!:   boolean;

    constructor ( private pokemonService: PokemonService){}

    ngOnInit(){
      this.buscarPokemon();
    }

    /**
     * 
     * @param url 
     * 
     */
    buscarPokemon(url?: string){
      this.deshabilitar = true;

      if(url!==undefined && this.previo === false){
        this.paginado = true;
      }

      let offset: number;
      let limit:  number = 20;

      if (this.paginado === true && url !== undefined){
            let urlArray   = url.split('='); 
            let urlOoffset = urlArray[1].split('&');
            offset = parseInt(urlOoffset[0]);
      }else{
        offset = 0;
      }

      this.pokemonService.namesPokemon(offset, limit).subscribe({
        next:(response) => {
          this.nombresPokemon =  response;
          this.nombres = this.nombresPokemon.results;
          this.validarVariables();
          this.deshabilitarBoton();
        },
        error:(error)=> {
          this.deshabilitarBoton();
        }
        
      }) 
             
    }

    /**
     * 
     * @param id 
     * Metodo para obtener la información del Pokemon y mostrarla en un MODAL
     * PENDIENTE DE IMPLEMENTAR
     */
    delattePokemon(id: number){
      this.pokemonService.detailPokemon(id).subscribe({
        next:(response) => {
          this.detallePokemon = response;
          console.log("Info Pokemon ",this.detallePokemon)
          //PENDIENTE POR IMPLEMENTAR
        },
        error:(error)=> {
          //Pendiente por implementar
        }        
      }) 
    }

    /**
     * Incrementa el contador para obtener el índice adecuado de cada resultado del array al hacer 
     * clic en el botón SIGUIENTE
     */
    incrementar(){
      this.contador  = this.contador + 20;
    }

    /**
     *  Decrementa el contador para obtener el índice adecuado de cada resultado del array al hacer 
     *  clic en el botón ANTERIOR
     */
    decrementar(){
      this.contador  = this.contador - 20;
    }

    /**
     * Deshabilita los botones hasta que se haya cargado la información requerida
     */
    deshabilitarBoton(){
      this.deshabilitar = false;
    }

    /**
     * Valida las variables para el paginado
     */

    validarVariables(){
      if(this.nombresPokemon.previous === null){
        this.previo = false;
      }else{
        this.previo = true;
      }
      if(this.nombresPokemon.next === null){
        this.siguiente = false;
      }else{
        this.siguiente = true;
      }
    }
}
