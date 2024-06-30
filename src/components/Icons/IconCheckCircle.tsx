import React from 'react'

type IconCheckCircleProps = React.SVGProps<SVGSVGElement>

function IconCheckCircle(props: IconCheckCircleProps) {
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
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.47716 2 2 6.47716 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2ZM0 12C0 5.37259 5.37259 0 12 0C18.6275 0 24 5.37259 24 12C24 18.6275 18.6275 24 12 24C5.37259 24 0 18.6275 0 12Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.3738 8.84845C16.7643 9.23897 16.7643 9.87214 16.3738 10.2627L11.8726 14.7639C11.2679 15.3685 10.2876 15.3685 9.68298 14.7639L7.62623 12.7071C7.2357 12.3166 7.2357 11.6834 7.62623 11.2929C8.01675 10.9024 8.64992 10.9024 9.04044 11.2929L10.7778 13.0302L14.9596 8.84845C15.3501 8.45792 15.9832 8.45792 16.3738 8.84845Z"
        />
      </g>
    </svg>
  )
}

export { IconCheckCircle }
export type { IconCheckCircleProps }
