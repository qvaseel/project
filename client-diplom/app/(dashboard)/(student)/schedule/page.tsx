"use client"

import React, { useEffect } from 'react';
import ScheduleTable from '@/components/ScheduleTable';
import { useScheduleStore } from '@/store/scheduleStore';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Spinner } from '@radix-ui/themes';

const SchedulePage: React.FC = () => {
  const fetchSchedule = useScheduleStore((state) => state.fetchSchedule);
  const scLoading = useScheduleStore((state) => state.loading);
  const { profileUser, loading, groupId } = useUserProfile();

  useEffect(() => {
    if (groupId) {
      fetchSchedule(groupId);
    }
  }, [fetchSchedule, profileUser]);

  return (
    <div className="container mx-auto p-6">
      <Spinner loading={loading || scLoading}>
        <ScheduleTable />
      </Spinner>
    </div>
  );
};

export default SchedulePage;
