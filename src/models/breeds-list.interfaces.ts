export interface BreedsListsResponse {
    numPagina: number
    tamanioPagina: number
    elementosEncontrados: number
    paginasTotales: number
    contenido: BreedsLists[]
}

export interface BreedsLists {
    nombre: string
}
