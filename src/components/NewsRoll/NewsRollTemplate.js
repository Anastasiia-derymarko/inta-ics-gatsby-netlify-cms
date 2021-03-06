import React from "react";
import {Link} from "gatsby";
import BlogRoll from "./BlogRoll";
import styled from "styled-components";

const Section = styled.section`
    background: #F8F8F8;
    padding: 2em 0;
    margin: 6em 0 0;
    @media(max-aspect-ratio: 3/3), (max-height: 500px){    
        margin: 3em 0 3em;
    }
    h2{
        text-align: center;
        padding: 1em 0 2em;
        font-weight: 700;
        color: #393939;
    }
    article{
        width: 100%;
    }
    .btn{
        background: #005BE4;
        font-weight: 700;
        padding: 1em 2.5em;
        border-radius: 2em;
        margin: 6em auto 2em;
        font-size: .9em;
        &:hover{
            background: #1d63cd;
        }
        @media(max-aspect-ratio: 3/3), (max-height: 500px){    
            margin: 2em auto 0;
        }
    }
`;

const NewsRollTemplate = ({data}) => {
    return (
        <Section className="column">
            <h2>{data.news.title}</h2>
            <BlogRoll />
            <Link className="btn" to={`${data.locale === 'ua' ? '' : '/ru/'}blog/`}>
                {data.news.btn}
            </Link>
        </Section>
    )
};

export default NewsRollTemplate