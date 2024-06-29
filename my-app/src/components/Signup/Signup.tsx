import React, { useState } from 'react';
import { createUserWithEmailAndPassword, AuthError, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import Close from './../../assets/close.png';
import{verifyPassword, validateEmail,validateName,validatePassword} from '../../utils'
import './Signup.css';

interface SignupProps {
  onClose: () => void;
}

const Signup: React.FC<SignupProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [sdPassword, setSdPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const db = getFirestore();


  function hadleNameInput(name:string){
    if(name.length <= 0){
      return "\nO nome é um campo obrigatório"
    }

    if (!validateName(name)) {
      return "\nO nome contém caracteres inválidos";
    }

    return ""
  }

  
  function hadlePasswordInput(password:string,sdpassword:string){
    if(password.length <= 0){
      return "\nA palavra-passe é um campo obrigatório"
    }
    if(sdpassword.length <= 0){
      return "\nA confirmação da palavra-passe é um campo obrigatório"
    }

    if (!validatePassword(password)) {
      return "\nA palavra-passe deve ter mais de 6 caracteres e conter pelo menos um número ou símbolo";
    }

    if(!verifyPassword(password,sdpassword)){
      return "\nAs palavras-passe não coincidem."
    }
    
    return ""
  }

  function hadleEmailInput(email:string){
    if(email.length <= 0){
      return "\nO email é um campo obrigatório"
    }

    if(!validateEmail(email)){
      return "\nEmail inválido"
    }

    return ""
  }

  function validateInput() {
    let errosName:string
    let errosPassword:string
    let errosEmail:string
    errosName = hadleNameInput(name)
    errosEmail = hadleEmailInput(email)
    errosPassword = hadlePasswordInput(password,sdPassword)

    return errosName + errosEmail + errosPassword
  }

  function handleErros(error:string){
    if(error === 'auth/email-already-in-use'){
      return("O e-mail dado já esta em utilização")
    }

    return ""

  }



  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let temp_message:string = ""

    temp_message = validateInput()

    if(temp_message.length>0){
      setMessage(temp_message)
      return
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

      
      await sendEmailVerification(user);

      
      setName('');
      setEmail('');
      setPassword('');
      setSdPassword('');
      setMessage('Um e-mail de verificação foi enviado para o seu endereço de e-mail.');

    } catch (error) {
      const authError = error as AuthError;
     
      setMessage(handleErros(authError.code))
      
    }
  };

  return (
    <div className="SignUp">
      <form className='signUp-form' onSubmit={onSubmit}>
        <div className="modal-close">
          <img src={Close} alt='' onClick={onClose} />
        </div>
        <label>
          Nome*
          <input value={name} onChange={(event) => setName(event.target.value)} type="text" name="name"  />
        </label>
        <label>
          Email*
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" name="email"  />
        </label>
        <label>
          Senha*
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" name="password"  />
        </label>
        <label>
          Repetir Senha*
          <input value={sdPassword} onChange={(event) => setSdPassword(event.target.value)} type="password" name="2password"  />
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
