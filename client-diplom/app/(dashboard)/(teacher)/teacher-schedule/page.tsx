"use client"

import React, { useEffect } from 'react';
import ScheduleTable from '@/components/ScheduleTable';
import { useScheduleStore } from '@/store/scheduleStore';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Spinner } from '@radix-ui/themes';
import TeacherScheduleTable from '@/components/TeacherScheduleTable';

const SchedulePage: React.FC = () => {
    const fetchScheduleForTeacher = useScheduleStore((state) => state.fetchScheduleForTeacher);
    const scLoading = useScheduleStore((state) => state.loading);
  const { profileUser, loading, groupId } = useUserProfile();
  

  useEffect(() => {
    if (profileUser?.id) { 
      fetchScheduleForTeacher(profileUser.id);
    }
  }, [fetchScheduleForTeacher, profileUser]);

  return (
    <div className="container mx-auto p-6">
      <Spinner loading={loading || scLoading}>
        <TeacherScheduleTable />
      </Spinner>
    </div>
  );
};

export default SchedulePage;
