export interface NamePokemon{
    name: string,
    url: string
}

export interface ListPokemon {
    count: number,
    next: string,
    previous: string,
    results: Array<NamePokemon>
}

export interface DetailPokemon{
    detailPokemon: Array<any>
}