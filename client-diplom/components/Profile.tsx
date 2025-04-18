import { User } from "@/interface";
import { Avatar, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  profileUser: User;
}

const letterOfFallback = (profile: User) => {
  if (profile) {
    if (profile.role.id == 1) {
      return "Студент";
    } else if (profile.role.id == 2) {
      return "Преподаватель";
    } else {
      return "Админ";
    }
  }
};

export const Profile: React.FC<Props> = ({ profileUser }) => {
  return (
    <Flex as="div" display="flex" direction="row" gap="5" p='2'>
      <Avatar fallback={`${letterOfFallback(profileUser)}`} size="9" />
      <Flex as="div" display="flex" direction="column" gap="2">
        <Heading as="h3" size='4'>Контактная информация</Heading>
        <Separator size='4' orientation='horizontal'/>
        <Flex as="div" display="flex" direction="column">
          <Text size='1' weight='light' color="gray">Фамилия</Text>
          <Text>{profileUser.lastName}</Text>
        </Flex>
        <Flex as="div" display="flex" direction="column">
          <Text size='1' weight='light' color="gray">Имя</Text>
          <Text>{profileUser.firstName}</Text>
        </Flex>
        <Flex as="div" display="flex" direction="column">
          <Text size='1' weight='light' color="gray">Отчество</Text>
          <Text>{profileUser.patronymic}</Text>
        </Flex>
        <Flex as="div" display="flex" direction="column">
          <Text size='1' weight='light' color="gray">Группа</Text>
          <Text> {profileUser.group ? <p>{profileUser.group.name}</p> : <p></p>}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
