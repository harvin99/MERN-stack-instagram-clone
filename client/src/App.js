import React, { useState, useEffect, useContext } from "react";
import InstagramEmbed from "react-instagram-embed";
import classnames from "classnames";

import Post from "./components/Post";
import ImageUpload from "./components/ImageUpload";
import { PostContext } from "./Contexts/PostContext";

import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import "./App.css";

import AuthService from "./services/auth.service";
import UserService from "./services/user.service";

import Plus from "./plus.svg";

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
    width: 400,
    height: 450,
    backgroundColor: theme.palette.background.paper,
    border: "none",
    outline: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "3px",
  },
  paperUpload: {
    position: "relative",

    border: "none",
    outline: "none",

    padding: theme.spacing(2, 4, 3),
    borderRadius: "3px",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: "10px",
  },
}));

function App() {
  const classes = useStyles();

  //const [posts, setPosts] = useState([]);
  const [posts, setPosts] = useContext(PostContext)
  
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openUploadForm, setOpenUploadForm] = useState(false);

  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayAdd, setDisplayAdd] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await AuthService.getCurrentUser();
        //console.log(userLoggedIn)
        if (data) {
          //User has logged in...
          setUser(data.user);
        } else {
          //User has logged out ...
          setUser(null);
        }
      } catch (error) {
        console.log(error.message || error.response.data.msg);
      }
    }
    fetchData();
  }, [user, email]);

  useEffect(() => {
    //Get all post and sort
    async function fetchData() {
      try {
        const fetchedData = await UserService.getAllPost();

        setPosts(fetchedData.data.posts);
      } catch (error) {
        console.log(error.message || error.response.data.msg);
      }
    }
    fetchData();
  }, []);
  const signUp = (event) => {
    event.preventDefault();
    const fetchDataSignUp = async function () {
      try {
        //Register
        await AuthService.register(username, email, password, confirmPassword);
        setOpen(false);
      } catch (error) {
        console.log(error.message || error.response.data.msg);
      }
    };
    fetchDataSignUp();
  };
  const signIn = (event) => {
    event.preventDefault();
    const fetchDataSignIn = async function () {
      try {
        //Login
        await AuthService.login(email, password);

        const currentUser = AuthService.getCurrentUser();
        //console.log(currentUser)
        setUser(currentUser.user);
        setOpenSignIn(false);
      } catch (error) {
        console.log(error.message || error.response.data.msg);
      }
    };
    fetchDataSignIn();
  };
  // const resetPwd = (event) => {
  //   event.preventDefault()
  //   debugger;
  //   auth.sendPasswordResetEmail(emailToResetPwd)
  //     .then(function () {
  //       // Email sent.
  //       console.log("An Email has been sent. Please check your inbox and verify !")
  //     })
  //     .catch(function (error) {
  //       // An error happened.
  //     });
  //     setOpenResetPwd(false)
  //     setOpenSignIn(false)
  // }
  const handleClickAddBtn = (event) => {
    event.preventDefault();
    setOpenUploadForm(true);
    setDisplayAdd(false);
  };
  const handleCloseModel = (event) => {
    event.preventDefault();
    setOpenUploadForm(false);
    setDisplayAdd(true);
  };
  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form action="" className="App__signup">
            <center>
              <div className="form__login">
                <div className="logo">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
                    alt=""
                  />
                </div>
                <div className="form__input">
                  <input
                    className="input__text"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="input__text"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="input__text"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    className="input__text"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn__signup" onClick={signUp}>
                  Sign Up
                </button>
              </div>
            </center>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form action="" className="App__signup">
            <center>
              <div className="form__login">
                <div className="logo">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
                    alt=""
                  />
                </div>
                <div className="form__input">
                  <input
                    className="input__text"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="input__text"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn__signup" onClick={signIn}>
                  Sign In
                </button>
                {/* <a
                  className="forgot__pwd"
                  href="#forgot__pwd"
                  onClick={() => setOpenResetPwd(true)}
                >
                  Forgot password ?
                </a> */}
                <div className="register">
                  <h4>
                    Don't have a account ?{" "}
                    <strong>
                      <a href="#register">Register</a>
                    </strong>
                  </h4>
                </div>
              </div>
            </center>
          </form>
        </div>
      </Modal>

      {/* <Modal open={openResetPwd} onClose={() => setOpenResetPwd(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form action="" className="App__signup">
            <center>
              <div className="form__resetpwd">
                <div className="logo">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
                    alt=""
                  />
                </div>
                <input
                  className="input__text"
                  type="text"
                  placeholder="Enter a email..."
                  onChange = {(event) => setEmailToResetPwd(event.target.value)}
                />
                <button
                  type="submit"
                  className="btn__signup"
                  onClick={resetPwd}
                >
                  Reset Password
                </button>
              </div>
            </center>
          </form>
        </div>
      </Modal> */}

      <div className="App__header">
        <img
          className="App__headerImage"
          src="https://tattoome.eu/themes/theme059/img/instagram_topic.png"
          alt="logo"
        />
        {user ? (
          <Button className="btn__login" onClick={() => AuthService.logout()}>
            Log Out
          </Button>
        ) : (
          <div className="App__loginContainer">
            <Button className="btn__login" onClick={() => setOpenSignIn(true)}>
              Sign In
            </Button>
            <Button className="btn__login" onClick={() => setOpen(true)}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
      <center>
        <h1>Tran Van Hung clone instagram</h1>
      </center>
      <div className="App__post">
        <div className="App__postLeft">
          {posts.map((post, index) => (
            <Post
              key={index}
              postId={post._id}
              userLoggedIn={user}
              caption={post.caption}
              imageUrl={post.imageUrl}
              ownByUser={post.ownByUser} //post own by user
              comments={post.comments}
              likeOfPost={post.likeOfPost}
            />
          ))}
        </div>
        <div className="App__postRight">
          {user ? (
            <div className="info__user">
              <Avatar className={classes.large} alt="" src={user.avatarUrl} />
              <div>
                <h3 className="username">{user.username}</h3>
                <h2 className="email">{user.email}</h2>
              </div>
            </div>
          ) : (
            <InstagramEmbed
              url="https://www.instagram.com/p/Bl0VJcmF0R-/"
              maxWidth={320}
              hideCaption={false}
              containerTagName="div"
              protocol=""
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
              className="postRight"
            />
          )}
        </div>
      </div>
      {user ? (
        <div>
          <div
            className={classnames("add", {
              hidden__addBtn: displayAdd === false,
            })}
            onClick={handleClickAddBtn}
          >
            <img src={Plus} alt=""></img>
          </div>
          <Modal open={openUploadForm} onClose={handleCloseModel}>
            <div style={modalStyle} className={classes.paperUpload}>
              <ImageUpload username={user.username} />
            </div>
          </Modal>
        </div>
      ) : (
        <div className="si__to__upload">
          <h3>Sign In to Upload</h3>
        </div>
      )}
    </div>
  );
}

export default App;
