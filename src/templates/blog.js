import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from "styled-components";
import Layout from '../components/Layout'
import TemplateHeader from "../components/TemplateHeader";
import TagsRoll from "../components/TagsRoll";
import TagsRollRu from "../components/TagsRoll/index.ru";
import Post from "../components/Post";
import FormFooter from '../components/Footer/FormFooter'
import FormFooterRu from '../components/Footer/FormFooter/index.ru'
import TitleDesHelmet from "../components/TitleDesHelmet";
import { Link } from "gatsby";
import {localizedPath} from "../data/localizedPath";
const _ = require('lodash');


const Header = styled(TemplateHeader)`
    max-height: 100vh;
    @media(max-aspect-ratio: 3/3), (max-height: 500px){
        max-height: none;
    }
    h1{
        font-weight: 200;
    }
    .bckg-parallax-container{
        width: 55%;
        margin-right: -10%;
        margin-top: -1.6em;
         @media(max-aspect-ratio: 3/3), (max-height: 500px){
            width: 100%;
            margin: 0;
         }
    }
`;
const Blog = styled.div`
    flex-wrap: wrap;
    background: transparent;
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 86%;
    margin: -10% auto 5em;
    @media(max-aspect-ratio: 3/3), (max-height: 500px){
        width: 100%;
        margin: 0;
    }
    article{
        display: flex;
        width: 48%;
        background: #fff;
        margin: 0 0 2% 2%;
        border-radius: .5em;
        overflow: hidden;
        box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
        padding: 0;
        @media(max-aspect-ratio: 3/3), (max-height: 500px){
            margin: 0 0 1em 0;
            border-radius: 0;
            flex-direction: column;
        }
        @media(max-width: 500px){
            width: 100%;
        }
        header{
            height: auto;
            flex: 2;
            border-radius: 0 0 .5em;
        }
        .body{
            flex: 3;
            padding: 2em 1em 1em 2em;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            @media(max-aspect-ratio: 3/3), (max-height: 500px){
                padding: 1em;
            }
        }
        h3{
            padding-top: 0;
            width: 70%;
        }
        footer{
            margin-top: 2em;
            @media(max-aspect-ratio: 3/3), (max-height: 500px){
                margin-top: 1em;
            }
        }
        .time{
            position: absolute;
            right: 2em;
            top: 2em;
            svg path{
                fill:#A3A3A3;
            }
            @media(max-aspect-ratio: 3/3), (max-height: 500px){
                position: static;
            }
        }
        .more{
            color: #005BE4;
            svg path{
                fill: #005BE4;
            }
        }
        &:nth-child(odd){
            margin-left: 0;
        }
    }
`;
const Pagination = styled.div`
    margin: 2em auto;
    ul{
        display: flex;
        justify-content: center;
    } 
    a{
        padding: 0 .25em;
        color: #C9C9C9;
        font-size: 1.2em;
        font-weight: 500;
    }
    a[aria-current="page"]{
        color: #045DD2;
    }
`;

export const BlogIndexPageTemplate = ({
                                          helmet,
                                          title,
                                          description,
                                          header,
                                          location,
                                          posts,
                                          pageContext,
                                          }) => {
    const { tag, numPages, locale } = pageContext;
    const tagPath = "blog/"+_.kebabCase(tag) + "/";

    return(
        <Fragment>
            {helmet || ''}
            <Header
                title={title}
                description={description}
                header={header}
                location={location}
                locale={locale}
                crumbLabel="Блог"
                childrenInColumn={
                    locale === "ua" ?
                    <TagsRoll tag={tag}/> :
                        <TagsRollRu tag={tag}/>
                    }
            />
            {posts.length > 0 &&
                <Fragment>
                    <Blog>
                        {posts.map(({node: post}, index) => (
                            <Post
                                locale={locale}
                                key={index}
                                post={post}
                            />
                        ))}
                    </Blog>
                    {numPages > 1 &&
                        <Pagination>
                            <ul>
                                {Array.from({length: numPages}, (a, i) => (
                                    <li key={`pagination-number${i + 1}`}>
                                        <Link to={localizedPath({path: `${i === 0 ? tagPath : tagPath+(i + 1)}`, lang: locale })}>
                                            {i + 1}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Pagination>
                    }
                </Fragment>
            }
        </Fragment>
    )
}

const BlogIndexPage = ({ data, location, pageContext }) => {
    const { frontmatter } = data.markdownRemark;
    const { edges: posts } = data.allMarkdownRemark;

    return (
        <Layout local={pageContext.locale} location={{location, localePath:pageContext.localePath}}>
            <BlogIndexPageTemplate
                helmet={
                    <TitleDesHelmet
                        title={frontmatter.metaData ? frontmatter.metaData.title : frontmatter.title}
                        description={frontmatter.metaData ? frontmatter.metaData.description : frontmatter.description}
                    />
                }
                title={frontmatter.title}
                description={frontmatter.description}
                header={frontmatter.header}
                location={location}
                pageContext={pageContext}
                posts={posts}
            />
            {pageContext.locale === 'ua' ?
                <FormFooter />
                :
                <FormFooterRu />
            }
        </Layout>
    )
}

BlogIndexPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
    location: PropTypes.object
}

export default BlogIndexPage

export const pageQuery = graphql`
  query BlogPage($locale: String, $tag: String, $skip: Int, $limit: Int) {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]},
      limit: $limit
      skip: $skip 
      filter: {
          frontmatter: {
            templateKey: {eq: "blog-post"},
            locale: { eq: $locale },
            tags: { eq: $tag }
          }
      }
    ){
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            metaData{
                title
                description
            }
            date(formatString: "DD.MM.YYYY")
            tags
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    markdownRemark(frontmatter: { 
        templateKey: { eq: "blog" }, 
        locale: { eq: $locale } 
        }) {
      id
      frontmatter {
        title
        description
        header{
            images{
              alt
              image{
                childImageSharp {
                  fluid(maxWidth: 300, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
        }
      }
    }
  }
`;
