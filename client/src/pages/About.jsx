import React from 'react'

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
    </section>
    </div>
  )
}

export default About