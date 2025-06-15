import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Coming Soon | AllAiTools',
  description: 'Our AI tools blog is coming soon. Stay tuned for the latest insights, tutorials, and news about AI tools and artificial intelligence technology.',
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-blue-500 rounded-full flex items-center justify-center mb-8 mx-auto">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Blog <span className="text-primary-600 dark:text-primary-400">Coming Soon</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Our team is working hard to bring you the latest insights, tutorials, and news about AI tools and artificial intelligence technology.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                What to Expect
              </h2>
              <ul className="text-left space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>In-depth AI tool reviews and comparisons</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Step-by-step tutorials and guides</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Industry news and AI trends analysis</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Expert insights and best practices</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Case studies and success stories</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Get Notified When We Launch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Be the first to know when our blog goes live with exclusive AI insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Notify Me
            </button>
          </form>
        </div>
      </section>

      {/* Development Status */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse mr-3"></div>
              <span className="text-primary-700 dark:text-primary-300 font-medium">
                Currently in Development
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Our development team is actively working on bringing you a comprehensive blog experience. 
              Check back soon for updates!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
