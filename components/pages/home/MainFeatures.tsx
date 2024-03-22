import { FaGlobe, FaBook, FaSearch } from 'react-icons/fa' // Updated imports

const MainFeatures = () => {
  return (
    <div className="bg-blue-900 text-white p-20">
      <h1 className="text-4xl font-bold text-center mb-10">
        Documentation Leveled Up
      </h1>
      <div className="flex justify-center text-center space-x-10">
        {/* Localization */}
        <div className="flex flex-col items-center">
          <FaGlobe size={50} className="mb-4" />
          <h2 className="text-2xl font-semibold">Localization</h2>
          <p>
            Overcome language barriers to reach a global audience effectively.
          </p>
        </div>

        {/* Document Versioning */}
        <div className="flex flex-col items-center">
          <FaBook size={50} className="mb-4" />
          <h2 className="text-2xl font-semibold">Document Versioning</h2>
          <p>Manage content versions for accuracy and consistency.</p>
        </div>

        {/* Algolia Search */}
        <div className="flex flex-col items-center">
          <FaSearch size={50} className="mb-4" />
          <h2 className="text-2xl font-semibold">Algolia Search</h2>
          <p>Improve navigation with fast and accurate search results.</p>
        </div>
      </div>
    </div>
  )
}

export default MainFeatures
