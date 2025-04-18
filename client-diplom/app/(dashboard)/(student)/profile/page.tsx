"use client";

import { Portfolio } from "@/components/Portfolio/Portfolio";
import { Profile } from "@/components/Profile";
import StudentGradesPage from "@/components/StudentGradesPages";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Box, Skeleton, Spinner, Tabs, Text } from "@radix-ui/themes";

export default function ProfilePage() {
  const { profileUser, loading } = useUserProfile();

  return (
    <div>
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">Ваш профиль</Tabs.Trigger>
          <Tabs.Trigger value="grades">Оценки</Tabs.Trigger>
          <Tabs.Trigger value="portfolio">Портфолио</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="account">
            <Spinner loading={loading}>
              {profileUser && <Profile profileUser={profileUser} />}
            </Spinner>
          </Tabs.Content>

          <Tabs.Content value="grades">
            <StudentGradesPage />
          </Tabs.Content>

          <Tabs.Content value="portfolio">
            {profileUser && (
              <Spinner loading={loading}>
                <Portfolio
                  userId={profileUser?.id}
                />
              </Spinner>
            )}
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
}
