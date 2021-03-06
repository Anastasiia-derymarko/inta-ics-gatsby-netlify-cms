import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PreviewCompatibleImage = ({ imageInfo, className, imgStyle }) => {
  const imageStyle = {};
  const { alt = '', childImageSharp, image } = imageInfo;
  if (!!image && !!image.childImageSharp) {
    return (
      <Img style={imageStyle} className={className} fluid={image.childImageSharp.fluid} alt={alt} imgStyle={imgStyle}/>
    )
  }

  if (!!childImageSharp) {
    return <Img style={imageStyle} className={className} fluid={childImageSharp.fluid} alt={alt} />
  }

  if (!!image && typeof image === 'string'){
    return <img style={imageStyle} className={className} src={image} alt={alt} />
  }

  return null
}

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
}

export default PreviewCompatibleImage
