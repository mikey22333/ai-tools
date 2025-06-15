export default function ToolsLoading() {
  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-700 rounded-lg w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-700 rounded-lg w-96 mx-auto"></div>
          </div>
        </div>
        
        <div className="bg-dark-800 rounded-xl p-6 mb-8 animate-pulse">
          <div className="h-32 bg-gray-700 rounded-lg"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-dark-800 rounded-xl p-6 animate-pulse">
              <div className="h-12 w-12 bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}