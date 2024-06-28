import ContentLoader from "react-content-loader"

const FilterSkeleton = () => (
  <ContentLoader
    speed={2}
    width={150}
    height={300}
    viewBox="0 0 150 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{ marginTop: "30px" }}
  >
    <rect x="0" y="0" rx="5" ry="5" width="150" height="0" />
    <rect x="21" y="312" rx="5" ry="5" width="130" height="30" />
    <rect x="0" y="0" rx="10" ry="10" width="150" height="27" />
    <rect x="0" y="40" rx="10" ry="10" width="150" height="109" />
    <rect x="0" y="172" rx="10" ry="10" width="150" height="27" />
    <rect x="0" y="209" rx="10" ry="10" width="150" height="49" />
  </ContentLoader>
)

export default FilterSkeleton
