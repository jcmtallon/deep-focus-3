import React from 'react'

interface IconQuestionProps extends React.SVGProps<SVGSVGElement> {
  title?: string
}

function IconQuestion(props: IconQuestionProps) {
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
      {props.title && <title>{props.title}</title>}
      <g clipPath="url(#clip0_78_149)">
        <path d="M12.963 11.986C13.7752 11.3884 14.5 10.855 14.5 9.8C14.5 8.48 13.375 7.4 12 7.4C10.625 7.4 9.5 8.48 9.5 9.8H7C7 7.148 9.2375 5 12 5C14.7625 5 17 7.148 17 9.8C17 11.3395 16.0125 12.168 15.051 12.9746C14.1388 13.7399 13.25 14.4856 13.25 15.8H10.75C10.75 13.6145 11.9276 12.7479 12.963 11.986Z" />
        <path d="M13.25 17.6V20H10.75V17.6H13.25Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM21.6 12C21.6 17.302 17.302 21.6 12 21.6C6.69806 21.6 2.4 17.302 2.4 12C2.4 6.69806 6.69806 2.4 12 2.4C17.302 2.4 21.6 6.69806 21.6 12Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_78_149">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </svg>
  )
}

export { IconQuestion }
export type { IconQuestionProps }
