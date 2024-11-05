import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className=" flex flex-col md:flex-row items-center justify-center">
      {/* Left Side: Image and Contact Details */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
        <img
          src="https://media.istockphoto.com/id/1359556773/photo/shot-of-a-young-call-centre-agent-working-on-a-computer-in-an-office-with-her-colleague-in.jpg?s=1024x1024&w=is&k=20&c=5nGA1MMOxiDu2-qVO9tRXHlq0bgf9oW1Ylm2vLRUD6s=" // Sample image from Unsplash
          alt="Contact Us"
          width={500}
          height={300}
          className="rounded-lg shadow-lg mb-6"
        />
        <h2 className="text-3xl font-semibold mb-2">Get in Touch</h2>
        <p className="text-lg mb-4">
          Feel free to reach out to us via the contact form or the details below.
        </p>
        <div className="text-left">
          <p>📍 Address: 1234 Street Name, City, Country</p>
          <p>📞 Phone: (123) 456-7890</p>
          <p>✉️ Email: contact@example.com</p>
        </div>
      </div>

      {/* Right Side: Contact Form */}
      <div className="w-full md:w-1/2 p-6">
        <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
        <form className="w-full max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              required
              className="shadow dark:bg-gray-700 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              required
              className="shadow dark:bg-gray-700 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-bold mb-2">Message</label>
            <textarea
              id="message"
              required
              rows={4}
              className="shadow dark:bg-gray-700 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Message"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;