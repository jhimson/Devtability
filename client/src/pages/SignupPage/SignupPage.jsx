import React, { useState, useContext } from 'react';
import { Signup } from '../../utils/users-api';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

const SignupPage = () => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);

  //! States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Signup({ name, email, password });
    console.log(res);
    if (res) {
      const token = JSON.parse(window.atob(res.data.accessToken.split('.')[1]));
      console.log('wtf', token.user);
      localStorage.setItem('token', JSON.stringify(res.data.accessToken));
      setUser(token.user);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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

export default SignupPage;
