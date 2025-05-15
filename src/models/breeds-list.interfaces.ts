import { UUID } from "crypto"

export interface BreedsListsResponse {
    numPagina: number
    tamanioPagina: number
    elementosEncontrados: number
    paginasTotales: number
    contenido: BreedsLists[]
}

export interface BreedsLists {
    id: UUID,
    nombre: string
}
