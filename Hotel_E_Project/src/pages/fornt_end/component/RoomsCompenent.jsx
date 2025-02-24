import React, { useEffect, useState } from "react";
import { HiChevronRight, HiOutlineUserCircle, HiOutlineArrowsExpand } from "react-icons/hi";
import { Card, CardContent, Grid, Box, Typography, Button as MuiButton } from "@mui/material";
import { Link } from "react-router-dom";

const RoomsComponent = ({ gridCols = "grid-cols-3" }) => {
  const [rooms, setRooms] = useState([]);
  const API_URL = "http://localhost:3000"; // Ensure you have the correct base URL

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${API_URL}/api/rooms/`);
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Failed to fetch rooms", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <Grid container spacing={4} className={`grid ${gridCols}`}>
      {rooms
        .filter((room) => room.availability !== "Booked") // Filter out booked rooms
        .map((room, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "transparent",
              }}
            >
              <Box sx={{ position: "relative", overflow: "hidden" }}>
                <Link to={`/single/${room._id}`}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "200px",
                      backgroundImage: `url(${room.images[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "background-image 0.3s",
                      "&:hover": {
                        backgroundImage: `url(${room.images[1]})`,
                      },
                    }}
                  />
                </Link>
                <Box
                  sx={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "space-between",
                    bottom: 0,
                    width: "100%",
                    px: 3,
                    py: 1,
                    textAlign: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    color: "white",
                  }}
                >
                  <Typography variant="body2">
                    <HiOutlineUserCircle className="h-6 w-auto mr-1" /> {room.capacity} Guests
                  </Typography>
                  <Typography variant="body2">
                    <HiOutlineArrowsExpand className="h-6 w-auto mr-1" /> {room.floor} Floor
                  </Typography>
                </Box>
              </Box>

              <CardContent
                sx={{
                  flex: "1 1 auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(0, 0, 0, 0.42)",
                }}
              >
                <Box>
                  <Link to={`/single/${room._id}`} style={{ textDecoration: "none" }}>
                    <Typography variant="h6" component="h5" sx={{ fontWeight: "bold", color: "white" }}>
                      {room.type} Room
                    </Typography>
                  </Link>
                  <Typography variant="body2" sx={{ mb: 2, color: "white" }}>
                    {room.description}
                  </Typography>
                </Box>

                {/* Availability Display */}
               

                {/* Book Now Button */}
                <a href={`/app/single/${room._id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", marginTop: "auto" }}>
                  <MuiButton
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%", backgroundColor: '#e57c00', '&:hover': { backgroundColor: '#cc6d00' }, color: 'black' }}
                    endIcon={<HiChevronRight />}
                  >
                    Book Now For ${room.price}
                  </MuiButton>
                </a>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default RoomsComponent;
