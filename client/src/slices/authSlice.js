import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("user")
  ? { userInfo: JSON.parse(localStorage.getItem("user")) }
  : { userInfo: null };
  export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            const { user, expiresIn } = action.payload;
            state.userInfo=user;
            localStorage.setItem("user",JSON.stringify(state.userInfo));
            localStorage.setItem("tokenExpiry", Date.now() + expiresIn);
        },
        logout:(state,action)=>{
            state.userInfo=null;
            localStorage.removeItem("user");
            localStorage.removeItem("tokenExpiry");
        },
        checkTokenExpiry: (state) => {
            const tokenExpiry = localStorage.getItem("tokenExpiry");
            if (tokenExpiry && Date.now() > tokenExpiry) {
              state.userInfo = null;
              localStorage.removeItem("user");
              localStorage.removeItem("tokenExpiry");
            }
          }
    }
})

export const {setCredentials,logout,checkTokenExpiry}=authSlice.actions;
export const authReducer=authSlice.reducer;