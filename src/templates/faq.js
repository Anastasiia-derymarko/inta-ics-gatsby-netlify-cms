import React, {Fragment, useState} from 'react'
import { graphql } from 'gatsby'
import styled from "styled-components";
import Layout from '../components/Layout'
import TemplateHeader from "../components/TemplateHeader";
import News from "../components/mainPage/news";
import FormFooter from "../components/Footer/FormFooter";
import Arrow from "../img/arrow2.svg"

const Container = styled.div`
    margin: 0 0 3% 0;
    font-size: .55em;
    background: #F0F5FD;
    border-radius: .5em;
    padding: 1em 2.5em 0;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    line-height: 1.7em;
    overflow: hidden;
    transition: all .5s; 
    transition-timing-function: ease;
    @media(max-aspect-ratio: 3/3), (max-height: 500px){
        margin: 0;
        border-radius: 0;
        border-bottom: 1px solid #ccc9c9;
    }
    &:hover{
        h3{
            color: #005BE4;
            svg path{
                stroke: #005BE4;
            }
        }
    }
    h3{
        font-weight: 500;
        color: ${props => props.isOpen ? '#005BE4' : '#40444B'};
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1em;
        &:before{
            content: "";  
            min-width: .4em;
            min-height: .4em;
            border-radius: 50%;
            position: absolute;
            background: #005BE4; 
            font-weight: bold; 
            display: block;  
            left: 1em; 
        }
        svg{
            margin-left: 1em;
                min-width: 1em;
            path{
                stroke: #000;
            }
        }
    }
    
`;

const Wrapper = styled.div`
    max-width: 49%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media(max-aspect-ratio: 3/3), (max-height: 500px){
        max-width: 100%;
    }
`;
const Section = styled.div`
    justify-content: space-between; 
    margin-top: -7em;
    font-size: 1.5em;
    flex-wrap: wrap;
    background: #fff;
    align-items: flex-start;
    padding: 3em 1.5em;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.18);
    border-radius: .5em;
    @media(max-aspect-ratio: 3/3), (max-height: 500px){
        margin-top: 0;
        padding: 0;
        box-shadow: none;
    }
`;

const Text = styled.p`
    color: #717883;
    margin-bottom: ${props => props.isOpen && '1.5em'};
    max-height: ${props => props.isOpen ? '100em' : 0};
    transition: all .5s; 
    transition-timing-function: ease;
`;

const Question = ({title, text}) =>{
    const [isOpen, setIsOpen] = useState(false);

    return(
        <Container
            onClick={() => setIsOpen(!isOpen)}
        >
            <h3
                isOpen={isOpen}>
                {title}
                <Arrow/>
            </h3>
            <Text isOpen={isOpen}>{text}</Text>
        </Container>)
}

export const FaqPageTemplate = ({
                                        title,
                                        description,
                                        header,
                                        location,
                                        questions
                                    }) =>
    <Fragment>
        <TemplateHeader
            title={title}
            description={description}
            header={header}
            location={location}
            crumbLabel="FAQ"
        />
        <Section className="row-to-column wrapper">
            <Wrapper>
                {questions.slice(0,Math.ceil(questions.length / 2)).map((question, index) =>
                    <Question
                        key={index}
                        title={question.title}
                        text={question.text}
                    />
                )}
            </Wrapper>
            <Wrapper>
                {questions.slice(Math.ceil(questions.length / 2), questions.length).map((question, index) =>
                    <Question
                        key={index}
                        title={question.title}
                        text={question.text}/>
                )}
            </Wrapper>
        </Section>
        <News/>
        <FormFooter/>
    </Fragment>
;

const Faq = ({ data, location }) => {
    const { frontmatter } = data.markdownRemark;
    return (
        <Layout>
            <FaqPageTemplate
                title={frontmatter.title}
                description={frontmatter.description}
                header={frontmatter.header}
                location={location}
                questions={frontmatter.questions}
            />
        </Layout>
    )
}

export default Faq

export const pageQuery = graphql`
  query FaqPage {
    markdownRemark(frontmatter: { templateKey: { eq: "faq" } }) {      
        frontmatter {
            title
            description
            header{
                images{
                    image{
                        childImageSharp {
                          fluid(maxWidth: 300, quality: 100) {
                            ...GatsbyImageSharpFluid
                          }
                        }
                    }
                }
            }
            questions{
              title
              text
            }
        }
    }
  }
`
