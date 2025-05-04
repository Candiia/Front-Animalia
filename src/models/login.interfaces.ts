export interface LoginResponse {
    id: string
    username: string
    token: string
    refreshToken: string
    roles: string[]
}
