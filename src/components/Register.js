import { ComponentSelector } from "@emotion/react";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  
    const[username,setUserName] = useState("");
    const[password,setPassword] = useState("");
    const[confirmPassword,setCnfrmPassword] = useState("");
    const[load , setLoad] = useState(false);
    const history = useHistory();
  const register = async  (formData)=>{

    if(!validateInput(formData)){
      setLoad(true);
      const {username , password} = formData;
      
      await axios.post(config.endpoint+"/auth/register",{"username":username.trim() , "password":password})
      .then((response)=>{
        
        if(response.status===201){
        enqueueSnackbar('Registered successfully')
      }
    history.push("/login")
    
    }).catch((err)=>{
        
        if(err.response.data.success===false && err.status === 400){
    
          enqueueSnackbar(err.response.data.message)
        }
        else{
          enqueueSnackbar(err.response.data.message)
        }
      })
      setLoad(false);
     
    }


  }
  
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    if(data.username.length<6){
      if(!(data.username)){
        enqueueSnackbar("Username is a required field")
        return true;
      }
      else{
        enqueueSnackbar( "Username must be at least 6 characters")
        return true;
      }
    }
    else if (data.password.length < 6){
      if(!(data.password)){
        enqueueSnackbar("Password is a required field")
        return true;
      }
      else{
          enqueueSnackbar("Password must be atleat 6 charcters")
          return true;
      }
  
    }
    else{
      if(data.password !== data.confirmPassword){
        enqueueSnackbar("Password do not match");
        return true;
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons = {true}/>
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={(e)=>setUserName(e.target.value)}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={(e)=>setPassword(e.target.value)}
            
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={(e)=>setCnfrmPassword(e.target.value)}
          />
          {load && <CircularProgress color="success" />}
           <Button className="button" variant="contained" onClick={()=>register({
            "username":username,
            "password": password,
            "confirmPassword" : confirmPassword
           })}>
            Register Now
           </Button>
          <p className="secondary-action">
            Already have an account?{" "}
            
             <Link to="/login" className="link">Login here</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;