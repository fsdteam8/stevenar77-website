"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { FiSend } from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Message {
  _id?: string;
  conversationId: string;
  sender: string | { _id: string; name?: string };
  text: string;
  createdAt?: string;
}
export default function UserMessaging() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // create conversation
  useEffect(() => {
    if (!userId) return;
    const createConversation = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/conversation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ participants: [userId] }),
        });
        const data = await res.json();
        if (data._id) setConversationId(data._id);
        else if (data.conversation?._id)
          setConversationId(data.conversation._id);
      } catch (err) {
        console.error("Error creating conversation:", err);
      } finally {
        setLoading(false);
      }
    };
    createConversation();
  }, [userId, API_BASE]);

  // socket connect
  useEffect(() => {
    if (!conversationId || !userId) return;
    const s = io(SOCKET_URL, { transports: ["websocket"] });
    setSocket(s);

    s.on("connect", () => {
      s.emit("joinRoom", conversationId);
    });

    s.on("receiveMessage", (msg: Message) => {
      if (msg.conversationId === conversationId) {
        setMessages((prev) => {
          // duplicate prevent
          const alreadyExists = prev.some(
            (m) =>
              m._id === msg._id ||
              (m.text === msg.text && m.createdAt === msg.createdAt),
          );
          if (alreadyExists) return prev;
          return [...prev, msg];
        });
      }
    });

    return () => {
      s.disconnect();
    };
  }, [conversationId, userId, SOCKET_URL]);

  // fetch old messages
  useEffect(() => {
    if (!conversationId) return;
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_BASE}/message/${conversationId}`);
        const data = await res.json();
        if (Array.isArray(data)) setMessages(data);
        else if (Array.isArray(data.messages)) setMessages(data.messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [conversationId, API_BASE]);

  // send message
  const sendMessage = async () => {
    if (!input.trim() || !socket || !conversationId || !userId) return;
    const payload: Message = {
      conversationId,
      sender: userId,
      text: input.trim(),
      createdAt: new Date().toISOString(),
    };
    try {
      if (socket && socket.connected) socket.emit("sendMessage", payload);

      setInput("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const formatTime = (time?: string) => {
    if (!time) return "";
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // If not logged in
  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center my-20  ">
        <Card className="w-full max-w-md text-center shadow-lg rounded-2xl border border-gray-200 p-6">
          <CardHeader>
            <div className="flex justify-center mb-3">
              <div className="bg-red-100 text-red-600 p-3 rounded-full">
                <Lock size={28} />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              You’re not logged in
            </CardTitle>
            <CardDescription className="text-gray-500 mt-2">
              Please log in to continue and start chatting with the Admin.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              className="w-full rounded-xl text-base font-medium shadow-md"
              onClick={() => router.push("/login")}
            >
              🔑 Log in to Chat
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[70vh] max-w-2xl mx-auto my-6 border rounded-2xl shadow  bg-white">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white rounded-t-2xl shadow">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
          A
        </div>
        <h2 className="text-base font-semibold">Chat with Admin</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        {messages.map((m, i) => {
          const senderId =
            typeof m.sender === "object" ? m.sender._id : m.sender;

          const isUserMessage = senderId === userId;

          return (
            <div
              key={m._id || i}
              className={`mb-4 flex ${
                isUserMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-sm px-3 py-2 rounded-2xl relative break-words whitespace-pre-wrap ${
                  isUserMessage
                    ? "bg-cyan-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{m.text}</p>
                <span className="absolute -bottom-4 right-2 text-xs text-gray-400">
                  {formatTime(m.createdAt)}
                </span>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          className="w-11 h-11 flex items-center justify-center rounded-full bg-primary text-white hover:bg-blue-700 shadow cursor-pointer"
          onClick={sendMessage}
        >
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
}
