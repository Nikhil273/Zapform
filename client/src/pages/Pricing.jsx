import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";
const Pricing = () => {
  return (
    <div>

      <section className="bg-white py-20" id="pricing">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Completely Free</h2>
          <p className="text-gray-600 mb-8">
            Zapform is 100% free for early adopters — no credit card required.
          </p>

          <div className="border border-gray-200 rounded-2xl p-10 bg-gray-50 shadow-sm">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-6">Free Forever</h3>
            <ul className="text-left space-y-4 text-gray-700">
              {[
                "Unlimited form endpoints",
                "Email notifications",
                "Dashboard access",
                "Input validation",
                "Submission tracking",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/register" className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition">
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing