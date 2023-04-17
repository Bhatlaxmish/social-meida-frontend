import React from 'react'
import Account from "./Account"
import classes from "./Chatfollow.module.css"



export default function Chatfollow(props) {



const AccountHandler=()=>{
 
 <Account>
 person={props.person}
 </Account>
}

  
  return (
    <div>
          <div className={classes.name} >
              <img src={props.person.photo} /* src="#" */ className={classes.personimage} alt="" />
        <div className={classes.nameofperson} onClick={AccountHandler} >{props.person.name}</div>
              <div className={classes.butto}>
                  <button className={classes.button}>{props.follow}</button>
              </div>
          </div>
    </div>
  )
}
