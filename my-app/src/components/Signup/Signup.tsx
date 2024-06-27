import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, AuthError, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import Close from './../../assets/close.png';

import './Signup.css';

interface SignupProps {
  onClose: () => void;
}

const Signup: React.FC<SignupProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [sdPassword, setSdPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const db = getFirestore();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== sdPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Adicionar informações de papel ao Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        role: 'user'
      });

      // Enviar e-mail de verificação
      await sendEmailVerification(user);

      // Limpar os campos do formulário e exibir mensagem
      setName('');
      setEmail('');
      setPassword('');
      setSdPassword('');
      setMessage('Um e-mail de verificação foi enviado para o seu endereço de e-mail.');

    } catch (error) {
      const authError = error as AuthError;
      console.log(authError.code, authError.message);
      setMessage('Erro ao criar a conta: ' + authError.message);
    }
  };

  return (
    <div className="SignUp">
      <form className='signUp-form' onSubmit={onSubmit}>
        <div className="modal-close">
          <img src={Close} alt='' onClick={onClose} />
        </div>
        <label>
          Nome:
          <input value={name} onChange={(event) => setName(event.target.value)} type="text" name="name" required />
        </label>
        <label>
          Email:
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" name="email" required />
        </label>
        <label>
          Senha:
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" name="password" required />
        </label>
        <label>
          Repetir Senha:
          <input value={sdPassword} onChange={(event) => setSdPassword(event.target.value)} type="password" name="2password" required />
        </label>
        <div className='error'>
          {message && <p>{message}</p>}
        </div>

        <Button
          type="submit"
          variant="contained"
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
          Criar Conta
        </Button>
      </form>
    </div>
  );
};

export default Signup;
