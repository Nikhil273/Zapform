import { UserPlusIcon, RectangleStackIcon, CodeBracketIcon, InboxArrowDownIcon } from "@heroicons/react/24/outline";

import React from 'react'

const HowItWorks = () => {
  return (
    <section className="bg-white py-20" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
        <p className="text-gray-600 mb-12">
          Set up your form backend in minutes — no server needed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          <div className="flex items-start gap-4">
            <UserPlusIcon className="w-10 h-10 text-indigo-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Sign up</h3>
              <p className="text-sm text-gray-600">Create your account to access the form dashboard.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <RectangleStackIcon className="w-10 h-10 text-indigo-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Create a form</h3>
              <p className="text-sm text-gray-600">Generate your endpoint from the dashboard panel.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CodeBracketIcon className="w-10 h-10 text-indigo-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
              <p className="text-sm text-gray-600">Attach your endpoint to any frontend form code.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <InboxArrowDownIcon className="w-10 h-10 text-indigo-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Collect & track</h3>
              <p className="text-sm text-gray-600">Get submissions, email alerts, and logs instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default HowItWorks