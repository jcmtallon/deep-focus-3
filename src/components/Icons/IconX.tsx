import React from 'react'

type IconXProps = React.SVGProps<SVGSVGElement>

function IconX(props: IconXProps) {
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
          d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L12 10.1144L21.7239 0.390524C22.2446 -0.130175 23.0888 -0.130175 23.6095 0.390524C24.1302 0.911223 24.1302 1.75544 23.6095 2.27614L13.8856 12L23.6095 21.7239C24.1302 22.2446 24.1302 23.0888 23.6095 23.6095C23.0888 24.1302 22.2446 24.1302 21.7239 23.6095L12 13.8856L2.27614 23.6095C1.75544 24.1302 0.911223 24.1302 0.390524 23.6095C-0.130175 23.0888 -0.130175 22.2446 0.390524 21.7239L10.1144 12L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
        />
      </g>
    </svg>
  )
}

export { IconX }
export type { IconXProps }
