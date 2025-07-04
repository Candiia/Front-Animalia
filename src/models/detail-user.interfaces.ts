import { UUID } from "crypto"

export interface UserDetailResponse {
    id: string
    username: string
    email: string
    fechaRegistro: string
    roles: string[]
    enable: boolean
    mascotaDTOList: MascotaDtolist[]
    publicacionDTOS: PublicacionDtos[]
    password: string
    verifyPassword: string
}

export interface MascotaDtolist {
    id: string
    nombre: string
    biografia: string
    fechaNacimiento: string
    avatar: string
    raza: Raza
    especie: Especie
    userDTO: UserDto
}

export interface Raza {
    id: string
    nombre: string
}

export interface Especie {
    id: string
    nombre: string
    localDate: string
}

export interface UserDto {
    username: string
    id: UUID
}

export interface PublicacionDtos {
    id: string
    imageURL: string
    descripcion: string
    fechaRegistro: string
}
