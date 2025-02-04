import DashboardLayout from "../components/DashboardLayout";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Contact() {
    return (
        <DashboardLayout>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Us</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Information Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Get in Touch</h2>

                        {/* 
                        * ========================================
                        * CONTACT DETAILS CUSTOMIZATION
                        * ========================================
                        * Replace the placeholder information below with your actual contact details
                        */}

                        {/* Email Contact */}
                        <div className="flex items-center mb-4">
                            <FiMail className="text-blue-600 mr-3 text-xl" />
                            <div>
                                <h3 className="font-medium text-gray-800 dark:text-gray-200">Email</h3>
                                {/* TODO: Replace with your contact email */}
                                <p className="text-gray-600 dark:text-gray-400">contact@studysphere.com</p>
                            </div>
                        </div>

                        {/* Phone Contact */}
                        <div className="flex items-center mb-4">
                            <FiPhone className="text-blue-600 mr-3 text-xl" />
                            <div>
                                <h3 className="font-medium text-gray-800 dark:text-gray-200">Phone</h3>
                                {/* TODO: Replace with your contact phone number */}
                                <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="flex items-center mb-4">
                            <FiMapPin className="text-blue-600 mr-3 text-xl" />
                            <div>
                                <h3 className="font-medium text-gray-800 dark:text-gray-200">Address</h3>
                                {/* 
                                * TODO: Replace with your physical address
                                * Format: Street, City, State, ZIP
                                */}
                                <p className="text-gray-600 dark:text-gray-400">
                                    123 Learning Street<br />
                                    Education City, ED 12345<br />
                                    United States
                                </p>
                            </div>
                        </div>

                        {/* 
                        * ========================================
                        * SOCIAL MEDIA LINKS
                        * ========================================
                        * Uncomment and customize the social media section below if needed
                        * 
                        * <div className="mt-6">
                        *     <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Follow Us</h3>
                        *     <div className="flex space-x-4">
                        *         <!-- Add your social media links here -->
                        *         <!-- Example:
                        *         <a href="https://twitter.com/youraccount" className="text-blue-600 hover:text-blue-700">
                        *             <FiTwitter className="text-xl" />
                        *         </a>
                        *         -->
                        *     </div>
                        * </div>
                        */}
                    </div>

                    {/* Contact Form Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Send us a Message</h2>

                        {/* 
                        * ========================================
                        * CONTACT FORM HANDLING
                        * ========================================
                        * TODO: Add form handling logic
                        * 1. Create a form submission handler
                        * 2. Add validation
                        * 3. Connect to your backend API
                        */}
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
} 