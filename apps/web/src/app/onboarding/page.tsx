import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const user = await currentUser()

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <OnboardingForm user={user} />
        </div>
    )
}