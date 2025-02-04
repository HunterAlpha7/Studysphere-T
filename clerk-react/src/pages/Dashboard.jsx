import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import DashboardLayout from "../components/DashboardLayout";

export default function Dashboard() {
    return (
        <>
            <SignedIn>
                <DashboardLayout>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Welcome to your Studysphere dashboard!
                        </p>
                    </div>
                </DashboardLayout>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
} 