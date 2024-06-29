import React, { useState } from 'react';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './Login.css';
import Close from './../../assets/close.png';
import Button from '@mui/material/Button';


interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const db = getFirestore();

  function handleError(error:string){
    if(error === "auth/invalid-credential"){
      return "Email ou Palavra-Pass incorretos, tente novamente"
    }
    return ""
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); // Limpa mensagens anteriores

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const isAdmin = userData?.role === 'admin';

          if (isAdmin) {
            
            onClose();
            navigate("/admin");
          } else {
            
            onClose();
            navigate("/");
          }
        } else {
          setMessage('Erro ao obter informações do usuário.');
        }
      } else {
        setMessage('Por favor, verifique seu e-mail antes de fazer login.');
        auth.signOut(); // Faz o logout automático se o e-mail não estiver verificado
      }
    } catch (error) {
      const authError = error as AuthError;
      console.log(authError.code, authError.message);
      setMessage(handleError(authError.code));
    }
  };

  return (
    <>
      <div className="Login">

        <form className='signUp-form' onSubmit={handleSubmit}>
        <div  className="modal-close" >
          <img src={Close} alt=''onClick={onClose} />

        </div>
          <label>
            Email:
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              name="email"
              required
            />
          </label>
          <label>
            Password:
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              name="password"
              required
            />
          </label>
          <div className='error'>
            {message && <p>{message}</p>}
          </div>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              border: "1px solid black",
              backgroundColor: "black",
              color: "white",
              '&:hover': {
                backgroundColor: "#252525"
              },
              marginTop: "20px",
              width: "55%",
              marginBottom: "25px"

            }}

          >
            Login
          </Button>
        </form>
        <div className='pretty-img'></div>
      </div>
    </>
  );
};

export default Login;
