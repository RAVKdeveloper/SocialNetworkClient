import { FC } from "react"
import ContentLoader from "react-content-loader"

const SkeletonClips: FC = () => (
  <ContentLoader 
    speed={2}
    width={508}
    height={305.45}
    viewBox="0 0 508 305.45"
    backgroundColor="#e8e8e8"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="508" height="305" />
  </ContentLoader>
)

export default SkeletonClips