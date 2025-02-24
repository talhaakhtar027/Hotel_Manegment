import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import Dashboards from "../Dashboards";


const API_URL = "http://localhost:3000/api/users";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const editUser = async (id, name, email, phone, role) => {
        const newName = prompt("Edit Name", name) || name;
        const newEmail = prompt("Edit Email", email) || email;
        const newPhone = prompt("Edit Phone", phone) || phone;
        const newRole = prompt("Edit Role", role) || role;

        if (!newName || !newEmail || !newPhone || !newRole) {
            alert("All fields are required!");
            return;
        }

        try {
            await axios.put(`${API_URL}/${id}`, { name: newName, email: newEmail, phone: newPhone, role: newRole });
            alert("User updated successfully!");
            getUsers();
        } catch (error) {
            alert("Error updating user");
            console.error("Error updating user:", error);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                alert("User deleted successfully!");
                getUsers();
            } catch (error) {
                alert("Error deleting user");
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <>
      < Dashboards />

        <Container >
            <br />
            <Typography variant="h4" gutterBottom > User Management</Typography>
            <br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">Loading users...</TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => editUser(user._id, user.name, user.email, user.phone, user.role)}>Edit</Button>
                                        <Button variant="contained" color="secondary" onClick={() => deleteUser(user._id)} style={{ marginLeft: 8 }}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        </>
    );
};

export default UserManagement;
