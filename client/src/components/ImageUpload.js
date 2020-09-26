import React, {useState, useContext} from 'react'
import {Button} from '@material-ui/core'

import {PostContext} from '../Contexts/PostContext'

import './ImageUpload.css';
import UserService from '../services/user.service';


function ImageUpload({username}) {

    const [posts, setPosts] = useContext(PostContext)
    
    const [caption, setCaption] = useState('')
    const [previewSource, setPreviewSource] = useState('')

    const [selectedFile, setSelectedFile] = useState('')
    
    //const [isComplete , setIsComplete] = useState(false)
 
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
  };

  const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          setPreviewSource(reader.result);
      };
  };

  const handleSubmitFile = (e) => {
      e.preventDefault();

      if (!selectedFile) return;
      
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
          UserService.createNewPost(caption, reader.result).then(
            (response) => {
              console.log(response.data.msg);
              console.log(response.data.currenAllPost);
              setPosts(response.data.currenAllPost)
              window.location.reload()
            }
          )
      };

      reader.onerror = () => {
          console.error('AHHHHHHHH!!');
          
      };
  };

    return (
      <div className="container__upload">
        <div className="upload__image">
          
            <form className="post__area" onSubmit = {handleSubmitFile}>
            <input
              className="input__text"
              type="text"
              value={caption}
              placeholder="Enter a caption..."
              onChange={(event) => setCaption(event.target.value)}
            />
            <div className="post__upload">
              <div className="input__file">
                <button className="btn__image">Images</button>
                <input
                  className="upload__file"
                  type="file"
                  name= "imagePost"
                  onChange={handleFileInputChange}
                />
                
              </div>
              <Button color="primary" type="submit">
                Post
              </Button>
            </div>
            {/* {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )} */}
            </form>
            
        </div>
        
      </div>
    );
}

export default ImageUpload
