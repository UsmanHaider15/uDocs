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
    <div className="text-center bg-light-base dark:bg-dark-base text-light-text dark:text-dark-text mb-10 md:mb-40">
      <h1 className="text-2xl md:text-4xl font-bold mb-5 md:mb-10">
        Documentation Leveled Up
      </h1>
      <div className="flex flex-wrap justify-center text-center gap-5 md:gap-10">
        {features.map(({ Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-center max-w-xs md:max-w-sm px-4"
          >
            <Icon
              size={50}
              className="mb-4 text-light-primary dark:text-dark-primary"
            />
            <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
            <p className="text-sm md:text-base">{description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainFeatures
