"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Input,
  Spinner,
  Chip,
} from "@heroui/react";

export default function ChatWithBookDrawer({
  ebookId,
  bookTitle,
  currentChapter = "",
  selectedText = "",
  onClearSelectedText = () => {},
}) {
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: `Hello! I'm your AI Companion for "${bookTitle}". Ask me anything about character arcs, themes, vocabulary, or highlighted lines!`,
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (queryText = inputQuestion) => {
    if (!queryText.trim() || isStreaming) return;

    const userMsg = { sender: "user", text: queryText };

    // Append user message and prepare streaming placeholder
    setMessages((prev) => [...prev, userMsg, { sender: "assistant", text: "" }]);
    setInputQuestion("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/reader/chat-with-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ebookId,
          question: queryText,
          chatHistory: messages.slice(1), // Exclude initial greeting
          selectedText,
          currentChapter,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("API streaming request failed.");
      }

      if (selectedText) onClearSelectedText();

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          if (updated[lastIndex]?.sender === "assistant") {
            updated[lastIndex].text += chunk;
          }
          return updated;
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "An error occurred while getting the response. Please try again.",
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <Card className="w-full max-w-md h-[600px] flex flex-col border border-default-200 shadow-xl">
      {/* Drawer Header */}
      <CardHeader className="flex justify-between items-center border-b border-default-100 p-4">
        <div>
          <h3 className="font-bold text-sm text-foreground">AI Companion</h3>
          <p className="text-[11px] text-default-400">
            Reading: <span className="font-semibold text-foreground">{bookTitle}</span>
          </p>
        </div>
        <Chip size="sm" color="accent" variant="flat">
          {currentChapter || "Active Reading"}
        </Chip>
      </CardHeader>

      {/* Messages Stream */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[85%] text-xs p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-default-100 text-foreground rounded-bl-none"
              }`}
            >
              {msg.text ||
                (isStreaming && idx === messages.length - 1 && (
                  <Spinner size="sm" color="accent" />
                ))}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </CardContent>

      {/* Highlighted Passage Selector */}
      {selectedText && (
        <div className="mx-4 p-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 rounded-lg flex items-center justify-between text-xs gap-2">
          <div className="truncate">
            <span className="font-bold text-amber-700 dark:text-amber-400">
              Selected Passage:
            </span>{" "}
            <span className="italic text-default-600">{selectedText}</span>
          </div>
          <Button
            size="sm"
            variant="light"
            className="min-w-[20px] h-6 text-default-500"
            onPress={onClearSelectedText}
          >
            ✕
          </Button>
        </div>
      )}

      {/* Quick Action Chips */}
      <div className="px-4 py-2 flex gap-1.5 overflow-x-auto border-t border-default-100">
        <Chip
          size="sm"
          variant="flat"
          className="cursor-pointer hover:bg-default-200 text-[10px]"
          onClick={() => handleSendMessage("Summarize the key events in this chapter")}
        >
          Summarize Chapter
        </Chip>
        <Chip
          size="sm"
          variant="flat"
          className="cursor-pointer hover:bg-default-200 text-[10px]"
          onClick={() => handleSendMessage("Analyze character dynamics in this section")}
        >
          Character Analysis
        </Chip>
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-default-100 flex gap-2">
        <Input
          size="sm"
          placeholder={
            selectedText
              ? "Ask about highlighted text..."
              : "Ask anything about this book..."
          }
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={isStreaming}
        />
        <Button
          size="sm"
          color="accent"
          onPress={() => handleSendMessage()}
          isLoading={isStreaming}
        >
          Send
        </Button>
      </div>
    </Card>
  );
}