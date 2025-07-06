import React from 'react'
import { Link } from 'react-router-dom'
const About = () => {
  return (
    <div><section className="bg-gray-50 py-20 px-6" id="about">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About Zapform</h2>
        <p className="text-gray-600 text-lg mb-6">
          Zapform is a developer-first, serverless form backend that makes it effortless to collect and manage form submissions from any frontend — with zero backend setup.
        </p>
        <p className="text-gray-600 text-md mb-4">
          Whether you're building static sites, JAMstack apps, or simple prototypes, Zapform gives you instant endpoints, spam protection, email notifications, and submission tracking — all powered by a secure, modern stack.
        </p>
        <p className="text-gray-600 text-md">
          Zapform is designed to help indie developers, designers, and makers focus on building beautiful frontends while we handle the backend plumbing for forms.
        </p>
      </div>
      <div className="mt-10 text-center">
        <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition">
          Get Started Free
        </Link>
      </div>
    </section>

    </div>
  )
}

export default About