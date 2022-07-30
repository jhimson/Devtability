import React, { useState } from 'react';

//! API
import { createReply } from '../../utils/replies-api';

const ReplyForm = ({
  isReplying,
  user,
  comment,
  getComment,
  setIsReplying,
}) => {
  const [replyText, setReplyText] = useState('');

  const addReply = async (userId, commentId, text) => {
    const response = await createReply({ userId, commentId, text });
    if (response) {
      console.log(`Successfully Added reply`);
      setIsReplying(false);
      setReplyText('');
      getComment();
    }
  };

  return (
    <>
      {isReplying && (
        <div className="mb-2 flex space-x-2 items-end">
          <img
            className="w-9 h-9 rounded-full"
            src={user?.image}
            alt=""
          />
          <form
            className="w-full mt-2"
            onSubmit={(e) => {
              e.preventDefault();
              //   alert(replyText);
              console.log('Fucker', user?._id)
              addReply(user?._id, comment?._id, replyText);
              //   updateComment(comment?._id, commentText);
              //   setUpdatingComment(false);
            }}
          >
            <input
              type="text"
              className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              style={{ borderRadius: '25px' }}
              placeholder="Post a comment..."
              autoComplete="off"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default ReplyForm;
