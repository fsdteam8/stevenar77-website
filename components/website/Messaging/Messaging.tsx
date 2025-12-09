"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import io, { Socket } from "socket.io-client";

interface Message {
  _id?: string;
  conversationId: string;
  sender: string;
  text: string;
  type?: "auto" | "user"; 
  createdAt?: string;
}

export default function UserMessaging() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const API_BASE = process.env.NEXT_PUBLIC_API_URL!;
  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  const [hasUserReplied, setHasUserReplied] = useState(false);
  const [autoHelloSent, setAutoHelloSent] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // -------------------------------
  // CREATE CONVERSATION
  // -------------------------------
  useEffect(() => {
    if (!userId) return;

    const createConversation = async () => {
      const res = await fetch(`${API_BASE}/conversation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participants: [userId] }),
      });
      const json = await res.json();
      if (json?.data?._id) {
        setConversationId(json.data._id);
      }
    };

    createConversation();
  }, [userId, API_BASE]);

  // -------------------------------
  // SOCKET CONNECTION
  // -------------------------------
  useEffect(() => {
    if (!conversationId) return;

    const newSocket = io(SOCKET_URL, { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("joinRoom", conversationId);

      // Only send auto-hello if not already sent & no existing auto hello
      const hasAutoHello = messages.some(
        (m) => m.sender === "admin" && m.type === "auto",
      );

      if (!autoHelloSent && !hasAutoHello) {
        // pass socket instance
        sendAutoHello(conversationId, newSocket);
      }
    });

    newSocket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    // CLEANUP: just return a void function
    return () => {
      newSocket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  // -------------------------------
  // FETCH OLD MESSAGES
  // -------------------------------
  useEffect(() => {
    if (!conversationId) return;

    const loadMessages = async () => {
      const res = await fetch(`${API_BASE}/message/${conversationId}`);
      const json = await res.json();
      const arr: Message[] = Array.isArray(json)
        ? json
        : json?.data || json?.messages || [];
      setMessages(arr);
    };

    loadMessages();
  }, [conversationId, API_BASE]);

  // -------------------------------
  // AUTO MESSAGES
  // -------------------------------
  const sendAutoHello = async (cid: string, socketInstance: Socket) => {
    const payload: Message = {
      conversationId: cid,
      sender: "admin",
      text: "If you don't get a response in the next 2 minutes that means we are currently diving. Please leave your cell phone and email so we can get back to you when we surface.",
      type: "auto",
      createdAt: new Date().toISOString(),
    };

    await fetch(`${API_BASE}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    socketInstance.emit("sendMessage", payload);
    setAutoHelloSent(true);
  };

  const sendAutoThankYou = async (cid: string) => {
    if (!socket) return;

    const payload: Message = {
      conversationId: cid,
      sender: "admin",
      text: "Thank you for your message, as long as you sent us your cell phone and email we will be able to get back to you when we surface.",
      type: "auto",
      createdAt: new Date().toISOString(),
    };

    await fetch(`${API_BASE}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    socket.emit("sendMessage", payload);
  };

  // -------------------------------
  // SEND USER MESSAGE
  // -------------------------------
  const sendMessage = async () => {
    if (!input.trim() || !socket || !conversationId || !userId) return;

    const payload: Message = {
      conversationId,
      sender: userId,
      text: input.trim(),
      type: "user",
      createdAt: new Date().toISOString(),
    };

    await fetch(`${API_BASE}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    socket.emit("sendMessage", payload);
    setInput("");

    if (!hasUserReplied) {
      setHasUserReplied(true);
      setTimeout(() => sendAutoThankYou(conversationId), 1000);
    }
  };

  const formatTime = (t?: string) =>
    t
      ? new Date(t).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  // -------------------------------
  // NOT LOGGED IN
  // -------------------------------
  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center my-20">
        <Card className="max-w-md w-full text-center p-6">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <div className="bg-red-100 text-red-600 p-3 rounded-full">
                <Lock size={26} />
              </div>
            </div>
            <CardTitle>You’re not logged in</CardTitle>
            <CardDescription>Please log in to start chatting.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push("/login")}>
              Log in
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div className="flex flex-col h-[70vh] max-w-2xl mx-auto my-6 border rounded-2xl shadow bg-white">
      <div className="py-4 px-4 bg-primary text-white font-semibold rounded-t-2xl">
        Chat with Admin
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((m, i) => {
          const senderId = m.sender;
          const mine = senderId === userId;

          return (
            <div
              key={m._id || i}
              className={`mb-3 flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-2xl max-w-sm ${
                  mine ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>{m.text}</p>
                <span className="text-[10px] opacity-70 block mt-1">
                  {formatTime(m.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border px-4 py-2 rounded-full"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center"
          onClick={sendMessage}
        >
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
}