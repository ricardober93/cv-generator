import {createRouter, RouterProvider} from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
// Import your routes
import {routeTree} from './routeTree.gen'

const queryClient = new QueryClient()


const router = createRouter({ routeTree, context: { queryClient } })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <Provider>
          <RouterProvider router={router} />
          <Toaster />
          </Provider>
      </QueryClientProvider>
    </React.StrictMode>,
  )
}
