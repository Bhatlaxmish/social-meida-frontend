import React,{useState,useEffect} from 'react'
import classes from './Card.module.css';
import Comments from './Comments';
import Input from "./Input";
import { VALIDATOR_REQUIRE } from './validators';
import { useForm } from './Formhook';



export default function Card(props) {
 
const [showcomment,setshowcomment]=useState(false);
const [liked,setliked]=useState(false);
const onClickHandler=()=>{
  setshowcomment(!showcomment);

 
}
 
const likeHandler=()=>{
setliked(!liked);
}




  const [formState, inputHandler, setFormData] = useForm(
    {
      Comment: {
        value: '',
        isValid: false
      },
      post:{
        value:props.postid,
        isValid:true
      }
    },
    false
  );

  const [commentof, setcommentsof] = useState([]);




  const postCommentHandler = (event) => {
    event.preventDefault();

    // console.log(formState.inputs.post.value);
    fetch("http://localhost:8080/comments", {
      method: "POST",
      body: JSON.stringify({

        comment: formState.inputs.Comment.value,
        post: formState.inputs.post.value,


      }),
      headers: {
        'authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
    
   

  }

  useEffect(() => {

   
    const fetchData3 = async () => {
      // console.log(localStorage);
      const response = await fetch(`http://localhost:8080/comments/`, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem("token")}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const newData = await response.json();
      setcommentsof(newData.data.data);
      // console.log(newData);

    };
 

    fetchData3();

  }, [postCommentHandler]);










  const commentsare =  commentof.filter(foe => foe.post === props.postid) 

  
  let person=props.nameofpersons.find(forevery=>forevery._id==props.id);
 
let follow="follow";
const followHandler=()=>{

}
// if(person.following.find(foe=>foe===user))
// {
//   follow="following";
// }


  return (
    <div >

      <div className={classes.Card}>

        <div className={classes.name}>
          <img src={person.photo}   className={classes.personimage} alt="" />
          <div className={classes.nameofperson} >{person.name}</div>
          <div className={classes.follow}>
            <button onclick={followHandler}>{follow}</button>
          </div>
        </div>

        <img src={props.image} className={classes.imageofpost} alt="" />

        <div className={classes.likecommentshare}>

          <div className={classes.like} onClick={likeHandler}>

           {!liked&& <i className="fa-sharp fa-regular fa-heart fa-xl"></i>}
            
            {liked && <i className="fa-sharp fa-solid fa-heart fa-xl" style={{ color: "#ff330f" }} ></i>
            }
            <p className={classes.nooflike}>45</p>
          </div>
          <div className={classes.comment} onClick={onClickHandler}>
            <i className="fa-sharp fa-regular fa-comments fa-xl"></i>
            <p className={classes.noofcomment}>56</p>

          </div>
          <div className={classes.share}>
            <i className="fa-sharp fa-solid fa-share-from-square fa-xl"></i>

          </div>
        </div>
        <div className={classes.description}>{props.description}</div>


      </div>
{
        showcomment && 

      <div className={classes.comments}>
        {
      

          commentsare.map(forevery => <Comments statement={forevery.comment} name={forevery.user.name} image={forevery.user.photo} id={forevery.id} key={forevery._id} />   )
          
          
          
          }
            

      </div>
}
      <div className={classes.writecomments} >
        <form action="" onSubmit={postCommentHandler}>
          <Input 
            id="Comment"
            element="textarea"
            type="text"
            label="Comment"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid comment."
            onInput={inputHandler}
            initialValue={" "}
            initialValid={false}
          />
          <button type="submit">post</button>
        </form>

      </div>
      
    </div>

  )
}
