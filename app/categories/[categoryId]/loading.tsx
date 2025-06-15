export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Header Skeleton */}
        <div className="text-center mb-12 animate-pulse">
          <div className="w-24 h-24 bg-gray-700 rounded-3xl mx-auto mb-6"></div>
          <div className="h-12 bg-gray-700 rounded-lg w-80 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-700 rounded-lg w-96 mx-auto mb-6"></div>
          <div className="flex items-center justify-center space-x-8">
            <div className="h-12 bg-gray-700 rounded-xl w-32"></div>
            <div className="h-12 bg-gray-700 rounded-xl w-32"></div>
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className="bg-dark-800 rounded-2xl p-8 mb-12 animate-pulse">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="h-4 bg-gray-700 rounded mb-2 w-16"></div>
              <div className="h-12 bg-gray-700 rounded-xl"></div>
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-700 rounded mb-2 w-20"></div>
              <div className="h-12 bg-gray-700 rounded-xl"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-700 rounded mb-2 w-24"></div>
              <div className="h-12 bg-gray-700 rounded-xl w-32"></div>
            </div>
          </div>
        </div>

        {/* Tools Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="bg-dark-800 rounded-xl p-6 animate-pulse">
              <div className="h-12 w-12 bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-3 bg-gray-700 rounded w-16"></div>
                <div className="h-3 bg-gray-700 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}