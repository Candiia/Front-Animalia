export interface MascotaResponse {
  id: string
  nombre: string
  biografia: string
  fechaNacimiento: string
  avatar: string
  raza: Raza
  especie: Especie
  userDTO: UserDto
  publicationCount: number
  publicaciones: Publicacione[]
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
  username: string,
  id: string
}

export interface Publicacione {
  id: string
  imageURL: string
  descripcion: string
  fechaRegistro: string
  numeroLikes: number
  numeroComentarios: number
  comentarioDTOList: ComentarioDtolist[]
  usename: Usename
  hasLike: boolean
}

export interface ComentarioDtolist {
  id: string
  texto: string
  fechaRealizada: string
  userDTO: UserDto2
}

export interface UserDto2 {
  username: string
}

export interface Usename {
  username: string
}
