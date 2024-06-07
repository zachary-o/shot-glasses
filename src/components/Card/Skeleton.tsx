import ContentLoader from "react-content-loader"

const Skeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={243}
      height={289}
      viewBox="0 0 243 289"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="30" y="20" rx="10" ry="10" width="183" height="183" />
      <rect x="30" y="215" rx="5" ry="5" width="130" height="24" />
      <rect x="30" y="249" rx="5" ry="5" width="170" height="24" />
    </ContentLoader>
  )
}

export default Skeleton
