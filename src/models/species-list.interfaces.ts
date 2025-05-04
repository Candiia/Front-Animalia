export interface SpeciesListsResponse {
    numPagina: number
    tamanioPagina: number
    elementosEncontrados: number
    paginasTotales: number
    contenido: SpeciesLists[]
}

export interface SpeciesLists {
    nombre: string
    localDate: string
}
