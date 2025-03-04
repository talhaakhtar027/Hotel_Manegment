import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell,Typography, TableContainer, TableHead, TableRow, Paper, CircularProgress, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import beach from '/assets/images/bed.jpg'

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true); // Set to true initially while loading
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found. Redirecting to login.");
        setIsLoading(false);
        navigate("/login"); // Redirect to login if no token
        return;
      }

      console.log("Auth token:", token); // Check the token

      const response = await fetch('http://localhost:3000/api/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching user data:", errorData.message || "Unknown error");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setUserData(data.user); // assuming the user data is in the 'user' key
      setIsLoading(false); // stop loading once data is fetched
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError("An error occurred while fetching the data.");
      setIsLoading(false); // stop loading on error
    }
  };

  // Run fetchUserData on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <Container maxWidth="xs">
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container
    maxWidth="xs"
    sx={{
      display: 'flex',
      justifyContent: 'center', // Centers content horizontally
      alignItems: 'center', // Centers content vertically
      height: '80vh', // Height is 80% of the viewport height
      width: '100%', // Set width to 100% to prevent overflow
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
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", width: '100%' }}>
      <Typography variant="h4" sx={{ color: "white", marginBottom: "20px" }}>User Profile</Typography>
  
      {error && <Box color="red">{error}</Box>}
  
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10px', border: '1px solid white', padding: '10px', borderRadius: '5px' }}>
        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Name:</Typography>
        <Typography sx={{ color: 'white' }}>{userData.name || "N/A"}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10px', border: '1px solid white', padding: '10px', borderRadius: '5px' }}>
        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Email:</Typography>
        <Typography sx={{ color: 'white' }}>{userData.email || "N/A"}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10px', border: '1px solid white', padding: '10px', borderRadius: '5px' }}>
        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Phone:</Typography>
        <Typography sx={{ color: 'white' }}>{userData.phone || "N/A"}</Typography>
      </Box>
    </Box>
  </Container>
  
  );
};

export default UserProfile;
