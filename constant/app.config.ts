export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    accessTokenPersistStrategy: 'localStorage' | 'sessionStorage' | 'cookies'
    enableMock: boolean
}

const appConfig: AppConfig = {
    //apiPrefix: 'https://localhost:44337/api',//'https://stockproapp.azurewebsites.net/api', //'https://stockproapp.azurewebsites.net/api', // 'https://localhost:44337/api', //
    apiPrefix: 'https://stockproapp-a9hyfrcgg5ctf4hz.centralus-01.azurewebsites.net/api',//'https://api.boomerce.com/api', //'https://stockproapp.azurewebsites.net/api', // 'https://localhost:44337/api', //
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    accessTokenPersistStrategy: 'localStorage',
    enableMock: true,
}

export default appConfig
