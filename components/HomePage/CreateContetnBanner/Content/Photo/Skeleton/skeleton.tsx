import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={508}
    height={224.45}
    viewBox="0 0 508 224.45"
    backgroundColor="#e8e8e8"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="508" height="224" />
  </ContentLoader>
)

export default Skeleton