export interface LikesListsResponse {
    numPagina: number
    tamanioPagina: number
    elementosEncontrados: number
    paginasTotales: number
    contenido: LikesList[]
}

export interface LikesList {
    fechaRealizada: string
    publicacionDTO: PublicacionDto
    userDTO: UserDto2
}

export interface PublicacionDto {
    imageURL: string
    descripcion: string
    fechaRegistro: string
    usuario: Usuario
    mascotaDTO: MascotaDto
}

export interface Usuario {
    username: string
    email: string
    fechaRegistro: string
}

export interface MascotaDto {
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

export interface UserDto2 {
    username: string
    email: string
    fechaRegistro: string
}
