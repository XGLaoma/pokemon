import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../config/api';
import { DetailPokemon, ListPokemon } from '../models/pokemonModel';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

      public detailPokemon(id: number): Observable<any>{
        const url = `${API.URL}${id}`;
        return this.http.get<DetailPokemon>(url);
      }

      public namesPokemon(offset: number, limit: number): Observable<any>{
        const url = `${API.URL}?offset=${offset}&limit=${limit}`;
        return this.http.get<ListPokemon>(url);
      }
}
