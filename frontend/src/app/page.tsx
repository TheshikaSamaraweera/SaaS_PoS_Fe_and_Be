/** @format */

import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import Link from "next/link";

import Head from 'next/head';
import Footer from '@/components/ui/footer';


export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Your SaaS Application | Homepage</title>
        <meta name="description" content="Your SaaS Application description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header section */}
      <header className="bg-white shadow-md w-full p-4">
  <div className="container mx-auto flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <img src="/images/4.png" alt="Company Logo" className="h-16 w-auto" />
    </div>
    <nav className="flex space-x-4">
      <a href="/sign-in" className="border border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white py-3 px-6 rounded-lg shadow-md mt-6 transition duration-300 ease-in-out">
        Use App
      </a>
      <a href="/payment" className="border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white hover:text-white py-3 px-6 rounded-lg shadow-md mt-6 transition duration-300 ease-in-out">
        Buy now
      </a>
    </nav>
  </div>
</header>



      {/* Main content section */}
      <main className="flex-grow container mx-auto mt-8">
      <section className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
  <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
    <h1 className="text-4xl font-bold">Create Your SaaS Application</h1>
    <p className="text-lg max-w-xl text-gray-700 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et ex in lacus tincidunt finibus. Donec auctor erat a nunc sodales, vitae vestibulum dolor placerat.</p>
    <a href="/payment" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md mt-6 transition duration-300 ease-in-out">Buy Now</a>
  </div>
  <div className="flex-1 mt-6 md:mt-0">
    <img src="/images/3.png" alt="SaaS Application" className="w-full h-auto rounded-lg shadow-md transform transition duration-300 hover:scale-105" />
  </div>
</section>

        {/* Features section */}
        <section className="mt-12">
  <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Feature 1 */}
    <div className="p-6 bg-white rounded-lg shadow-md">
      <img src="/images/1.png" alt="Feature 1" className="w-full h-auto rounded-lg mb-4" />
      <h3 className="text-xl font-semibold mb-4">Feature 1</h3>
      <p className="text-lg text-gray-700">Description of feature 1.</p>
    </div>
    {/* Feature 2 */}
    <div className="p-6 bg-white rounded-lg shadow-md">
      <img src="/images/2.png" alt="Feature 2" className="w-full h-auto rounded-lg mb-4" />
      <h3 className="text-xl font-semibold mb-4">Feature 2</h3>
      <p className="text-lg text-gray-700">Description of feature 2.</p>
    </div>
    {/* Feature 3 */}
    <div className="p-6 bg-white rounded-lg shadow-md">
      <img src="/images/2.png" alt="Feature 3" className="w-full h-auto rounded-lg mb-4" />
      <h3 className="text-xl font-semibold mb-4">Feature 3</h3>
      <p className="text-lg text-gray-700">Description of feature 3.</p>
    </div>
  </div>
</section>
<section className="bg-gray-200 py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">See Our Product in Action</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img src="/images/2.png" alt="Image 1" className="w-full h-auto" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
                  <a href="#" className="text-white text-lg font-semibold">Watch Video</a>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img src="/image2.jpg" alt="Image 2" className="w-full h-auto" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
                  <a href="#" className="text-white text-lg font-semibold">View Demo</a>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img src="/image3.jpg" alt="Image 3" className="w-full h-auto" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
                  <a href="#" className="text-white text-lg font-semibold">Learn More</a>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-4">About Our Company</h3>
              <p className="text-lg text-center max-w-3xl mx-auto text-gray-700">
                We are a leading provider of SaaS POS solutions, dedicated to helping businesses streamline their operations and enhance customer experiences. Our innovative approach and cutting-edge technology have earned us a reputation for excellence in the industry.
              </p>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-4">Owner Information</h3>
              <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8">
                <img src="/images/owner.jpeg" alt="John Doe" className="w-32 h-32 rounded-full shadow-md mb-4 md:mb-0" />
                <p className="text-lg text-center md:text-left text-gray-700">
                  <strong>John Doe</strong> - Founder & CEO
                  <br />
                  With over 20 years of experience in the tech industry, John Doe has a passion for innovation and a vision for transforming the way businesses operate through technology.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-4">Our Clients</h3>
              <p className="text-lg text-center max-w-3xl mx-auto text-gray-700">
                We are proud to have partnered with numerous organizations across various industries. Here are some of the businesses that have benefited from our SaaS POS app:
              </p>
              <div className="flex flex-wrap justify-center items-center mt-6 space-x-4">
                <img src="/images/client1.jpg" alt="Retail Giant Inc." className="w-32 h-auto mb-4" />
                <img src="/images/client2.jpeg" alt="Restaurant Haven" className="w-32 h-auto mb-4" />
                <img src="/images/client3.jpg" alt="Fashion Boutique Co." className="w-32 h-auto mb-4" />
                <img src="/images/client4.png" alt="Fitness Center Network" className="w-32 h-auto mb-4" />
              </div>
            </div>
          </div>
        </section>

    </main>

      <Footer />
    </div>
  




      
  );
}
