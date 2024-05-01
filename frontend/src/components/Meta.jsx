import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: "Welcome to MaliGreens",
    description: "Find the best Fruits and Vegetables in your location",
    keywords: "Fruits, Vegetables, Fresh Fruits, Fresh Vegetables"
}

export default Meta