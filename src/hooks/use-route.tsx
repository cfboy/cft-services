import { createContext, useContext, type ReactNode } from 'react'

import { homePath, type Route } from '@/routes'

const RouteContext = createContext<Route>({
  kind: 'home',
  lang: 'en',
  path: '/',
})

export function RouteProvider({
  route,
  children,
}: {
  route: Route
  children: ReactNode
}) {
  return <RouteContext.Provider value={route}>{children}</RouteContext.Provider>
}

/** The page being rendered — same value on the server and in the browser. */
// eslint-disable-next-line react-refresh/only-export-components
export function useRoute(): Route {
  return useContext(RouteContext)
}

/**
 * Link to a section of the home page. On the home page itself it is a bare
 * fragment (smooth in-page scroll); anywhere else it navigates there.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useSectionHref() {
  const route = useRoute()
  return (id: string) =>
    route.kind === 'home' ? `#${id}` : `${homePath(route.lang)}#${id}`
}
