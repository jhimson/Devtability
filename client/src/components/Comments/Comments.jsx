import React from 'react';

const Comments = () => {
  return (
    <>
      <div className="bg-gray-50 w-full rounded-2xl px-6 py-4 shadow-lg hover:shadow-2xl transition duration-500 mb-4">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80"
                  alt=""
                />
              </div>
              <div className="text-sm font-semibold">
                John Lucas • <span className="font-normal"> 5 minutes ago</span>
              </div>
            </div>
          </div>
          {/*  */}
          <p className="text-md text-gray-600 mt-2">
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happines.
          </p>
        </div>
      </div>
    </>
  );
};

export default Comments;
