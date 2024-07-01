"use client";

import { Card, CardBody, Image, Spinner } from "@nextui-org/react";
import { api } from "~/trpc/react";
import { Bot } from "lucide-react";

export function SystemCard(props: { message: string; setIsTyping: any }) {
  const { message, setIsTyping } = props;
  const { isLoading, isError, error, data } =
    api.product.questionPrompt.useQuery({ prompt: message });

  if (isLoading) {
    return <Spinner color="primary" size="sm" />;
  }

  setIsTyping(false);

  return (
    <Card className="mr-3 bg-slate-800">
      <CardBody className="flex items-center justify-center gap-2">
        <Bot size={24} />
        {data}
      </CardBody>
    </Card>
  );
}
