import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LandingPage() {
    return (
        <>
            <SignedIn>
                <Navigate to="/dashboard" replace />
            </SignedIn>
            <SignedOut>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                    <Navbar />
                    <div className="container mx-auto px-4 pt-20">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                                Welcome to Studysphere
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                                Your ultimate platform for focused learning and collaboration
                            </p>
                            <div className="space-x-4">
                                <button
                                    onClick={() => window.location.href = "/sign-up"}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                                >
                                    Get Started
                                </button>
                                <button
                                    onClick={() => window.location.href = "/sign-in"}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition duration-200"
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </SignedOut>
        </>
    );
} 