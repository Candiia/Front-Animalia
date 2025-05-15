import { UUID } from "crypto"

export interface PetListsResponse {
    numPagina: number
    tamanioPagina: number
    elementosEncontrados: number
    paginasTotales: number
    contenido: MascotaList[]
}

export interface MascotaList {
    id: UUID,
    nombre: string
    biografia: string
    fechaNacimiento: string
    avatar: string
    raza: Raza
    especie: Especie
    userDTO: UserDto
}

export interface Raza {
    nombre: string
}

export interface Especie {
    nombre: string
    localDate: string
}

export interface UserDto {
    username: string
    email: string
    fechaRegistro: string
}
