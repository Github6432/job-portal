import React from 'react';

const Services: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Our Services</h1>
      <div className="max-w-3xl text-center mb-8">
        <p className="text-lg">
          We offer a range of services designed to help you succeed. Our dedicated team is committed to providing high-quality solutions tailored to your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Service 1 */}
        <div className="p-4 border rounded-lg shadow-md">
          <img
            src="https://plus.unsplash.com/premium_photo-1664476591475-6d0cb15f5348?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Service img
            alt="Service 1"
            width={400} // Adjust width as needed
            height={300} // Adjust height as needed
            className="rounded-lg mb-4"
          />
          <h3 className="text-2xl font-semibold">Consulting</h3>
          <p className="">
            Our expert consultants are here to provide you with the guidance you need to navigate complex challenges and achieve your goals.
          </p>
        </div>

        {/* Service 2 */}
        <div className="p-4 border rounded-lg shadow-md">
          <img
            src="https://images.unsplash.com/photo-1653669487177-d7c8e245f0f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Service img
            alt="Service 2"
            width={400}
            height={300}
            className="rounded-lg mb-4"
          />
          <h3 className="text-2xl font-semibold">Development</h3>
          <p className="">
            We offer custom software development services to help you build robust and scalable applications tailored to your business needs.
          </p>
        </div>

        {/* Service 3 */}
        <div className="p-4 border rounded-lg shadow-md">
          <img
            src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Service img
            alt="Service 3"
            width={400}
            height={300}
            className="rounded-lg mb-4"
          />
          <h3 className="text-2xl font-semibold">Design</h3>
          <p className="">
            Our design team creates beautiful and user-friendly interfaces that enhance user experience and drive engagement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;