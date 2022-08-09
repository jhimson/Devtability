/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useRef, useContext } from 'react';
import { Spring, animated } from 'react-spring';
import { Link, useNavigate } from 'react-router-dom';
import signupImg from '../../assets/images/signupImg.jpg';
import { useForm } from 'react-hook-form';

// ! API ACTIONS
import { Signup } from '../../utils/users-api';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';
import Alert from '../Alert/Alert';

export default function SignUpForm() {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  const { alertMessage, setAlertMessage } = useContext(AlertContext);

  //! STATES
  const [data, setData] = useState({
    name: '',
    address: '',
    email: '',
    password: '',
    error: '',
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  //! FUNCTIONS!
  const handleFormSubmit = async (data) => {
    // evt.preventDefault();
    try {
      const formData = { ...data };
      delete formData.error;
      delete formData.confirm;
      //   const user = await signUp(formData);
      const response = await Signup(formData);
      if (response) {
        console.log(response.data);
        setAlertMessage({
          message: `Please verify your email to login using your account.`,
          type: 'info',
        });
        navigate('/login', { replace: true });
      }
      // console.log('wtf',response);
      // setUser(user);
      // if (response.data.value === 1) {
      //   const token = JSON.parse(
      //     window.atob(response.data.accessToken.split('.')[1])
      //   );
      //   console.log(token.user);
      //   localStorage.setItem(
      //     'token',
      //     JSON.stringify(response.data.accessToken)
      //   );
      //   setUser(token.user);
      // }
      // if (user) navigate('/login', { replace: true });
    } catch (error) {
      // An error occurred
      console.log(`Invalid Email/Password!`);
      console.log(`Failed to Signup. ErrorMessage:${error}`);
      setData({ ...data, error: 'Sign Up Failed - Try Again!' });
    }
  };

  const handleChange = (evt) => {
    setData({ ...data, [evt.target.name]: evt.target.value, error: '' });
  };

  const disable = data.password !== data.confirm;
  return (
    <>
      <Spring
        from={{ opacity: 0, marginLeft: -1000 }}
        to={{ opacity: 1, marginLeft: 0 }}
      >
        {(props) => (
          <animated.div style={props}>
            <div className="bg-none flex items-center justify-center w-full rounded overflow-hidden my-20">
              <div
                className="flex justify-center bg-gray-900 h-full w-1/2 rounded"
                style={{ height: '80vh' }}
              >
                <div
                  className="hidden bg-cover lg:block lg:w-2/3 rounded"
                  style={{
                    width: '60vh',
                    backgroundImage: `url(${signupImg})`,
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
                        Signup to create an account
                      </p>
                    </div>

                    <div className="mt-8">
                      <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div>
                          <label
                            for="name"
                            className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            // value={data.name}
                            // onChange={handleChange}
                            {...register('name', {
                              value: data.email,
                              onChange: handleChange,
                              required: 'Name is required',
                              minLength: 3,
                            })}
                            id="name"
                            placeholder="e.g. John Doe"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                          {errors?.name?.type === 'required' && (
                            <p className="text-white bg-red-500 text-center mt-1 rounded font-bold px-2 py-1 text-sm">
                              This field is required
                            </p>
                          )}
                          {errors?.name?.type === 'minLength' && (
                            <p className="text-white bg-red-500 text-center mt-1 rounded font-bold px-2 py-1 text-sm">
                              Must have atleast 3 characters
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            for="address"
                            className="block mb-2 text-sm text-gray-600 dark:text-gray-200 mt-4"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            // value={data.name}
                            // onChange={handleChange}
                            {...register('address', {
                              value: data.address,
                              onChange: handleChange,
                              required: 'Address is required',
                              minLength: 3,
                            })}
                            id="address"
                            placeholder="e.g. New York, NY"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                          {errors?.address?.type === 'required' && (
                            <p className="text-white bg-red-500 text-center mt-1 rounded font-bold px-2 py-1 text-sm">
                              This field is required
                            </p>
                          )}
                          {errors?.address?.type === 'minLength' && (
                            <p className="text-white bg-red-500 text-center mt-1 rounded font-bold px-2 py-1 text-sm">
                              Must have atleast 3 characters
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            for="email"
                            className="block mb-2 text-sm text-gray-600 dark:text-gray-200 mt-4"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            // value={data.email}
                            // onChange={handleChange}
                            {...register('email', {
                              value: data.email,
                              onChange: handleChange,
                              required: 'Email is required',
                            })}
                            id="email"
                            placeholder="Devtability@executive.com"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                          {errors?.email?.type === 'required' && (
                            <p className="text-white bg-red-500 text-center mt-1 rounded font-bold px-2 py-1 text-sm">
                              This field is required
                            </p>
                          )}
                        </div>

                        <div className="mt-4">
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
                            // value={data.password}
                            // onChange={handleChange}
                            {...register('password', {
                              value: data.password,
                              onChange: handleChange,
                              required: 'Password is required',
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
                        </div>

                        <div className="mt-6">
                          <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                          >
                            Sign up
                          </button>
                        </div>
                      </form>

                      <p className="mt-6 text-sm text-center text-gray-400">
                        have an account yet?{' '}
                        <Link
                          to="/login"
                          className="text-blue-500 focus:outline-none focus:underline hover:underline"
                        >
                          Sign in
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
