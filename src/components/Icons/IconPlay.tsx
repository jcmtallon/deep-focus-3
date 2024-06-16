import React from 'react'

type IconPlayProps = React.SVGProps<SVGSVGElement>

function IconPlay(props: IconPlayProps) {
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
        <path d="M12 24C18.5529 24 24 18.5647 24 12C24 5.44707 18.5411 0 11.9882 0C5.42347 0 0 5.44707 0 12C0 18.5647 5.43527 24 12 24ZM12 22C6.44702 22 2.0117 17.5529 2.0117 12C2.0117 6.45882 6.43527 2.00001 11.9882 2.00001C17.5293 2.00001 21.9881 6.45882 22 12C22.0118 17.5529 17.5411 22 12 22ZM9.92937 16.3294L16.2235 12.6118C16.6823 12.3294 16.6705 11.6824 16.2235 11.4236L9.92937 7.68234C9.44703 7.39999 8.8117 7.62351 8.8117 8.15293V15.8588C8.8117 16.4 9.4117 16.6353 9.92937 16.3294Z" />
      </g>
    </svg>
  )
}

export { IconPlay }
export type { IconPlayProps }
