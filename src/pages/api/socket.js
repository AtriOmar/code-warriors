import axios from "axios";
import { getSession } from "next-auth/react";
import { Server } from "socket.io";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { attachEvents } from "@/lib/attachEvents";

export default function handler(req, res) {
  // It means that socket server was already initialised

  if (res.socket.server.io) {
    console.log("Already set up");
    res.end("socket connected");
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  attachEvents(io);

  console.log("Setting up socket");
  res.end();
}
