import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId, orgId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to PostPulse, {user?.firstName}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-500">User ID</p>
          <p className="font-mono text-sm">{userId}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-mono text-sm">
            {user?.emailAddresses[0]?.emailAddress}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Organiztion ID</p>
          <p className="font-mono text-sm">
            {orgId || "No Organization selected"}
          </p>
        </div>

        {!orgId && (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 ">
            <p className="text-sm text-yellow-800">
              You're not in an organization. Create one to start scheduling
              posts
            </p>
          </div>
        )}
      </div>
    </div>
  );

}
