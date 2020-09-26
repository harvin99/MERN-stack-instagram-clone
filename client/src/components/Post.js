import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import "./Post.css";
import UserService from "../services/user.service";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    width: 600,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: "none",
    outline: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "3px",
  },
}));

function Post({
  postId,
  userLoggedIn,
  ownByUser,
  imageUrl,
  caption,
  comments,
  likeOfPost,
}) {
  //Modal
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [openTimeLine, setOpenTimeLine] = useState(false);
  //
  const [listComment, setListComment] = useState([]);
  const [comment, setComment] = useState("");

  const [canLike, setCanLike] = useState(true);
  const [likes, setLikes] = useState({});
  const [like, setLike] = useState(0)

  const [allPostOfUser, setAllPostOfUser] = useState([]);
  const [userOfPost, setUserOfPost] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await UserService.getOwnerOfPost(ownByUser);
        setUserOfPost(response.data.user);
      } catch (error) {
        console.log(error.msg);
      }
    }
    fetchData();
  }, [ownByUser]);

  useEffect(() => {
    let sortComments = comments.sort((c2, c1) => c1.timestamp - c2.timestamp);
    setListComment(sortComments);
  }, [postId, comments]);

  useEffect(() => {
    //Get like
    if (postId) {
      setLikes(likeOfPost);
    }
  }, [postId, likeOfPost]);

  useEffect(() => {
    setLike(likes.likeNumber)
  }, [likes])

  const postComment = (event) => {
    event.preventDefault();
     UserService.commentPost(postId, comment).then(
       (response) => {
         setListComment(response.data.comments)
         setComment("")
       }
     )
  };
  const likePost = (event) => {
    event.preventDefault();
    UserService.postLike(postId)
      .then((response) => {
        //console.log("Handled !");
        console.log(response.data);
        setLike(response.data.totalLike);
        setCanLike(false);
      })
      .catch((error) => console.log(error.message));
  };
  const unLikePost = (event) => {
    event.preventDefault();

    UserService.postUnLike(postId)
    .then(
      (response) => {
        setLike(response.data.totalLike);
        setCanLike(true);
    });
  };
  useEffect(() => {
    async function fetchData() {
      //time line
      try {
        const response = await UserService.getAllPostOfUser(ownByUser);
        setAllPostOfUser(response.data.allPostOfUser);
      } catch (error) {
        console.log(error.msg);
      }
    }
    fetchData()
  }, [ownByUser]);
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="" src={userOfPost.avatarUrl} />
        <h3 className="username" onClick={() => setOpenTimeLine(true)}>
          {userOfPost.username}
        </h3>
        <Modal open={openTimeLine} onClose={() => setOpenTimeLine(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form action="" className="App__signup">
              <center>
                <div class="container__timeline">
                  <div class="timeline__header">
                    <Avatar
                      className="post__avatar"
                      alt=""
                      src={userOfPost.avatarUrl}
                    />
                    <h3>{userOfPost.username}</h3>
                  </div>
                  <div class="timeline__images">
                    {allPostOfUser.map((post, index) => (
                      <img src={post.imageUrl} key={index} alt="post" ></img>
                    ))}
                  </div>
                </div>
              </center>
            </form>
          </div>
        </Modal>
      </div>
      <img className="post__image" src={imageUrl} alt="" />

      <div className="btn__like__container">
        {canLike ? (
          <FavoriteBorderIcon
            className="btn__like"
            onClick={
              userLoggedIn ? likePost : () => alert("You need to sign in !")
            }
          />
        ) : (
          <FavoriteIcon
            className="btn__like"
            onClick={
              userLoggedIn ? unLikePost : () => alert("You need to sign in !")
            }
          />
        )}
      </div>

      <h4 className="post__like">{like} likes</h4>
      <h4 className="post__text">
        <strong> {userOfPost.username} </strong> {caption}
      </h4>
      <div className="post__comments">
        {listComment.map((comment, index) => (
          <p key={index}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      <form className="form__comment">
        <input
          className="input__textComment"
          type="text"
          value={comment}
          placeholder="Add a comment..."
          onChange={(event) => setComment(event.target.value)}
        />
        <button
          className="btn__post"
          type="submit"
          disabled={!comment}
          onClick={
            userLoggedIn ? postComment : () => alert("You need to sign in !")
          }
        >
          Post
        </button>
      </form>
    </div>
  );
}

Post.propTypes = {
  postId: PropTypes.string,
  userLoggedIn: PropTypes.shape({
    _id: PropTypes.string,
    username : PropTypes.string,
    email : PropTypes.string,
    pasword : PropTypes.string,
    ROLE : PropTypes.string,
    avatarUrl : PropTypes.string
  }),
  ownByUser: PropTypes.string,
  caption: PropTypes.string,
  imageUrl: PropTypes.string,
  comments: PropTypes.array,
  likeOfPost: PropTypes.shape({
    likeNumb: PropTypes.number,
    peopleLike: PropTypes.array,
  }),
};

export default Post;
