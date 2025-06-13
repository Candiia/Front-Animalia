import { UUID } from "crypto"

export interface PublicacionListReponse {
  numPagina: number
  tamanioPagina: number
  elementosEncontrados: number
  paginasTotales: number
  contenido: Publicaicones[]
}

export interface Publicaicones {
  id: string
  imageURL: string
  descripcion: string
  fechaRegistro: string
  numeroLikes: number
  numeroComentarios: number
  comentarioDTOList: ComentarioDtolist[]
  usename: Usename
  hasLike: boolean
  getMascotaDTOName: GetMascotaDtoname
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

export interface Usename {
  username: string
}

export interface GetMascotaDtoname {
  id: UUID
  nombre: string
}
