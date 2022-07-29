import React, { useState } from 'react';
import Reply from '../Reply/Reply';

const Replies = ({ comment, user, getComment }) => {
  const [updatingReply, setUpdatingReply] = useState(false);
  return (
    <>
      <hr className="mb-2" />
      {comment?.replies?.map((reply) => (
        <Reply
          comment={comment}
          user={user}
          reply={reply}
          getComment={getComment}
        />
      ))}
    </>
  );
};

export default Replies;
