import React, {Fragment} from "react";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import Sections from "../components/delivery/Sections";
import Cargo from "../components/mainPage/cargo";
import Destinations from "../components/Destinations";
import DestinationsRu from "../components/Destinations/index.ru";
import Clients from "../components/Clients";
import Reviews from "../components/Reviews";
import Article from "../components/mainPage/Article";
import FormFooter from '../components/Footer/FormFooter'
import TemplateHeader from "../components/TemplateHeader";
import styled from "styled-components";
import CalculateContainerHeader from "../components/CalculateContainerHeader";
import OurServices from "../components/OurServices";
import OurServicesRu from "../components/OurServices/index.ru";
import Table from '../pages/services/Table';
import TitleDesHelmet from "../components/TitleDesHelmet";

export const Section = styled(Sections)`
    background: #F6F6F6;
    flex-direction: row-reverse;
    &:nth-child(even){
        flex-direction: row-reverse;
        background: #F6F6F6;
    }
    .description h2{
        color: #393939;
    }
    .gatsby-image-wrapper{
        width: 50%;
        @media(max-aspect-ratio: 3/3), (max-height: 500px){    
            width: 100%;
        }
    }
    .custom-list{
        padding-left: 0;
        .row{
            align-items: flex-start;
            padding-bottom: 1.5em;
        }
        img{
            width: 1.5em;
            margin: .5em 1em 0 0;
        }
    }
    ul{
        font-weight: 400;
    }
    
`;

export const ServicesPageTemplate = ({
                                      helmet,
                                      title,
                                      description,
                                      location,
                                      header,
                                      sections,
                                      seoSections,
                                      locale
                                  }) => {
    return(
       <Fragment>
           {helmet || ''}
            <TemplateHeader
                title={title}
                description={description}
                location={location}
                header={{logo: true, arrow: true, ...header}}
                crumbLabel={title}
                crumbLabelParent="Услуги"
            />
            {location &&
                <CalculateContainerHeader locale={locale}/>
            }
            {title === 'Поиск и проверка поставщика' &&
                <Table/>
            }
            <Section
                sections={sections}
            />
           {locale === 'ua' ?
               <Fragment>
                   <OurServices/>
                   <Destinations />
               </Fragment>
               :
               <Fragment>
                   <OurServicesRu/>
                   <DestinationsRu/>
               </Fragment>
           }
            <Cargo/>
            {location &&
                <Clients/>
            }
            <Reviews/>
           {seoSections &&
                <Article seoSections={seoSections}/>
           }
       </Fragment>
    )
};


const ServicesPage = ({ data, location, pageContext }) => {
    const { frontmatter } = data.markdownRemark;

    return(
        <Layout local={pageContext.locale} location={location}>
            <ServicesPageTemplate
                helmet={
                    <TitleDesHelmet
                        title={frontmatter.metaData && frontmatter.metaData.title && frontmatter.title}
                        description={frontmatter.metaData && frontmatter.metaData.description && frontmatter.description}
                    />
                }
                title={frontmatter.title}
                description={frontmatter.description}
                location={location}
                locale={pageContext.locale}
                header={frontmatter.header}
                sections={frontmatter.sections}
                seoSections={frontmatter.seoSections}
            />
            <FormFooter locale={pageContext.locale}/>
        </Layout>
    )
}

export default ServicesPage;

export const pageQuery = graphql`
  query ServicesPageTemplate($id: String!, $locale: String) {
    markdownRemark(id: { eq: $id }, frontmatter: { locale: { eq: $locale } }) {
      frontmatter{
        title
        description
        metaData{
            title
            description
        }
        header{
            images{
              image{
                childImageSharp {
                  fluid(maxWidth: 1100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            scopeInformation{
              image{
                 publicURL
              }
              text
            }
            buttons{
              text
              link
            }
        }
        sections{
            text
            title
            image{
                childImageSharp {
                  fluid(maxWidth: 900) {
                    ...GatsbyImageSharpFluid
                  }
                }
            }
        }
        seoSections{
          title
          sections{
            text
            image{
                childImageSharp {
                  fluid(maxWidth: 500, quality: 100) {
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