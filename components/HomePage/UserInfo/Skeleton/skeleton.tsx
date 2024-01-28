import React, { FC } from "react"
import ContentLoader from "react-content-loader"

const Skeleton: FC = () => (
  <ContentLoader 
    speed={2}
    width={911}
    height={207.6}
    viewBox="0 0 911 207.6"
    backgroundColor="#b4b1b1"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="16" rx="16" ry="16" width="911" height="192" />
  </ContentLoader>
)

export default Skeleton