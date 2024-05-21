import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Testimonials from "../components/Testimonials";
import { motion } from "framer-motion";

const AboutUs = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="h-full mb-10">
      <motion.section
        id="features"
        className="flex flex-col justify-center items-center mt-36"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="relative mx-auto max-w-5xl text-center" variants={fadeIn}>
          <span className="text-gray-600 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
            Discover Pincident Lite
          </span>
          <h2 className="block w-full bg-gradient-to-b from-blue-600 to-gray-500 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
            Innovating Business Management
          </h2>
          <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
            Our project is an advanced company management system designed to streamline workflows and enhance organizational control. Through the use of microservices architecture and Role-Centric Attribute-Based Access Control (RABAC), we provide a secure, flexible, and efficient platform for businesses.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-7xl grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
        >
          <motion.div className="rounded-md border border-blue-600 p-8 text-center shadow bg-white hover:shadow-lg transition-shadow duration-300" variants={fadeIn}>
            <div
              className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border mb-4"
              style={{
                backgroundImage: "linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)",
                borderColor: "rgb(93, 79, 240)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-color-swatch"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"></path>
                <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"></path>
                <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
                <line x1="17" y1="17" x2="17" y2="17.01"></line>
              </svg>
            </div>
            <h3 className="mt-6 text-gray-600">Enhanced Security</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
              Our microservices architecture ensures secure isolation of functionalities, reducing vulnerabilities and safeguarding sensitive data.
            </p>
          </motion.div>

          <motion.div className="rounded-md border border-blue-600 p-8 text-center shadow bg-white hover:shadow-lg transition-shadow duration-300" variants={fadeIn}>
            <div
              className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border mb-4"
              style={{
                backgroundImage: "linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)",
                borderColor: "rgb(93, 79, 240)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-bolt"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3"></polyline>
              </svg>
            </div>
            <h3 className="mt-6 text-gray-600">Flexible Management</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
              Our platform's modular framework allows for easy updates, testing, and debugging, enhancing code management and system scalability.
            </p>
          </motion.div>

          <motion.div className="rounded-md border border-blue-600 p-8 text-center shadow bg-white hover:shadow-lg transition-shadow duration-300" variants={fadeIn}>
            <div
              className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border mb-4"
              style={{
                backgroundImage: "linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)",
                borderColor: "rgb(93, 79, 240)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-tools"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"></path>
                <line x1="14.5" y1="5.5" x2="18.5" y2="9.5"></line>
                <polyline points="12 8 7 3 3 7 8 12"></polyline>
                <line x1="7" y1="8" x2="5.5" y2="9.5"></line>
                <polyline points="16 12 21 17 17 21 12 16"></polyline>
                <line x1="16" y1="17" x2="14.5" y2="18.5"></line>
              </svg>
            </div>
            <h3 className="mt-6 text-gray-600">Improved Performance</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
              Our microservices architecture reduces network congestion, ensuring a responsive and efficient system.
            </p>
          </motion.div>
        </motion.div>

        <motion.div className="my-16 mx-auto max-w-5xl" variants={fadeIn} initial="hidden" animate="visible">
          <h2 className="text-3xl font-bold text-center text-gray-600 mb-8">
            Our Mission
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Our mission is to revolutionize company management by providing a robust, flexible, and secure platform. We aim to enhance business workflows, improve control, and offer customizable digital environments tailored to the unique needs of each company. By leveraging modern technology and strategic design, we set a new standard in organizational management.
          </p>
        </motion.div>
      </motion.section>
      <Testimonials />
    </div>
  );
};

export default AboutUs;
