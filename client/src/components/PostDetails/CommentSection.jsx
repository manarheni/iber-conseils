import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
    setComments(newComments);
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="comments-container">
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Commentaires</Typography>
          {comments?.map((c, i) => (
            <div key={i} className="flex start comment" >
              <strong>{c.split(': ')[0]}</strong>
              <span>{c.split(':')[1]}</span>
            </div>
          ))}
        <div ref={commentsRef} />
        </div>
        <div className="comment-input" style={{ width: '33.66%' }}>
          <Typography gutterBottom variant="h6">Écrire un commentaire</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
