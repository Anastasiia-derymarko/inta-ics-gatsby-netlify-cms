import Tel from "../../img/tel.svg";
import Email from "../../img/email.svg";
import Local from "../../img/local.svg";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    svg{
        font-size: .8em;
        margin-right: 1em;
        path{
            fill: #7A7A7A;
            @media(max-aspect-ratio: 3/3), (max-height: 500px){
                fill: #E0E0E0;
            }
        }
    }
    a{
        display: flex;
        align-items: center;
        margin-right: 2em;
        color: #E0E0E0;
        @media(max-aspect-ratio: 3/3), (max-height: 500px){
            font-size: .8em;
            margin-bottom: .5em;
        }
    }
`

const BarContactsTemplate = ({data}) =>
    <Wrapper className='bar-contacts row-to-column'>
        <a href="tel:+380685555999">
            <Tel className="icon"/>
            {data.phone}
        </a>
        <a href="mailto:info@inta-ics.com">
            <Email className="icon" />
            {data.email}
        </a>
        <a href="https://goo.gl/maps/PUnnVxgtAhrCJxtX8" >
            <Local className="icon" />
            {data.local}
        </a>
    </Wrapper>

export default BarContactsTemplate