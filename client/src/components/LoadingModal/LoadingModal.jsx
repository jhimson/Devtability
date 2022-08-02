import React from 'react';
import { Spring, animated } from 'react-spring';
import ReactLoading from 'react-loading';


const LoadingModal = ({ isLoading }) => {
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {(props) => (
        <animated.div style={props}>
          <div
            className={`flex flex-col space-y-4 min-w-screen opacity-70 h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-1000 outline-none bg-gray-300 focus:outline-none  ${
              isLoading ? null : 'hidden'
            }`}
          >
            <div className="flex flex-col p-8 bg-gray-800 shadow-md hover:shodow-lg rounded-2xl opacity-100">
              <div className="flex flex-col items-center justify-between">
                <div className="flex items-center">
                  <div className="flex flex-col ml-3">
                    <div className="font-medium leading-none text-gray-100 text-4xl">
                      <ReactLoading
                        type={'bars'}
                        color={'#0047AB'}
                        height={150}
                        width={150}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </Spring>
  );
};

export default LoadingModal;
