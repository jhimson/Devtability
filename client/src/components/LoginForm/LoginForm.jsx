import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Spring, animated } from 'react-spring';
// import * as usersService from '../../utilities/users-service';
import loginImg from '../../assets/images/loginImg2.jpg';
import { useForm } from 'react-hook-form';

// ! API ACTIONS
import { Login } from '../../utils/users-api';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';
import Alert from '../Alert/Alert';

export default function LoginForm() {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  const { alertMessage, setAlertMessage } = useContext(AlertContext);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //! FUNCTIONS!
  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleFormSubmit(data) {
    try {
      const response = await Login(data);
      console.log(response);
      if (response.data.value === 1) {
        const token = JSON.parse(
          window.atob(response.data.accessToken.split('.')[1])
        );
        console.log(token.user);
        console.log(response.data.Message);
        localStorage.setItem(
          'token',
          JSON.stringify(response.data.accessToken)
        );
        setUser(token.user);
        setAlertMessage(null);
        if (user) navigate('/dashboard');
      } else {
        setAlertMessage({
          message: 'Please verify your email to login using your account.',
          type: 'info',
        });
      }
    } catch (error) {
      console.log(`Invalid Email/Password!`);
      setAlertMessage({
        message: 'Invalid Username/Password. Try again!',
        type: 'error',
      });
      console.log(`Failed to login. ErrorMessage:${error}`);
    }
  }

  return (
    <>
      <Spring
        from={{ opacity: 0, marginLeft: -1000 }}
        to={{ opacity: 1, marginLeft: 0 }}
      >
        {(props) => (
          <animated.div style={props}>
            {alertMessage && (
              <Alert
                message={alertMessage?.message}
                type={alertMessage?.type}
              />
            )}
            <div className="bg-none flex items-center justify-center w-full rounded overflow-hidden my-20">
              <div
                className="flex justify-center bg-gray-900 h-full w-1/2 rounded"
                style={{ height: '60vh' }}
              >
                <div
                  className="hidden bg-cover lg:block lg:w-2/3 rounded"
                  style={{
                    width: '60vh',
                    backgroundImage: `url(${loginImg})`,
                  }}
                >
                  <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                      <h2 className="text-4xl font-bold text-white">
                        Devtability
                      </h2>

                      <p className="max-w-xl mt-3 text-gray-300">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. In autem ipsa, nulla laboriosam dolores,
                        repellendus perferendis libero suscipit nam temporibus
                        molestiae
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                  <div className="flex-1">
                    <div className="text-center">
                      <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                        Devtability
                      </h2>

                      <p className="mt-3 text-gray-500 dark:text-gray-300">
                        Sign in to access your account
                      </p>
                    </div>

                    <div className="mt-8">
                      <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div>
                          <label
                            for="email"
                            className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                          >
                            Email Address
                          </label>
                          <input
                            type="text"
                            name="email"
                            // value={credentials.email}
                            // onChange={handleChange}
                            {...register('email', {
                              value: credentials.email,
                              onChange: handleChange,
                              required: 'Email is required',
                            })}
                            id="email"
                            placeholder="Devtability@Executive.com"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                          {errors?.email?.type === 'required' && (
                            <p className="text-white bg-red-500 text-center mt-1 rounded font-bold px-2 py-1 text-sm">
                              This field is required
                            </p>
                          )}
                        </div>

                        <div className="mt-6">
                          <div className="flex justify-between mb-2">
                            <label
                              for="password"
                              className="text-sm text-gray-600 dark:text-gray-200"
                            >
                              Password
                            </label>
                            <a
                              href="#"
                              className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                            >
                              Forgot password?
                            </a>
                          </div>

                          <input
                            type="password"
                            name="password"
                            // value={credentials.password}
                            // onChange={handleChange}
                            {...register('password', {
                              value: credentials.password,
                              onChange: handleChange,
                              required: 'Password is required!',
                              minLength: 3,
                              maxLength: 20,
                            })}
                            id="password"
                            placeholder="Enter Password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                          {errors?.password?.type === 'required' && (
                            <p className="text-white bg-red-500 text-center mt-1 rounded font-bold px-2 py-1 text-sm">
                              This field is required
                            </p>
                          )}
                          {errors?.password?.type === 'minLength' && (
                            <p className="text-white bg-red-500 text-center mt-1 rounded font-bold px-2 py-1 text-sm">
                              Must have atleast 3 characters
                            </p>
                          )}
                        </div>

                        <div className="mt-6">
                          <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>

                      <p className="mt-6 text-sm text-center text-gray-400">
                        have an account yet?{' '}
                        <Link
                          to="/signup"
                          className="text-blue-500 focus:outline-none focus:underline hover:underline"
                        >
                          Sign up
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </animated.div>
        )}
      </Spring>
    </>
  );
}
