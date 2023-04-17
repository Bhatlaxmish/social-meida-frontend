import React,{useEffect,useContext,useState,useCallback} from 'react';

import classes from "./Accounts.module.css";
import { Authcontext } from './Authcontext';

export default function Account(props) {
    const [userdata,setuserdata]=useState([]);
    const [postdata, setpostdata] = useState([]);

const auth=useContext(Authcontext);
// console.log(localStorage.getItem("token"));
    useCallback( useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/posts/`, {

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
            const rest = await fetch('http://localhost:8080/users/me', {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            const newusers = await rest.json();
            setuserdata(newusers.data.data);
            auth.myid(userdata._id);
            // console.log(newusers);
        }
        
        fetchData2();


    }, []));

    console.log(props,"prosp");
//   console.log("userdata",userdata);
//   console.log(auth.userid);
//   console.log(postdata);

// if(props)
// {
//     setuserdata(props.person);
// }

    return (
        <div>
            <div className={classes.useracount}>
                Acount 
            </div>
            <div className={classes.makeflex}>

                <img src={userdata.photo} alt="" />
                <div className={classes.username}>
                    {userdata.name}
                  
                </div>
                <div className={classes.followers}>
                    <p>followers</p>
                    <p>{userdata.followers}</p>

                </div>
            <div className={classes.following}>
                    <p>following</p>
                    <p>{userdata.following}</p>

                </div>
            </div>
            <div className={classes.description}>
<p>how are you what are you doing Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias veniam sed debitis nesciunt eligendi labore at suscipit sapiente porro dignissimos quis odit neque eos, ex ipsam blanditiis reiciendis. Est repellat laboriosam corrupti accusantium.</p>
            </div>
<div className={classes.heading}>
  
    posts
</div>
            <div className={classes.line}></div>

                <div className={classes.posts}>

            </div>

        </div>
    )
}
