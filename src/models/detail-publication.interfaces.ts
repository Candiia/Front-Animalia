export interface PublicacionResponse {
    id: string
    imageURL: string
    descripcion: string
    fechaRegistro: string
    numeroLikes: number
    numeroComentarios: number
    comentarioDTOList: ComentarioDtolist[]
    usename: Username
}

export interface ComentarioDtolist {
    id: string
    texto: string
    fechaRealizada: string
    userDTO: UserDto
}

export interface UserDto {
    username: string
}
export interface Username {
    username: string
}