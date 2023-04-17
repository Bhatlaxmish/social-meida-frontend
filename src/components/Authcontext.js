import { createContext } from 'react';

export const Authcontext = createContext({
  isLoggedin: false,
  userid:1,
  myid:(data)=>{},
  login: () => {},
  logout: () => {}
});