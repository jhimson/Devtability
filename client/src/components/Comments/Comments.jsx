import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';

// ! API
import { fetchComment } from '../../utils/comments-api';

const Comments = ({ commentId }) => {
  const [comment, setComment] = useState({});

  const getComment = async () => {
    const response = await fetchComment(commentId);
    if (response.data) {
      setComment(response.data);
    }
  };

  useEffect(() => {
    getComment();
  }, [commentId]);

  return (
    <>
      <div className="w-full bg-gray-50 rounded-2xl px-6 py-4 shadow-lg hover:shadow-2xl transition duration-500 mb-4">
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
                {comment?.user.name} •{' '}
                <span className="font-normal">
                  {format(comment?.createdAt)}
                </span>
              </div>
            </div>
          </div>
          {/*  */}
          <p className="text-md text-gray-600 mt-2">{comment?.text}</p>
        </div>
      </div>
    </>
  );
};

export default Comments;
