import { UUID } from "crypto"

export interface PetListsResponse {
    numPagina: number
    tamanioPagina: number
    elementosEncontrados: number
    paginasTotales: number
    contenido: MascotaList[]
}

export interface MascotaList {
    id: UUID
    nombre: string
    biografia: string
    fechaNacimiento: string
    avatar: string
    raza: Raza
    especie: Especie
    userDTO: UserDto
}

export interface Raza {
    id: UUID
    nombre: string
}

export interface Especie {
    id: UUID
    nombre: string
    localDate: string
}

export interface UserDto {
    username: UUID
}
