"use client";

import { Card, CardBody, Image, Spinner } from "@nextui-org/react";
import { User } from "lucide-react";

export function UserCard(props: { message: string }) {
  const { message } = props;

  return (
    <Card className="ml-3">
      <CardBody className="flex items-center">
        <User size={24} />
        <div>{message}</div>
      </CardBody>
    </Card>
  );
}
