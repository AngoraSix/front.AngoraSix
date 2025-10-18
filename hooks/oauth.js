import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useLoading } from './app'

export const useActiveSession = (allowsAnonymous = false) => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const { doLoad } = useLoading()

  useEffect(() => {
    const shouldReauth =
      session?.error === 'RefreshAccessTokenError' ||
      session?.error === 'SessionExpired'
    doLoad(!session || loading || shouldReauth)
    const identityProvider = session?.user?.identityProvider
    if ((!session || shouldReauth) && !allowsAnonymous) {
      signIn(
        null,
        null,
        identityProvider ? { kc_idp_hint: identityProvider } : null
      ) // Force sign in to hopefully resolve error and be able to edit
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
