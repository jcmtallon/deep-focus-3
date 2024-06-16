import React from 'react'

type IconStarProps = React.SVGProps<SVGSVGElement>

function IconStar(props: IconStarProps) {
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
      <path d="M22.9288 9.28964C22.7646 8.80107 22.3417 8.44485 21.8326 8.36698L15.9067 7.46143L13.245 1.791C13.018 1.30767 12.5329 1 12 1C11.4667 1 10.982 1.30767 10.755 1.791L8.09294 7.46178L2.16707 8.36733C1.65791 8.4452 1.23501 8.80107 1.07123 9.28999C0.907444 9.77891 1.03107 10.3174 1.39111 10.6869L5.71861 15.1245L4.69366 21.4026C4.60915 21.9223 4.82951 22.4447 5.25939 22.7486C5.68893 23.0524 6.25606 23.0831 6.71808 22.8282L12.0003 19.9069L17.2826 22.8282C17.4911 22.9434 17.7205 23 17.9489 23C18.2269 23 18.5049 22.9155 18.7413 22.7486C19.1712 22.4451 19.3912 21.9226 19.3067 21.4026L18.2817 15.1245L22.6096 10.6869C22.9689 10.3174 23.0925 9.77891 22.9288 9.28964Z" />
    </svg>
  )
}

export { IconStar }
export type { IconStarProps }
