import React, { useState } from 'react';
import Reply from '../Reply/Reply';

const Replies = ({ comment, user, getComment, setIsReplying, isReplying }) => {
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
          setIsReplying={setIsReplying}
          isReplying={isReplying}
        />
      ))}
    </>
  );
};

export default Replies;
