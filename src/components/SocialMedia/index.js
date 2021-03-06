import {graphql, StaticQuery} from "gatsby";
import React from "react";
import SocialMediaTemplate from "./SocialMediaTemplate";

export default ({className}) => (
    <StaticQuery
        query={graphql`
            query socialMediaUa{
                markdownRemark(frontmatter: { pageKey: { eq: "contact" }, locale: { eq: "ua" } }) {
                    frontmatter {
                        contactsList{
                            instagram
                            facebook
                            twitter
                        }
                    }   
                }
            }
        `}
        render={(data) =>
            <SocialMediaTemplate className={className} data={data.markdownRemark.frontmatter.contactsList}/>
        }
    />
)