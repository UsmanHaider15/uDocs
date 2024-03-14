import React from 'react'
import {
  FaRegCompass,
  FaCode,
  FaPlug,
  FaRocket,
  FaMoon,
  FaBoxOpen,
  FaPuzzlePiece,
} from 'react-icons/fa'
import { MdWorkspaces } from 'react-icons/md'
import { SiTypescript } from 'react-icons/si'
import { IoMdSpeedometer } from 'react-icons/io'

const FeatureGrid = () => {
  return (
    <div className="font-sans font-medium text-light-text dark:text-dark-text">
      <div className="grid md:grid-cols-4 gap-4 justify-center">
        {[
          {
            Icon: MdWorkspaces,
            title: 'Incremental Static Regeneration (ISR)',
          },
          { Icon: FaRocket, title: 'Real-time editing and previews' },
          { Icon: FaPlug, title: 'Deployed on Vercel' },
          { Icon: IoMdSpeedometer, title: 'SEO Optimized' },
          { Icon: SiTypescript, title: 'Sweet DX' },
          { Icon: FaMoon, title: 'Dark mode' },
          { Icon: FaBoxOpen, title: 'Responsive Design' },
          { Icon: FaCode, title: 'Embeddable Studio' },
        ].map(({ Icon, title }, index) => (
          <div key={index} className="flex gap-4 items-center">
            <div className="flex justify-center items-center p-3 bg-light-base dark:bg-dark-base rounded-md border border-light-secondary dark:border-dark-secondary">
              <Icon fontSize="24" />
            </div>
            <div>
              <h4 className="my-2 mx-0 leading-5">{title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureGrid
