import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Mail, User, AlertCircle } from "lucide-react";

export default async function DashboardPage() {
  const { userId, orgId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-violet-50 to-purple-100">
      {/* Header Section */}
      <header className="px-6 py-16 bg-gradient-to-r from-violet-900 via-purple-700 to-pink-600 text-white shadow-lg rounded-b-3xl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-2">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-lg text-violet-100">
            Manage your social presence, schedule posts, and analyze performance
            — all in one place.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-10 max-w-6xl mx-auto space-y-10">
        {/* Profile summary card */}
        <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Your Account
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* User ID */}
            <div className="p-5 bg-violet-50 rounded-xl border border-violet-100">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-violet-700" />
                <span className="text-sm text-gray-600">User ID</span>
              </div>
              <p className="font-mono text-sm text-gray-900 break-all">
                {userId}
              </p>
            </div>

            {/* Email */}
            <div className="p-5 bg-purple-50 rounded-xl border border-purple-100">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-purple-700" />
                <span className="text-sm text-gray-600">Email</span>
              </div>
              <p className="font-mono text-sm text-gray-900 break-all">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>

            {/* Organization */}
            <div className="p-5 bg-pink-50 rounded-xl border border-pink-100">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-5 h-5 text-pink-700" />
                <span className="text-sm text-gray-600">Organization</span>
              </div>
              <p className="font-mono text-sm text-gray-900 break-all">
                {orgId || "None"}
              </p>
            </div>
          </div>
        </section>

        {/* Organization CTA */}
        {!orgId && (
          <section className="bg-yellow-50 border border-yellow-200 text-yellow-900 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">No Organization Found</h3>
                <p className="text-sm text-yellow-800 mt-1">
                  You're not part of an organization yet. Create one to start
                  scheduling posts, managing team members, and analyzing
                  performance.
                </p>

                <Button className="mt-4 bg-violet-600 hover:bg-violet-700 text-white">
                  Create Organization
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}



// // apps/web/src/app/dashboard/page.tsx

// import { auth, currentUser } from '@clerk/nextjs/server'
// import { redirect } from 'next/navigation'

// export default async function DashboardPage() {
//   const { userId, orgId } = await auth()
  
//   if (!userId) {
//     redirect('/sign-in')
//   }

//   const user = await currentUser()
  
//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="mx-auto max-w-4xl">
//         <h1 className="text-3xl font-bold mb-4">
//           Welcome to PostPulse{user?.firstName ? `, ${user.firstName}` : ''}!
//         </h1>
        
//         <div className="bg-white rounded-lg shadow p-6 space-y-4">
//           <div>
//             <p className="text-sm text-gray-500">User ID</p>
//             <p className="font-mono text-sm break-all">{userId}</p>
//           </div>
          
//           <div>
//             <p className="text-sm text-gray-500">Email</p>
//             <p className="font-mono text-sm break-all">
//               {user?.emailAddresses?.[0]?.emailAddress || 'No email'}
//             </p>
//           </div>
          
//           <div>
//             <p className="text-sm text-gray-500">Organization ID</p>
//             <p className="font-mono text-sm break-all">{orgId || 'No organization selected'}</p>
//           </div>

//           {!orgId && (
//             <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mt-4">
//               <p className="text-sm text-yellow-800">
//                 ⚠️ You need to create an organization to use PostPulse.
//               </p>
//               <p className="text-xs text-yellow-700 mt-2">
//                 Click your profile picture (top-right) → "Create organization"
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }



// import { auth, currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, Building2, Mail, User, AlertCircle } from "lucide-react";

// export default async function DashboardPage() {
//   const { userId, orgId } = await auth();

//   if (!userId) redirect("/sign-in");

//   const user = await currentUser();

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-violet-50 to-purple-100">
//       {/* Header Section */}
//       <header className="px-6 py-16 bg-gradient-to-r from-violet-900 via-purple-700 to-pink-600 text-white shadow-lg rounded-b-3xl">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-4xl font-extrabold mb-2">
//             Welcome back, {user?.firstName}! 👋
//           </h1>
//           <p className="text-lg text-violet-100">
//             Manage your social presence, schedule posts, and analyze performance
//             — all in one place.
//           </p>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="px-6 py-10 max-w-6xl mx-auto space-y-10">
//         {/* Profile summary card */}
//         <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//             Your Account
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             {/* User ID */}
//             <div className="p-5 bg-violet-50 rounded-xl border border-violet-100">
//               <div className="flex items-center gap-3 mb-2">
//                 <User className="w-5 h-5 text-violet-700" />
//                 <span className="text-sm text-gray-600">User ID</span>
//               </div>
//               <p className="font-mono text-sm text-gray-900 break-all">
//                 {userId}
//               </p>
//             </div>

//             {/* Email */}
//             <div className="p-5 bg-purple-50 rounded-xl border border-purple-100">
//               <div className="flex items-center gap-3 mb-2">
//                 <Mail className="w-5 h-5 text-purple-700" />
//                 <span className="text-sm text-gray-600">Email</span>
//               </div>
//               <p className="font-mono text-sm text-gray-900 break-all">
//                 {user?.emailAddresses[0]?.emailAddress}
//               </p>
//             </div>

//             {/* Organization */}
//             <div className="p-5 bg-pink-50 rounded-xl border border-pink-100">
//               <div className="flex items-center gap-3 mb-2">
//                 <Building2 className="w-5 h-5 text-pink-700" />
//                 <span className="text-sm text-gray-600">Organization</span>
//               </div>
//               <p className="font-mono text-sm text-gray-900 break-all">
//                 {orgId || "None"}
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Organization CTA */}
//         {!orgId && (
//           <section className="bg-yellow-50 border border-yellow-200 text-yellow-900 rounded-xl p-6 shadow-sm">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="w-6 h-6 mt-1 flex-shrink-0" />

//               {/* FIX: Changed parent from <p> to <div> to allow the button inside */}
//               <div>
//                 <h3 className="font-semibold text-lg">No Organization Found</h3>

//                 <p className="text-sm text-yellow-800 mt-1">
//                   You're not part of an organization yet. Create one to start
//                   scheduling posts, managing team members, and analyzing
//                   performance.
//                 </p>

//                 <Button className="mt-4 bg-violet-600 hover:bg-violet-700 text-white">
//                   Create Organization
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </Button>
//               </div>
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }