import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Typography, Link, IconButton } from "@mui/material";
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:8000/login/",
      {
        username,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    const content = await response.data;
    navigate("/notes");
  };

  return (
    <Grid container component="main" columns={12} sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        lg={8}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (theme) => theme.palette.grey[50],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={12} md={5} lg={4}>
        <Box
          className="box"
          p={3}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <center>
              <LockOutlinedIcon />
            </center>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={submit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setTogglePassword(!togglePassword)}
                    tabIndex={4}
                  >
                    {togglePassword ? (
                      <VisibilityOffRounded />
                    ) : (
                      <VisibilityRounded />
                    )}
                  </IconButton>
                ),
              }}
              inputProps={{
                tabIndex: 2,
                type: togglePassword ? "text" : "password",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <br />
            <Typography variant="body2" color="text.secondary" align="center">
              {"Copyright ©"}
              &nbsp;
              <Link
                color="inherit"
                underline="hover"
                href="https://www.patterns247.com/"
                target="_blank"
              >
                Aman Singh
              </Link>
              &nbsp;
              {`${new Date().getFullYear()}.`}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
