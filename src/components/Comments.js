import React,{useContext} from 'react'
import classes from "./Comments.module.css"
import { Authcontext } from './Authcontext'

export default function Comments(props) {
  const auth=useContext(Authcontext);
 
    // console.log(props.statement,person.name);

    return (
      auth.isLoggedin &&
      <div className={classes.commentsare}>
        <img src={props.image} alt="" />
        <p className={classes.personname}>{props.name}:</p>


        <p className={classes.personname}>{props.statement}</p>
      </div>
    )

  
   

}
