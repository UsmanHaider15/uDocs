import { FaArrowRightLong } from 'react-icons/fa6'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { toPlainText } from '@portabletext/react'
import Link from 'next/link'

const IntroSection = ({ title, body, lang }) => {
  return (
    <div className="text-center mb-40">
      <div className="text-6xl font-extrabold leading-tight">{title}</div>
      <div className="mx-auto text-lg font-medium leading-relaxed max-w-2xl text-gray-600 dark:text-gray-400 mt-10 mb-14">
        {toPlainText(body)}
      </div>
      <div className="flex justify-center space-x-4">
        <div className="text-center">
          <button
            type="button"
            className="inline-flex justify-center items-center px-5 py-3 border-2 font-medium text-sm text-light-base hover:text-light-primary dark:text-dark-base dark:hover:text-dark-primary bg-light-primary border-light-primary hover:bg-light-secondary focus:outline-none focus:ring-4 focus:ring-light-primary rounded-lg mb-2 dark:bg-dark-primary dark:border-dark-primary dark:hover:bg-dark-secondary dark:focus:ring-dark-primary"
          >
            <Link
              href={`/${lang}/docs/v1/introduction`}
              className="flex justify-center items-center"
            >
              Documentation <FaArrowRightLong className="ml-2" />
            </Link>
          </button>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="inline-flex justify-center items-center px-5 py-3 font-medium text-sm bg-light-secondary dark:bg-dark-secondary border border-light-text dark:border-dark-text focus:outlin rounded-lg mb-2"
          >
            <Link
              href={`https://calendly.com/usman-haider-developer/working-hours`}
              className="flex justify-center items-center"
            >
              Contact Me
              <FaArrowUpRightFromSquare className="ml-2" />
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default IntroSection
