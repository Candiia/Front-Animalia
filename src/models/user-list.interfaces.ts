export interface UserListsResponse {
  numPagina: number
  tamanioPagina: number
  elementosEncontrados: number
  paginasTotales: number
  contenido: UserList[]
}

export interface UserList {
  id: string
  username: string
  email: string
  fechaRegistro: string
  roles: string[]
  enable: boolean
  mascotaDTOList: MascotaDtolist[]
  password: string
  verifyPassword: string
}

export interface MascotaDtolist {
  id: string
  nombre: string
  fechaNacimiento: string
}
