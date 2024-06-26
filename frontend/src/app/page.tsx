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
    <p className="text-lg max-w-xl text-gray-700 mt-4">Welcome to our cutting-edge SaaS (Software as a Service) POS (Point of Sale) application, designed to streamline your business operations and enhance your overall efficiency. Our application is built with the latest technology to provide a seamless, user-friendly experience that can be customized to meet the unique needs of your business.</p>
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
      <h3 className="text-xl font-semibold mb-4">Customizable</h3>
      <p className="text-lg text-gray-700">Our SaaS POS app allows you to customize various aspects to suit your specific business needs, providing a tailored experience for your operations.</p>
    </div>
    {/* Feature 2 */}
    <div className="p-6 bg-white rounded-lg shadow-md">
      <img src="/images/2.png" alt="Feature 2" className="w-full h-auto rounded-lg mb-4" />
      <h3 className="text-xl font-semibold mb-4">User-Friendly</h3>
      <p className="text-lg text-gray-700">Designed with simplicity in mind, our SaaS POS app offers an intuitive interface that makes it easy for anyone to use, reducing the learning curve for new users.</p>
    </div>
    {/* Feature 3 */}
    <div className="p-6 bg-white rounded-lg shadow-md">
      <img src="/images/2.png" alt="Feature 3" className="w-full h-auto rounded-lg mb-4" />
      <h3 className="text-xl font-semibold mb-4">Easy to Manage</h3>
      <p className="text-lg text-gray-700">With robust management tools, our SaaS POS app simplifies the process of overseeing your business operations, allowing you to focus more on growth and less on day-to-day management.</p>
    </div>
  </div>
</section>
<section className="bg-gray-200 py-12">
          <div className="container mx-auto">
           
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-4">About Our Company</h3>
              <p className="text-lg text-center max-w-3xl mx-auto text-gray-700">
                We are a leading provider of SaaS POS solutions, dedicated to helping businesses streamline their operations and enhance customer experiences. Our innovative approach and cutting-edge technology have earned us a reputation for excellence in the industry.
              </p>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-4">Owner Information</h3>
              <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8">
                <img src="/images/owner.jpeg" alt="John Doe" className="w-32 h-32 rounded-full shadow-md mb-4 md:mb-0" />
                <p className="text-lg text-center md:text-left text-gray-700">
                  <strong>Charuka Samarakoon</strong> - Founder & CEO
                  <br />
                  With over 4 years of experience in the tech industry, Charuka Samarakoon has a passion for innovation and a vision for transforming the way businesses operate through technology.
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
