import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar' 
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Footer from './components/Footer/Footer'
import AddPostPage from './pages/AddPostPage';
import NotFoundPage from './pages/NotFoundPage';
import EditPostPage from './pages/EditPostPage';

import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext';
import { PostsProvider } from './context/PostsContext';

import { ToastContainer, toast, Bounce } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css'


function App() {

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <PostsProvider>
            <Router>
              <Navbar/>
              <Routes>
                <Route path='/' element={<HomePage/>}/>              
                <Route path='login' element={<LoginPage/>}/>              
                <Route path='signup' element={<SignupPage/>}/>              
                <Route path='addpost' element={<AddPostPage/>}/>              
                <Route path="/edit-post/:postId" element={<EditPostPage />} />
                <Route path='*' element={<NotFoundPage/>}/>              
              </Routes>
              <Footer/>
            </Router>
          </PostsProvider>
        </AuthProvider>
      </ThemeProvider>

      <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
      />
    </>
  )
}

export default App