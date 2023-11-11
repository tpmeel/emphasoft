import { isDefined } from '../utils/object'

interface IIsAuthenticatedReturnType {
    loggedIn: boolean
}

export const useIsAuthenticated = (): IIsAuthenticatedReturnType => {

    const isTokenDefined = isDefined(localStorage.getItem('tokenFromBackend'))

    return {
        loggedIn: isTokenDefined,
    }
}
