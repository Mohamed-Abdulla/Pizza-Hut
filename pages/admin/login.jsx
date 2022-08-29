import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";
import { BASE_URL } from "../../util";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/login`, {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <Box component="form" onSubmit={handleClick} display="flex" flexDirection="column" gap="20px">
          <TextField placeholder="username" label="Username" onChange={(e) => setUsername(e.target.value)} required />
          <TextField
            placeholder="password"
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Sign In
          </Button>
          {error && <span className={styles.error}>Wrong Credentials!</span>}
        </Box>
      </div>
    </div>
  );
};

export default Login;
