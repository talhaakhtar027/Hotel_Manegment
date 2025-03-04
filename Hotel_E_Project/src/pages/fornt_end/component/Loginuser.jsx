import { useState } from "react";
import { TextField, Button, CircularProgress, Container , Box } from "@mui/material";
import beach from '/assets/images/bed.jpg'

export default function Loginuser() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const formData = await response.json();
      const { token, user } = formData;

      localStorage.setItem("authToken", token);
      alert(`Login successful! Welcome, ${user.name}`);
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email, phone, password } = formData;

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("Registration successful! You can now login.");
      setIsRegistering(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
      
        alignItems: 'center',
       
      }}
    >
        <Box
                    className="backimage"
                    sx={{
                        position: 'absolute',
                        backgroundImage: `url(${beach})`, // Use the desired background image here
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        height: '100vh',
                        zIndex: -1, // Ensure this stays behind the navbar
                    }}
                >
                    <Box className="overlay" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                </Box>
      <div className="form-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '8px' }}>
        <h2 className="form-title">{isRegistering ? "Register" : "Login"}</h2>

        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="form" noValidate>
          {isRegistering && (
            <TextField
              type="text"
              id="name"
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
          )}

          <TextField
            type="email"
            id="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />

          {isRegistering && (
            <TextField
              type="text"
              id="phone"
              label="Phone"
              variant="outlined"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
          )}

          <TextField
            type="password"
            id="password"
            label="Password"
            variant="outlined"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              padding: '10px 20px',
              fontWeight: 'bold',
              backgroundColor: '#e57c00',
              '&:hover': { backgroundColor: '#cc6d00' },
              color: 'black',
            }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isRegistering ? "Register" : "Login")}
          </Button>
        </form>

        <Button
          onClick={() => setIsRegistering((prev) => !prev)}
          sx={{
            marginTop: 2,
            textTransform: 'none',
            borderRadius: '12px',
            padding: '10px 20px',
            fontWeight: 'bold',
            backgroundColor: '#b4af9e',
            '&:hover': { backgroundColor: '#c1f4b1' },
            color: 'black',
          }}
          fullWidth
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </Button>
      </div>
    </Container>
  );
}
