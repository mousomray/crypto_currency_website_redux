import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // For React Query
import Home from './Pages/Home'

const App = () => {

  // Create Query Client For React Query
  const queryClient = new QueryClient()

  const my_routing = [
    {
      path: '/',
      component: <Home />
    }
  ]

  return (
    <>
      {/*Cover with QueryClientProvider*/}
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {my_routing?.map((routing) => {
              return (
                <>
                  <Route path={routing?.path} element={routing?.component} />
                </>
              )
            })}
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
