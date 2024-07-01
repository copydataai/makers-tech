"use client";

import { useState, useEffect } from "react";
import { MoveUp } from "lucide-react";
import {
  Card,
  CardBody,
  Image,
  Button,
  ScrollShadow,
  Textarea,
} from "@nextui-org/react";
import { SystemCard } from "~/components/SystemCard";
import { UserCard } from "~/components/UserCard";

export function Chat() {
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  return (
    <ScrollShadow className="h-1/2 w-3/4 md:w-1/2">
      <Card
        isBlurred
        className="h-1/2 w-full border-none bg-background/60 dark:bg-default-100/50"
        shadow="sm"
      >
        <CardBody>
          <div className="flex items-center justify-center md:gap-4">
            <div className="col-span-6 flex flex-col md:col-span-8">
              <div className="flex flex-col justify-between gap-2">
                {history.length > 0 &&
                  history.map((msg, index) => (
                    <div
                      className="flex flex-col justify-between gap-2"
                      key={index}
                    >
                      <UserCard message={msg} />
                      <SystemCard message={msg} setIsTyping={setIsTyping} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <Textarea
              size="sm"
              radius="md"
              onValueChange={(value) => {
                value && setMessage(value);
              }}
              value={message}
            />
            <Button
              onPress={() => {
                setHistory((prevHistory) => [...prevHistory, message]);
                setIsTyping(true);
                setMessage("");
              }}
              isIconOnly
              isLoading={isTyping}
              aria-label="Send"
              className="ml-1"
            >
              <MoveUp className="h-5 w-5" />
            </Button>
          </div>
        </CardBody>
      </Card>
    </ScrollShadow>
  );
}
