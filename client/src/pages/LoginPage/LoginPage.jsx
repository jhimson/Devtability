import React, { useContext, useState } from 'react';

// ! API ACTIONS
import { Login } from '../../utils/users-api';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

const LoginPage = () => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);

  //! States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ! FUNCTIONS
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Login({email, password });
    console.log(res);
    if (res) {
      const token = JSON.parse(window.atob(res.data.accessToken.split('.')[1]));
      console.log(token.user);
      localStorage.setItem('token', JSON.stringify(res.data.accessToken));
      setUser(token.user);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value={`Submit`} />
      </form>
    </div>
  );
};

export default LoginPage;
