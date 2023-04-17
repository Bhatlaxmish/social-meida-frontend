import React from 'react';
import Card from "./Card";
import classes from "./Homepage.module.css";
import { useState,useContext,useEffect} from 'react';
// import {Authcontext} from "./Authcontext";

import Comments from './Comments';
import Navbar from './Navbar';








const Homepage = () => {
   

    const [showcomment, setshowcomment] = useState(true);
    const showcommentHandler = () => {
        setshowcomment(!showcomment);
    }

  const [postdata,setpostdata]=useState([]);

  const [userdata,setuserdata]=useState([]);
  
    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/posts/`,{

                headers: {
                    'authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const newData = await response.json();
            setpostdata(newData.data.data);
           
        };
       
        const fetchData2 = async () => {
            const rest = await fetch('http://localhost:8080/users/',{
                headers: {
                    'authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            const newusers = await rest.json();
            setuserdata(newusers.data.data);
        }
fetchData();
fetchData2();

   
    }, []);
    if(postdata.length>0 &&postdata.length>0)
    {

    console.log("tomen",localStorage.getItem("token"));
    console.log( "postdata",postdata);
        console.log("userdata", userdata);

    }


    
 
    return (
        <div>
           {/* <Navbar/> */}
            <div className={classes.homepage}>
                         <div className={classes.recentposts} >
                    Latest posts    
                          </div>
                    <div className={classes.forcard}>
                                <div className={classes.carddiv}>
                                    {
                                    
                                    
                                   /*  dummyimagedescription.map(forevery => (
                                        <Card
                                        postid={forevery.postid}
                                            key={forevery.postid}
                                            id={"642d076257de4d6172f6a906"}
                                            image={forevery.image}
                                          
                                            description={forevery.description}
                                            nameofpersons={userdata}
                                            passcomment={addCommentHandler}
                                            comments={comments.filter(fore => fore.postid === forevery.postid)}
                                        />
                                    )) */
                                    userdata.length>0&&
                            postdata.map(forevery => (
                                <Card
                                    postid={forevery._id}
                                    key={forevery._id}
                                    id={forevery.personid}
                                    image={forevery.image}
                                    description={forevery.description}
                                    nameofpersons={userdata}
                                   
                                   
                                />
                            ))
                                    }
                                </div>       

                    </div>
            </div>
        </div>
    )
};
export default Homepage;