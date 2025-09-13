// components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="px-4 py-4 flex flex-wrap items-center justify-between bg-gray-800 ">
        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-600">
          WealthWise
        </div>

        <div className="mt-3 md:mt-0 flex space-x-3">
          <Link
            to="/login"
            className="px-5 py-2 md:px-6 md:py-3 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-700 hover:from-blue-600 hover:to-purple-800 transition-all duration-300 shadow-lg text-sm md:text-base"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 md:px-6 md:py-3 rounded-full text-white font-semibold bg-gradient-to-r from-green-400 to-teal-600 hover:from-green-500 hover:to-teal-700 transition-all duration-300 shadow-lg text-sm md:text-base"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex-grow flex flex-col  items-center justify-center text-center px-6 py-12  md:p-12 md:py-40 bg-gradient-to-br from-black to-purple-900 shadow-inner min-h-[70vh] md:min-h-[80vh] ">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg">
          Smarter Tracking, Wiser Spending
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 md:mb-10 leading-relaxed">
          From effortless budgeting to personalized insights, WealthWise helps
          you take charge of your financial journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/signup"
            className="px-8 py-4 md:px-10 md:py-5 rounded-full text-white text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-600 hover:from-green-500 hover:to-teal-700 active:from-green-500 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Get Started
          </Link>
          <a
            href="#learn-more"
            className="px-8 py-4 md:px-10 md:py-5 rounded-full text-white text-lg md:text-xl font-bold border-2 border-blue-900 hover:border-purple-300 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Learn More
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section
        id="learn-more"
        className="py-16 md:py-20 bg-gray-800 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold mb-10 md:mb-12 text-white">
          Why Choose WealthWise?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto px-6">
          {/* Feature Card 1 */}
          <div className="p-6 md:p-8 bg-gray-900 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-blue-500">
            <div className="text-4xl md:text-5xl mb-4 text-blue-400">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              Income & Expense Tracking
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Easily add and manage your income and expenses to keep every
              transaction organized.
            </p>
          </div>
          {/* Feature Card 2 */}
          <div className="p-6 md:p-8 bg-gray-900 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-purple-500">
            <div className="text-4xl md:text-5xl mb-4 text-purple-400">
              <i className="fas fa-wallet"></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              Balance Overview
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Stay on top of your total balance with clear summaries of income,
              expenses, and savings.
            </p>
          </div>
          {/* Feature Card 3 */}
          <div className="p-6 md:p-8 bg-gray-900 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-green-500">
            <div className="text-4xl md:text-5xl mb-4 text-green-400">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              Charts & Insights
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Visualize your finances with interactive income–expense charts and
              easy-to-read pie charts.
            </p>
          </div>
          <div className="p-6 md:p-8 bg-gray-900 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-green-500">
            <div className="text-4xl md:text-5xl mb-4 text-green-400">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              Filter Transactions
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Quickly find what you need with powerful filters for dates,
              categories, and transaction types.
            </p>
          </div>
          <div className="p-6 md:p-8 bg-gray-900 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-green-500">
            <div className="text-4xl md:text-5xl mb-4 text-green-400">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              Email Scheduler
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Get daily reminders to log your income and expenses along with a
              detailed daily financial report delivered straight to your inbox.
            </p>
          </div>
          <div className="p-6 md:p-8 bg-gray-900 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-green-500">
            <div className="text-4xl md:text-5xl mb-4 text-green-400">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              Export & Download
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Download your income and expense reports in XLSX format and get
              them delivered straight to your email.
            </p>
          </div>
        </div>
      </section>

      {/* Website Tour Section */}
      <section
        className="py-16 md:py-20 bg-gray-900 text-center"
        id="website-tour"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold mb-10 md:mb-12 text-white">
          A Glimpse Inside WealthWise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto px-6">
          <div className="relative group rounded-xl shadow-2xl overflow-hidden transform active:scale-105 hover:scale-105 transition-all duration-300">
            <img
              src={assets.dashboard}
              alt="WealthWise Dashboard"
              className="w-full  h-auto object-cover rounded-xl border border-gray-700 group-hover:border-purple-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-400 flex items-end p-6">
              <h3 className="text-xl font-semibold text-white">
                Intuitive Dashboard
              </h3>
            </div>
          </div>
          <div className="relative group rounded-xl shadow-2xl overflow-hidden transform  active:scale-105 hover:scale-105 transition-all duration-300">
            <img
              src={assets.chart}
              alt="WealthWise Transactions"
              className="w-full h-auto object-cover rounded-xl border border-gray-700 group-hover:border-blue-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <h3 className="text-xl font-bold text-white">
                Insightful Charts & Graphs
              </h3>
            </div>
          </div>
          <div className="relative group rounded-xl shadow-2xl overflow-hidden transform active:scale-105 hover:scale-105 transition-all duration-300">
            <img
              src={assets.filter}
              alt="WealthWise Charts"
              className="w-full h-auto object-cover rounded-xl border border-gray-700 group-hover:border-green-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <h3 className="text-xl font-semibold text-white">
                Effortless Transaction Filtering
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-col items-center justify-center py-16 px-6 md:px-12 md:py-40 bg-gradient-to-br from-black to-purple-900 text-center min-h-[60vh] md:min-h-[80vh]">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 md:mb-8 text-white">
          Ready to Grow Your Wealth?
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto mb-8 md:mb-10">
          Join a growing community of wise savers and effortlessly take charge
          of your financial journey today.
        </p>
        <Link
          to="/signup"
          className="px-10 py-4 md:px-12 md:py-6 rounded-full text-white text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-700 hover:from-blue-600 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-2xl"
        >
          Sign Up for Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="p-6 md:p-8 text-center text-gray-500 bg-gray-950">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} WealthWise. All rights reserved.
        </p>
        <div className="mt-4 space-x-4 md:space-x-6 text-sm md:text-base">
          <a href="#" className="hover:text-gray-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-300">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-300">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
