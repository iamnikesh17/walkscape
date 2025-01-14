import './App.css';
import { Footer, Header } from './components';
import { AllRoutes } from './routes/AllRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Header/>
      <main>
          <AllRoutes/>
          <ToastContainer autoClose={3000} position="bottom-right"/>
      </main>
      <Footer/>
    </>
  );
}

export default App;
