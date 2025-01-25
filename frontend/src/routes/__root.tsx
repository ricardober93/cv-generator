import {createRootRouteWithContext, Link as RouterLink, Outlet} from '@tanstack/react-router'
import {Box, Flex, Link} from '@chakra-ui/react'
import {type QueryClient} from '@tanstack/react-query'
import {userQueryOptions} from '../api/manager'
import {Logout} from "../components/logout/Logout.tsx"

interface MyRouterContext {
    queryClient: QueryClient
}

function Navbar() {
    const {user} = Route.useRouteContext()
    return (
        <Flex as="nav" bg="teal.500" color="white" padding="4" alignItems="center" w="100%">
            <Flex gap={4} justifyContent="space-between" alignItems="center" w="100%">
                <Link  href="/" marginRight="4">
                    Notes
                </Link>
                <Flex gap={4} justifyContent="flex-end" alignItems="center">
                    <Link href="/about">
                        About
                    </Link>
                    <Link href="/create">
                        Create
                    </Link>
                    {user && (
                        <Logout/>
                    )}
                </Flex>


            </Flex>
        </Flex>
    )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    beforeLoad: async ({context}) => {
        try {
            const data = await context.queryClient.fetchQuery(userQueryOptions)
            return data
        } catch (error) {
            console.error(error)
            return {user: null}
        }
    },
    component: () => (
        <>
            <Navbar/>
            <Box padding="4">
                <Outlet/>
            </Box>
        </>
    ),
})

