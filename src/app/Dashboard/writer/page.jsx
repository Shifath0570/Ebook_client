import { getUserSession } from '@/lib/core/session';
import React from 'react';

const DashboardWriterPage =async() => {
  const user = await getUserSession()
  return (
    <div>
      <h2>Welcome {user.role} {user.name}</h2>
    </div>
  );
};

export default DashboardWriterPage;