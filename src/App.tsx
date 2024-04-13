import { Router } from "./routes/router"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() { 

  return (
  <>
    <Router />
    <ToastContainer />
  </>
  )
}

export default App
