"use client";

import { Profile } from "@/components/Profile";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Box, Skeleton, Tabs, Text } from "@radix-ui/themes";

export default function ProfilePage() {
  const { profileUser, loading } = useUserProfile();

  return (
    <div>
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">Ваш профиль</Tabs.Trigger>
          <Tabs.Trigger value="grades">Оценки</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="account">
            <Skeleton loading={loading}>
              {profileUser && <Profile profileUser={profileUser} />}
            </Skeleton>
          </Tabs.Content>

          <Tabs.Content value="grades">
            <Text size="2">Access and update your documents.</Text>
          </Tabs.Content>

          <Tabs.Content value="settings">
            <Text size="2">
              Edit your profile or update contact information.
            </Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
}
