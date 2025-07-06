import {
  CloudArrowUpIcon,
  ShieldCheckIcon,
  EnvelopeOpenIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'


const features = [
  {
    name: ' Push to production',
    description:
      'Deploy form endpoints instantly without writing server code. Just plug your HTML forms into Zapform and start collecting submissions in seconds.',
    icon: CloudArrowUpIcon,
  },
  {
    name: ' JWT Authentication',
    description:
      'All API routes are protected with JSON Web Tokens, ensuring your forms and data stay secure at every step.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Email Notifications',
    description:
      'Get instant email alerts for every form submission. Stay in the loop without checking a dashboard every time.',
    icon: EnvelopeOpenIcon,
  },
  {
    name: 'Input Validation & Spam Protection',
    description:
      'Built-in input validation ensures your data is clean and safe. Combined with CORS support and custom rules, your form handling is smart and secure.',
    icon: ExclamationCircleIcon,
  },
]

export default function Feature() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Everything you need to collect and manage form submissions
          </p>
          <p className="mt-6 text-lg/8 text-gray-700">
            Zapform lets developers easily handle form submissions without setting up any backend infrastructure. Create secure endpoints, get notified instantly, and track submissions — all from a simple dashboard.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>


    </div>
  )
}
