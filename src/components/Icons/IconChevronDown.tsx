import React from 'react'

type IconChevronDownProps = React.SVGProps<SVGSVGElement>

function IconChevronDown(props: IconChevronDownProps) {
  return (
    <svg
      fill="currentColor"
      strokeWidth="0"
      baseProfile="tiny"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      aria-hidden
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.51256 8.54643C6.19598 7.81786 7.30402 7.81786 7.98744 8.54643L12 12.8241L16.0126 8.54643C16.696 7.81786 17.804 7.81786 18.4874 8.54643C19.1709 9.275 19.1709 10.4562 18.4874 11.1848L13.763 16.2214C12.7892 17.2595 11.2108 17.2595 10.237 16.2214L5.51256 11.1848C4.82915 10.4562 4.82915 9.275 5.51256 8.54643Z"
      />
    </svg>
  )
}

export { IconChevronDown }
export type { IconChevronDownProps }
