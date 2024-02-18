import { FC } from 'react'
import ContentLoader from 'react-content-loader'

const WallLoader: FC = () => {

    return (

        <ContentLoader 
        speed={2}
        width={550}
        height={181.45}
        viewBox="0 0 550 181.45"
        backgroundColor="#e5e0e0"
        foregroundColor="#d2cbcb"
      >
        <rect x="0" y="24" rx="10" ry="10" width="550" height="155" />
      </ContentLoader>
    )
}

export default WallLoader