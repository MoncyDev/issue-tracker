"use client";
import { User } from "@prisma/client";
import { Avatar, Box, Flex, Heading, HoverCard, Text } from "@radix-ui/themes";
import { useState } from "react";

interface Props {
  assignedToUser: User;
  updatedAt: Date;
}

const AvatarHoverCard = ({ assignedToUser, updatedAt }: Props) => {
  const [click, setClick] = useState(false);
  return (
    <HoverCard.Root open={click}>
      <HoverCard.Trigger
        onClick={() => setClick(true)}
        onMouseOut={() => setClick(false)}
      >
        <Avatar
          src={assignedToUser.image!}
          fallback="?"
          radius="full"
          size="2"
        />
      </HoverCard.Trigger>
      <HoverCard.Content maxWidth="300px">
        <Flex gap="4">
          <Avatar
            src={assignedToUser.image!}
            fallback="?"
            radius="full"
            size="2"
          />
          <Box>
            <Heading size="3" as="h3">
              {assignedToUser.name}
            </Heading>
            <Text as="div" size="2" color="gray" mb="2">
              {assignedToUser.email}
            </Text>
            <Text as="div" size="1">
              <Text>Last update:</Text>
              {updatedAt.toLocaleDateString()}
            </Text>
          </Box>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default AvatarHoverCard;
