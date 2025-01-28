
import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "../api/manager";
import { Navbar } from "@components/Navbar/Nabvar";

interface MyRouterContext {
  queryClient: QueryClient;
}


export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context }) => {
    try {
      const data = await context.queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (error) {
      console.error(error);
      return { user: null };
    }
  },
  component: ({  }) => {
    const { user } = Route.useRouteContext();
    return(

      <main className="min-h-full h-dvh">
      <Navbar user={user}/>
        <Outlet />
      </main>
  )},
});
