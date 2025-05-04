export interface UserListsResponse   {
    numPagina: number
    tamanioPagina: number
    elementosEncontrados: number
    paginasTotales: number
    contenido: UserList[]
}

export interface UserList {
    username: string
    email: string
    fechaRegistro: string
}
