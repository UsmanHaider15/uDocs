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
    <div className="font-sans font-medium text-neutral-900">
      <div className="grid md:grid-cols-4 gap-4 justify-center font-medium">
        <div className="flex gap-4 items-center text-neutral-900">
          <div className="flex justify-center items-center p-3 bg-gray-50 rounded-md border border-gray-200 border-solid bg-opacity-[0.2]">
            <MdWorkspaces fontSize="24" />
          </div>
          <div>
            <h4 className="my-2 mx-0 leading-5">
              Incremental Static Regeneration (ISR)
            </h4>
          </div>
        </div>
        <div className="flex gap-4 items-center text-neutral-900">
          <div className="flex justify-center items-center p-3 bg-gray-50 rounded-md border border-gray-200 border-solid bg-opacity-[0.2]">
            <FaRocket fontSize="24" />
          </div>
          <div>
            <h4 className="my-2 mx-0 leading-5">
              Real-time editing and previews
            </h4>
          </div>
        </div>
        <div className="flex gap-4 items-center text-neutral-900">
          <div className="flex justify-center items-center p-3 bg-gray-50 rounded-md border border-gray-200 border-solid bg-opacity-[0.2]">
            <FaPlug fontSize="24" />
          </div>
          <div>
            <h4 className="my-2 mx-0 leading-5">Deployed on Vercel</h4>
          </div>
        </div>
        <div className="flex gap-4 items-center text-neutral-900">
          <div className="flex justify-center items-center p-3 bg-gray-50 rounded-md border border-gray-200 border-solid bg-opacity-[0.2]">
            <IoMdSpeedometer fontSize="24" />
          </div>
          <div>
            <h4 className="my-2 mx-0 leading-5">SEO Optimized</h4>
          </div>
        </div>
        <div className="flex gap-4 items-center text-neutral-900">
          <div className="flex justify-center items-center p-3 bg-gray-50 rounded-md border border-gray-200 border-solid bg-opacity-[0.2]">
            <SiTypescript fontSize="24" />
          </div>
          <div>
            <h4 className="my-2 mx-0 leading-5">Sweet DX</h4>
          </div>
        </div>

        <div className="flex gap-4 items-center text-neutral-900">
          <div className="flex justify-center items-center p-3 bg-gray-50 rounded-md border border-gray-200 border-solid bg-opacity-[0.2]">
            <FaMoon fontSize="24" />
          </div>
          <div>
            <h4 className="my-2 mx-0 leading-5">Dark mode</h4>
          </div>
        </div>
        <div className="flex gap-4 items-center text-neutral-900">
          <div className="flex justify-center items-center p-3 bg-gray-50 rounded-md border border-gray-200 border-solid bg-opacity-[0.2]">
            <FaBoxOpen fontSize="24" />
          </div>
          <div>
            <h4 className="my-2 mx-0 leading-5">Responsive Design</h4>
          </div>
        </div>

        <div className="flex gap-4 items-center text-neutral-900">
          <div className="flex justify-center items-center p-3 bg-gray-50 rounded-md border border-gray-200 border-solid bg-opacity-[0.2]">
            <FaCode fontSize="24" />
          </div>
          <div>
            <h4 className="my-2 mx-0 leading-5">Embeddable Studio</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureGrid
