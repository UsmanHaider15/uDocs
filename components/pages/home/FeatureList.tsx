import React from 'react'
import { FaCode, FaPlug, FaRocket, FaMoon, FaBoxOpen } from 'react-icons/fa'
import { MdWorkspaces } from 'react-icons/md'
import { SiTypescript } from 'react-icons/si'
import { IoMdSpeedometer } from 'react-icons/io'

const Feature = ({ Icon, title, description }) => (
  <div className="flex items-center space-x-4">
    <div className="flex items-center justify-center p-4 bg-slate-600 text-white rounded-full">
      <Icon className="text-blue-500" size={40} />
    </div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{description}</p>
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
    <div className="bg-gray-800 text-white p-10 max-w-screen-lg mx-auto">
      <div className="text-center max-w-screen-sm mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          Beautiful documentation that converts users
        </h1>
        <p>A platform you can rely on to reach your audience</p>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-10 bg-slate-700 p-8 rounded-md">
        {features.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </div>
  )
}

export default FeatureList
