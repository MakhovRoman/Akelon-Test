import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@components/app'
import '@styles/index.scss'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/muiComponents'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
