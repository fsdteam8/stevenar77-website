"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { FiSend } from "react-icons/fi";

interface Message {
  _id?: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt?: string;
}

export default function UserMessaging() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Step 1: Create or get conversation with admin
 
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

  // Step 2: Initialize Socket.IO
  useEffect(() => {
    if (!conversationId || !userId) return;

    const s = io(SOCKET_URL, { transports: ["websocket"] });
    setSocket(s);

    s.on("connect", () => {
      console.log("Socket connected:", s.id);
      // Join conversation room
      s.emit("joinRoom", conversationId);
    });

    s.on("receiveMessage", (msg: Message) => {
      if (msg.conversationId === conversationId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    s.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      s.disconnect();
    };
  }, [conversationId, userId, SOCKET_URL]);

  // Step 3: Load previous messages
  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_BASE}/message/${conversationId}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setMessages(data);
        } else if (Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [conversationId, API_BASE]);

  // Step 4: Send message
  const sendMessage = async () => {
    if (!input.trim() || !socket || !conversationId || !userId) return;

    const payload: Message = {
      conversationId,
      sender: userId,
      text: input.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      // Emit message via socket
      if (socket && socket.connected) {
        socket.emit("sendMessage", payload);
      }
      // Update local UI immediately
      setMessages((prev) => [...prev, payload]);
      setInput("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Helper for formatting time
  const formatTime = (time?: string) => {
    if (!time) return "";
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-[70vh] max-w-2xl mx-auto my-6 border rounded-lg shadow bg-white">
      {/* Header */}
      <div className="p-3 border-b flex items-center gap-2 bg-gray-50">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <h2 className="text-sm font-semibold">Chat with Admin</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 && (
          <p className="text-sm text-gray-500 text-center mt-10">
            No messages yet. Say hello 👋
          </p>
        )}
        {messages.map((m, i) => {
          const isUser = m.sender === userId;
          return (
            <div
              key={i}
              className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-2xl relative ${
                  isUser
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
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
      <div className="p-3 border-t flex items-center gap-2 bg-white">
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
          onClick={sendMessage}
        >
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
}
