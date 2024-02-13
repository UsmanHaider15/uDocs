'use client'

function ButtonComponent({ text, href, style }) {
  return (
    <button
      type="button"
      className={`py-2 px-4 font-semibold rounded-lg shadow-md transition-colors duration-300 ease-in-out ${style}`}
      onClick={() => window.open(href, '_blank')}
    >
      {text}
    </button>
  )
}

export default ButtonComponent
