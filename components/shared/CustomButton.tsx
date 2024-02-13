'use client'

function ButtonComponent({ text, href, style }) {
  return (
    <button
      type="button"
      className={style}
      onClick={() => window.open(href, '_blank')}
    >
      {text}
    </button>
  )
}

export default ButtonComponent
