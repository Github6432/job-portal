import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
      <div className="max-w-3xl text-center mb-8">
        <p className="text-lg dark:text-white">
          We are a team of passionate individuals dedicated to providing the best service possible. Our mission is to make a positive impact through our work and to connect people with opportunities that can change their lives.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <img
          src="https://images.unsplash.com/photo-1653669487003-7d89b2020f3c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Unsplash img
          alt="About Us"
          width={600} // Adjust width as needed
          height={400} // Adjust height as needed
          className="rounded-lg shadow-lg"
        />
      </div>

      <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
      <ul className="list-disc list-inside dark:text-white text-lg mb-8">
        <li>Integrity</li>
        <li>Excellence</li>
        <li>Collaboration</li>
        <li>Innovation</li>
      </ul>

      <h2 className="text-3xl font-semibold mb-4">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border dark:border-red-200 shadow-inherit rounded-lg shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Team member img
            alt="Team Member 1"
            width={200} // Adjust width as needed
            height={200} // Adjust height as needed
            className="rounded-full mx-auto mb-2"
          />
          <h3 className="text-lg font-bold">John Doe</h3>
          <p className="dark:text-white">CEO</p>
        </div>

        <div className="p-4 border dark:border-red-200 shadow-inherit rounded-lg shadow-md">
          <img
            src="https://images.unsplash.com/photo-1496440737103-cd596325d314?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Team member img
            alt="Team Member 2"
            width={200}
            height={200}
            className="rounded-full mx-auto mb-2"
          />
          <h3 className="text-lg font-bold">Jane Smith</h3>
          <p className="dark:text-white">CTO</p>
        </div>

        <div className="p-4 border dark:border-red-200 shadow-inherit rounded-lg shadow-md">
          <img
            src="https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Team member img
            alt="Team Member 3"
            width={200}
            height={200}
            className="rounded-full mx-auto mb-2"
          />
          <h3 className="text-lg font-bold">Alice Johnson</h3>
          <p className="dark:text-white">Designer</p>
        </div>
      </div>
    </div>
  );
};

export default About;