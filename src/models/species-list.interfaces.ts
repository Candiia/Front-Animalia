import { UUID } from "crypto"

export interface SpeciesListsResponse {
    numPagina: number
    tamanioPagina: number
    elementosEncontrados: number
    paginasTotales: number
    contenido: SpeciesLists[]
}

export interface SpeciesLists {
    id: UUID,
    nombre: string
    localDate: string
}
