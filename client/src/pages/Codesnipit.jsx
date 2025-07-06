import React from 'react'

const Codesnipit = () => {
  return (
    <div><section className="bg-gray-50 py-20" id="demo">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Try it yourself</h2>
        <p className="text-gray-600 mb-8">
          Drop this code into your HTML and start collecting submissions.
        </p>

        <div className="bg-black text-white text-sm rounded-md overflow-auto text-left p-6 font-mono shadow-lg">
          <pre>{`<form action="https://api.Zapform.dev/form/your-id" method="POST">
  <input type="email" name="email" placeholder="Your email" required />
  <button type="submit">Submit</button>
</form>`}</pre>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Replace <code>your-id</code> with your actual form endpoint.
        </p>
      </div>
    </section>
    </div>
  )
}

export default Codesnipit