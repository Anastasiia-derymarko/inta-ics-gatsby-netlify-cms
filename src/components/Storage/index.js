import React from "react";
import {graphql, StaticQuery} from "gatsby";
import StorageTemplate from "./StorageTemplate";

export default ({morePhotoIcon}) => (
    <StaticQuery
        query={graphql`
            query StorageQuery{
                markdownRemark(frontmatter: { pageKey: { eq: "components-common" }, locale:{ eq: "ua" } }) {
                    frontmatter {
                        storageTitle
                        storage{
                            country
                            city
                            flag {
                                publicURL
                            }
                            postIndex
                            address
                            phone
                            image{
                                childImageSharp {
                                  fluid(maxWidth: 200, quality: 70) {
                                    ...GatsbyImageSharpFluid
                                  }
                                }
                            }
                            images{
                                image{
                                    childImageSharp {
                                      fluid(maxWidth: 800, quality: 70) {
                                        ...GatsbyImageSharpFluid
                                      }
                                    }
                                }
                            }
                        }
                    }
                }
            }
    `}
        render={(data) => <StorageTemplate morePhotoIcon={morePhotoIcon} storageTitle={data.markdownRemark.frontmatter.storageTitle} storage={data.markdownRemark.frontmatter.storage} />}
    />
)
