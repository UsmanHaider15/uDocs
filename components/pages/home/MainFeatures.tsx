import { FaGlobe, FaBook, FaSearch } from 'react-icons/fa' // Updated imports

const features = [
  {
    Icon: FaGlobe,
    title: 'Localization',
    description:
      'Overcome language barriers to reach a global audience effectively.',
  },
  {
    Icon: FaBook,
    title: 'Document Versioning',
    description: 'Manage content versions for accuracy and consistency.',
  },
  {
    Icon: FaSearch,
    title: 'Algolia Search',
    description: 'Improve navigation with fast and accurate search results.',
  },
]
const MainFeatures = () => {
  return (
    <div className="bg-light-base dark:bg-dark-base text-light-text dark:text-dark-text p-20">
      <h1 className="text-4xl font-bold text-center mb-14">
        Documentation Leveled Up
      </h1>
      <div className="flex justify-center text-center space-x-10 py-8">
        {/* Localization */}
        {features.map(({ Icon, title, description }) => (
          <div className="flex flex-col items-center">
            <Icon
              size={50}
              className="mb-4 text-light-primary dark:text-dark-primary"
            />
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainFeatures
