import { useState, useEffect } from "react";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Grid, Card, CardContent } from "@mui/material";
import { Home, People, Description, BarChart, Settings, ExitToApp } from "@mui/icons-material";
import Dashboards from "../Dashboards";


  // User Count Card Component
  const UserCountCard = () => {
    const [UserCount, setUserCount] = useState(0);

    useEffect(() => {
      fetch("http://localhost:3000/api/users/count")  // Ensure this API endpoint exists
        .then((res) => res.json())
        .then((data) => setUserCount(data.count))
        .catch((error) => console.error("Error fetching user count:", error));
    }, []);

    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h4">{UserCount.toLocaleString()}</Typography>
        </CardContent>
      </Card>
    );
  };

  // Room Count Card Component
  const RoomCountCard = () => {
    const [RoomCount, setRoomCount] = useState(0);

    useEffect(() => {
      fetch("http://localhost:3000/api/rooms/count")  // Ensure this API endpoint exists
        .then((res) => res.json())
        .then((data) => setRoomCount(data.count))
        .catch((error) => console.error("Error fetching user count:", error));
    }, []);

    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Total Room</Typography>
          <Typography variant="h4">{RoomCount.toLocaleString()}</Typography>
        </CardContent>
      </Card>
    );
  };

  // Room Count Card Component
  const BookingsCountCard = () => {
    const [BookingsCount, setBookingsCount] = useState(0);

    useEffect(() => {
      fetch("http://localhost:3000/api/bookings/count")  // Ensure this API endpoint exists
        .then((res) => res.json())
        .then((data) => setBookingsCount(data.count))
        .catch((error) => console.error("Error fetching user count:", error));
    }, []);

    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Total Room</Typography>
          <Typography variant="h4">{BookingsCount.toLocaleString()}</Typography>
        </CardContent>
      </Card>
    );
  };
  
  const AdminNav = () => {
    
    
    return (
  <>
  <Dashboards />
    
  
      {/* <Typography variant="h4">Dashboard</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>Welcome to the Dashboard section.</Typography> */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <UserCountCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RoomCountCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BookingsCountCard />
        </Grid>
      </Grid>
    </>
      
    );
  };

  export default AdminNav;
