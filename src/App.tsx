import React from 'react'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";

import { store } from "./store";
import Router from './routes'

const App = () => {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <SnackbarProvider maxSnack={3}>
                  <Router />
              </SnackbarProvider>
          </BrowserRouter>
      </Provider>
  )
}

export default App
