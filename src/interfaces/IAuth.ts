interface IAuthRequest {
    // userId: string,
    username: string,
    password: string
}

interface IAuthResponse {
    token: string;
}

export { IAuthRequest, IAuthResponse};