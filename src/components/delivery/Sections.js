import About from "../mainPage/about"
import React, { Fragment } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import {localizedPath} from "../../data/localizedPath";
import PreviewCompatibleImage from "../PreviewCompatibleImage";

const Section = styled(About)`
    margin: 0;
    align-items: center;
    flex-direction: ${ props => props.flexDirection ? props.flexDirection : "row"};
    justify-content: space-between;
    background: #fff; 
    &:nth-of-type(even){
        background: #F0F5FD; 
        flex-direction: row;
        @media(max-aspect-ratio: 3/3), (max-height: 500px){    
            flex-direction: column-reverse;
        }
    }
    @media(max-aspect-ratio: 3/3), (max-height: 500px){    
        flex-direction: column-reverse;
        padding: 0;
    }   
    .description{
        width: 50%;
        flex: none;
        @media(max-aspect-ratio: 3/3), (max-height: 500px){    
            width: 100%;
            padding:1em;
            display: flex;
            flex-direction: column;
        }
    } 
    .gatsby-image-wrapper{
        flex: none;
        width: 48%;
        @media(max-aspect-ratio: 3/3), (max-height: 500px){    
            width: 100%;
        }
    }
    .text{
        font-size: 1em;
        li{
            color: #3F3F3F;
        }
    }
    .list{
        padding: 2em 1em 4em 0;
        justify-content: flex-start;
        flex-wrap: wrap;
        @media(max-aspect-ratio: 3/3), (max-height: 500px){    
            padding: 0;
            margin: 0em 0 2em;
        }
        li{
            align-items: center;
            color: #7C8696;
            font-weight: 400;
            font-size: .95em;
            margin-right: 1em;
            @media(max-aspect-ratio: 3/3), (max-height: 500px){    
                margin-bottom: .5em;
            }
            .gatsby-image-wrapper{
                width: 1.5em;
                margin-right: .5em;
                height: 1.5em;
            }
        }
    }
    .btn{
        padding: .8em 2em;
        border-radius: 7em;
        font-weight: 700;
        background: linear-gradient(101.61deg, #005BE4 0.64%, #4900E4 100%);
        @media(max-aspect-ratio: 3/3), (max-height: 500px){    
            margin: 0 auto 1em;
        }
    }
`;

const Sections = ({ sections, locale, className, flexDirection }) => (
    <Fragment>
        {sections && sections.length > 0 && sections.map((section, index) =>
            <Section
                key={index}
                className={className}
                title={section.title}
                image={section.image}
                alt={section.alt}
                text={section.text}
                flexDirection={flexDirection}
                children={
                    section.list && section.list.length > 0 &&
                    <Fragment>
                        <ul className="row list">
                            {section.list.map((li,index) => (
                                <li className="row" key={index}>
                                    <PreviewCompatibleImage
                                        imageInfo={{
                                            image: li.image,
                                            alt: li.alt
                                        }}
                                        imgStyle={{ objectFit: 'contain' }}
                                    />
                                    {li.title}
                                </li>
                            ))}
                        </ul>
                        <Link className="btn" to={section.button ? localizedPath({path: section.button.link, lang: locale}) : '/'}>
                            {section.button ? section.button.text : 'Узнать больше'}
                        </Link>
                    </Fragment>
                }
            />
        )}
    </Fragment>
);

export default Sections;