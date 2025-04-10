import './App.css'
import '@telegram-apps/telegram-ui/dist/styles.css';
import { useEffect } from 'react';
import WebApp from 'mk-start-sdk';
import { BrowserRouter } from 'react-router-dom';
import Info from './Info';
// import Lottie from './Lottie';
// import QRCodeGenerator from './QRcode';
import { Toaster } from 'sonner';
import Download from './Download';
import QRCodeGenerator from './QRcode';

function App() {
  useEffect(() => {
    WebApp.enableClosingConfirmation()
  }, [])
  return (
    <>
      <BrowserRouter>
          <Info />
          {/* <Lottie /> */}
          <QRCodeGenerator />
          {/* <Download /> */}
          <Toaster 
            position='top-center'
          />
      </BrowserRouter>
    </>
  )
}

export default App
