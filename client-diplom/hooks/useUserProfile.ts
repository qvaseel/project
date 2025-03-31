import { useEffect, useState } from 'react';
import useAuthStore from '@/store/authStore';

export const useUserProfile = () => {
  const [loading, setLoading] = useState(true);
  const { profileUser, decodedUser, setProfileUser, token, logout } =
    useAuthStore();

  useEffect(() => {
    if (token && decodedUser && !profileUser) {
      setProfileUser(decodedUser.id).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [decodedUser, profileUser, setProfileUser, token]);
  console.log(profileUser)
  return { loading, profileUser, groupId: profileUser?.group?.id, logout };
};
