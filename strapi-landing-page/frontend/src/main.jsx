import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './templates/Home/App.jsx'

import { GlobalStyled } from './styles/global-styles.js'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyled />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
