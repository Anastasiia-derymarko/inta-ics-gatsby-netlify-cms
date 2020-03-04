import {graphql, StaticQuery} from "gatsby";
import React from "react";
import SubMenu from './SubMenu'

export default ({setActiveMob, isActiveMob}) => (
    <StaticQuery
        query={graphql`
            query navDelivery{
                 allMarkdownRemark(filter: {fields: {slug: {regex: "/\\/delivery\\//"}}}) {
                    nodes {
                        frontmatter {
                            crumbLabel
                        }
                        fields {
                             slug
                        }
                     }
                 }
            }
    `}
        render={(data) =>
            <SubMenu
                parentName="Доставка"
                list={data.allMarkdownRemark.nodes}
                startPath="/delivery/"
                setActiveMob={() => setActiveMob}
                isActiveMob={isActiveMob}
            />
        }
    />
)
