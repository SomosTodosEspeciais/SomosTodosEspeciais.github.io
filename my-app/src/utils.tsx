const validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) ;
};

const verifyPassword = (password:string,sdpassword:string) => {
    return password === sdpassword
}

const validateName = (name:string) => {
    const nameRegex = /^[a-zA-Z\s-]+$/;
    return nameRegex.test(name);
  };

  const validatePassword = (password: string) => {
    const minLength = 6;
    const numberOrSymbolRegex = /[0-9!@#$%^&*(),.?":{}|<>]/;
  
    if (password.length <= minLength) {
      return false;
    }
    if (!numberOrSymbolRegex.test(password)) {
      return false;
    }
    return true;
  };
  
  export { validateEmail, verifyPassword, validateName, validatePassword };
  