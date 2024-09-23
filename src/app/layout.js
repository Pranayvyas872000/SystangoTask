import Providers from '../component/redux/Provider';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import "./globals.css";
import "./page.css";


export const metadata = {
  manifest: "/manifest.json",
  title: "Syatango Task",
  description: "It's a simple progressive web application made with NextJS",
}
export default function RootLayout({ children }) {


  
  return (
    <html lang="en">
      <body >
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  )
}
