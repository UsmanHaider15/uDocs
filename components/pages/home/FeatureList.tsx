import React from 'react'
import { FaCode, FaPlug, FaRocket, FaMoon, FaBoxOpen } from 'react-icons/fa'
import { MdWorkspaces } from 'react-icons/md'
import { SiTypescript } from 'react-icons/si'
import { IoMdSpeedometer } from 'react-icons/io'

const Feature = ({ Icon, title, description }) => (
  <div className="flex items-center space-x-4">
    <div className="w-12 h-12 flex items-center justify-center text-light-text dark:text-dark-text rounded-full">
      <Icon
        className="w-full h-full text-light-primary dark:text-dark-primary"
        size={40}
      />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
        {title}
      </h3>
      <p className="text-sm text-light-text dark:text-dark-text">
        {description}
      </p>
    </div>
  </div>
)

const features = [
  {
    Icon: MdWorkspaces,
    title: 'Incremental Static Regeneration (ISR)',
    description:
      'Update content without full rebuilds, enhancing site performance and user experience.',
  },
  {
    Icon: FaRocket,
    title: 'Real-time editing and previews',
    description:
      'Instantly see changes with real-time editing and previews, boosting productivity.',
  },
  {
    Icon: FaPlug,
    title: 'Deployed on Vercel',
    description:
      'Deploy effortlessly with Vercel for fast, secure, and scalable applications.',
  },
  {
    Icon: IoMdSpeedometer,
    title: 'SEO Optimized',
    description:
      'Improve your site’s search engine ranking with built-in SEO optimizations.',
  },
  {
    Icon: SiTypescript,
    title: 'Sweet DX (Developer Experience)',
    description:
      'Enjoy a better development workflow with TypeScript for reliable and maintainable code.',
  },
  {
    Icon: FaMoon,
    title: 'Dark mode',
    description:
      'Offer a dark mode to reduce eye strain and meet user preferences.',
  },
  {
    Icon: FaBoxOpen,
    title: 'Responsive Design',
    description:
      'Adapt your site to any device for an optimal viewing experience.',
  },
  {
    Icon: FaCode,
    title: 'Embeddable Studio',
    description:
      'Customize your development environment with an embeddable studio for enhanced collaboration.',
  },
]

const FeatureList = () => {
  return (
    <div className="text-light-text dark:text-dark-text max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-screen-md mx-auto mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          Features you&apos;ll love
        </h1>
        <p className="text-base sm:text-lg">
          A platform you can rely on to reach your audience
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 bg-light-secondary dark:bg-dark-secondary p-5 sm:p-8 rounded-md">
        {features.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </div>
  )
}

export default FeatureList
