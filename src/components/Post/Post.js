import CommentList from '../CommentList/CommentList'
import CreateCommentForm from '../CreateCommentForm/CreateCommentForm'
import * as postAPI from '../../utilities/posts-api'
import {Heart} from 'lucide-react'
// import { FaHeart } from "react-icons/fa"; /* used lucide & fill: red */
import { Rating } from 'react-simple-star-rating'
import {useState, useEffect} from 'react'
import styles from './Post.module.scss'

// import {getDownloadURL} from 'firebase/storage'

export default function Post(
    {post}
){

    //setup the url for the image to show it
    const [image, setImage] = useState('')
    // useEffect(()=>{getDownloadURL(post.pic).then((url)=>{
    //     setImage(url)
    // })},[])
    const[liked, setLiked] = useState(false);
   

    async function handleLikePost(postId) {
        
        try {
            await postAPI.likePost(postId);
            console.log('Post successfully liked');
           
        } catch (error) {
            console.error('Error liking post:', error);
        }
    }

    async function handleUnlikePost(postId) {
        
        try {
            await postAPI.unlikePost(postId);
            console.log('Post successfully unliked');
           
        } catch (error) {
            console.error('Error liking post:', error);
        }
    }
    return(
        post ?
        <div className={styles.post}>
            <h2 className={styles.title}>{post.title}</h2>
            <h3 className={styles.userName}>{post.user.name}</h3>
            <p className={styles.body}>{post.body}</p>
            <img src={post.pic}/>
            <h2 className={styles.dish}>{post.dish}</h2>
           
            <Rating
                initialValue={post.rating}
                readonly={true}
            />
            <div className={styles.likeContainer}>
                <p className={styles.likes}>{post.likes}</p>
            {/* <button onClick={()=>{handleLikePost(post._id)}}>like</button>
            <button onClick={()=>{handleUnlikePost(post._id)}}>unlike</button> */}

{
                liked?  <div  onClick={()=>{handleUnlikePost(post._id),setLiked(!liked)}} ><Heart color='red' fill='red' fontSize='30px'/></div>:
                <div  onClick={()=>{handleLikePost(post._id),setLiked(!liked)}} ><Heart color='gray' fontSize='30px'/></div>
              }

            <CommentList postId={post._id}/>
            <CreateCommentForm postId={post._id}/>

        </>
    )
}