import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import TokenRequiredError from '../utils/errors/TokenRequiredError'
import { useLoading } from './app'

export const useActiveSession = (
  allowsAnonymous = false,
  loginOnError = true
) => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const { doLoad } = useLoading()

  useEffect(() => {
    if (!session && !allowsAnonymous) {
      throw new TokenRequiredError(
        'BaseAPI Error - Authorization header is required but user is not authenticated'
      )
    } else {
      const shouldReauth =
        session?.error === 'RefreshAccessTokenError' ||
        session?.error === 'SessionExpired'
      if (shouldReauth && loginOnError) {
        doLoad(loading)
        const identityProvider = session?.user?.identityProvider
        signIn(
          null,
          null,
          identityProvider ? { kc_idp_hint: identityProvider } : null
        )
      }
    }
  }, [session, loading])
  return { session, status }
}

// If there is a session with an expired token, reauthenticate, otherwise if there is no session, either leave it as it is (needsAuth=false) or reauthenticate
export const useAndCheckActiveToken = (needsAuth = false) => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const { doLoad } = useLoading()

  useEffect(() => {
    const shouldReauth =
      (needsAuth && !session) ||
      session?.error === 'RefreshAccessTokenError' ||
      session?.error === 'SessionExpired'
    doLoad(shouldReauth)

    const identityProvider = session?.user?.identityProvider
    if (shouldReauth) {
      signIn(
        session?.provider || null,
        null,
        identityProvider ? { kc_idp_hint: identityProvider } : null
      )
    }
  }, [session, loading])
  return { session, status }
}
