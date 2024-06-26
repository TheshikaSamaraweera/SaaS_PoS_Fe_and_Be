// src/app/manager/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server';
import DashboardPage from './DashboardPage';

export default async function Page() {
  const { userId, orgId } = auth();

  if (!userId) {
    return <div>Please log in</div>;
  }

  return <DashboardPage userId={userId} />;
}
