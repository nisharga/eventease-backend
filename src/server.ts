import express from "express";
import app from "./app";
import { Server } from "http"; 
import { Server as SocketIOServer } from "socket.io"; // Import Socket.IO server
import config from "./config";

let io: SocketIOServer;

const main = async () => {
    let server: Server;

    // Create the HTTP server
    server = app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });

    // Integrate Socket.IO with the HTTP server
    io = new SocketIOServer(server, {
        cors: {
            origin: "*", // Add allowed origins here for production
        },
    });

    // Handle Socket.IO connections
    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);
        // Example: Listen for a test event
        socket.on("test-event", (data) => {
            console.log(`Received data: ${data}`);
        });

        // Example: Emit a message to the client
        socket.emit("welcome", "Welcome to the Socket.IO server!");

        // Handle client disconnect
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

main();

export { io };