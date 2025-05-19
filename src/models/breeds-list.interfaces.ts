import { UUID } from "crypto"

export interface BreedsListsResponse {
    numPagina: number
    tamanioPagina: number
    elementosEncontrados: number
    paginasTotales: number
    contenido: Breed[]
}

export interface Breed {
    id: UUID,
    nombre: string
}
