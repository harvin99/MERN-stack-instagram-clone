import axios from "../axios.config";

const getAllPost = () => {
  return axios(`/posts`, {
      method : "get"
  });
};
const getUserById = (id) => {
    return axios(`/users/user/${id}`, {
        method : "get"
    })
}
const getAllPostOfUser = (userId) => {
    return axios(`/posts/${userId}`, {
        method : 'get'
    })
}
const getOwnerOfPost = (ownByUserId) => {
    return axios(`/posts/post/getOwnerPost/${ownByUserId}`, {
        method : 'get'
    })
}
const getPostById = (postid) => {
    return axios(`/post/${postid}`, {
        method: 'get'
    })
}
const postLike = (postId) => {
    const info = JSON.parse(localStorage.getItem("usertoken"))
    
    const accessToken = `Bearer ${info.accessToken}`
    
    return axios(`/posts/post/like/${postId}`,{
        method: "post",
        headers: {
            Authorization: accessToken,
        }
    })
}
const postUnLike = (postId) => {
    const info = JSON.parse(localStorage.getItem("usertoken"))
    
    const accessToken = `Bearer ${info.accessToken}`

    return axios(`/posts/post/unlike/${postId}`,{
        method: "post",
        headers: {
            Authorization: accessToken,
        }
    })
}
const commentPost = (postId, text) => {
    const info = JSON.parse(localStorage.getItem("usertoken"))
    
    const accessToken = `Bearer ${info.accessToken}`

    return axios(`/posts/post/comment/${postId}`, {
        method : "post", 
        headers: {
            Authorization: accessToken,
        },
        data : {
            text : text
        }
    })
}
const createNewPost = (caption, base64EncodedImage) => {
    const info = JSON.parse(localStorage.getItem("usertoken"))
    
    const accessToken = `Bearer ${info.accessToken}`

    return axios(`/posts/createnewpost`, {
        method: 'post',
        headers: {
            Authorization: accessToken,
        },
        data : {
            caption : caption,
            file : JSON.stringify({ data: base64EncodedImage })
        }
    })
}
export default {
    getAllPost,
    getUserById,
    getAllPostOfUser,
    getPostById,
    postLike,
    postUnLike,
    commentPost,
    createNewPost,
    getOwnerOfPost
  };