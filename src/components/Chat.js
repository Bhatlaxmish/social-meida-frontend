import React, { useState, useEffect, useCallback } from 'react'
import classes from "./Chat.module.css";
import { Link, json } from 'react-router-dom';
import Chatfollow from './Chatfollow';


let userdata1, followers1, mydata1;
export default function Chat() {

  const [userdata, setuserdata] = useState([
                        {
                          _id: '642d072857de4d6172f6a904',
                          name: 'sasuke uchiha',
                            email: 'sasukeuchiha@gmail.com',
                            photo: 'https://lh3.googleusercontent.com/0ySMlPrOssBJ41On…UG0v6AGy13M8sw2Hp5l6aq05mXEnWXyB_IBhemqundBmRh44g',
                              followers: 0
                        }
    ,
                        { _id: '642d072857de4d6172f6a904',
                        name: 'sasuke uchiha',
                          email: 'sasukeuchiha@gmail.com',
                          photo: 'https://lh3.googleusercontent.com/0ySMlPrOssBJ41On…UG0v6AGy13M8sw2Hp5l6aq05mXEnWXyB_IBhemqundBmRh44g',
                            followers: 0
                          }


  ]);
  const [mydata, setmydata] = useState([{ followers: 0,
                                          following: 0,
                                            posts: Array(0), 
                                            _id: '642bc8ddfe2471cabbb1f503',
                                            name: 'dewe' 
                                            }]
                                            )

  const [followers, setfollowdata] = useState([
                                                { _id: '64340fac56423044b44a5377',
                                                user: '642bc8ddfe2471cabbb1f503',
                                                  followers: Array(3),
                                                  following: Array(3)
                                                  },

                                                { _id: '64340fac56423044b44a5378',
                                                user: '642cffd65a442a45263c6128',
                                                  followers: Array(3),
                                                  following: Array(3) 
                                                  },

                                                { _id: '64340fac56423044b44a5379', 
                                                user: '642d072857de4d6172f6a904', 
                                                followers: Array(3),
                                                following: Array(3) 
                                              }
                                              ]);

  useEffect(() => {

   
    fetchData();
    fetchData2();
    fetchData3();


  },[]);
  const fetchData = async () => {
    const rest = await fetch('http://localhost:8080/users/me', {
      headers: {
        'authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    const newusers = await rest.json();
    setmydata(newusers.data.data);
    // mydata1=newusers.data.data;
  }

  const fetchData2 = async () => {
    const rest = await fetch('http://localhost:8080/users/', {
      headers: {
        'authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    const newusers = await rest.json();
    setuserdata(newusers.data.data);
    // userdata1=newusers.data.data;
  }
  const fetchData3 = async () => {
    const rest = await fetch('http://localhost:8080/follow/', {
      headers: {
        'authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    const newusers = await rest.json();
    setfollowdata(newusers.data.data);
    // followers1=newusers.data.data;
  }
  console.log("followerrs", followers);
  console.log(userdata);
  console.log("mydata", mydata);
  // userdata1=userdata;
  // console.log(userdata1);

  // let myfollowers = [
  //   "642bc8ddfe2471cabbb1f503",
  //   "642cffd65a442a45263c6128",
  //   "642d072857de4d6172f6a904"
  // ];
//  let  myfollowers= followers.find(f => f.user === mydata._id) ;

  // console.log("myfolowers", myfollowers);
  let myfollowing = followers.find(f => f.user === mydata._id);
  
  // console.log(myfollowing);



  return (
    <div>



      <div className={classes.searchpeople}>
        <label htmlFor="search" >search</label>
        <input type="search" />

      </div>

      <div className={classes.maketwodivision}>



        <div className={classes.left}>
          <div className={classes.haeding}>
            people you know
          </div>
          <div>
            {

              myfollowing &&
              myfollowing.following.map(forevery => (
                <Chatfollow
                key={Math.random(10)}
                  person={userdata.find(fore=>fore._id===forevery)} 
                  follow={"following"}
                />
              ))
            }
          </div>
        </div>
       

        <div className={classes.right}>
          <div className={classes.rightheading}>
            find people
          </div>
         <div>
          {
             
            userdata.map(forevery=>
             < Chatfollow
             key={forevery._id}
             person={forevery}
             follow={"follow"}
             />
              )  
           
          }
         </div>


        </div>




      </div>







    </div>
  )
}
