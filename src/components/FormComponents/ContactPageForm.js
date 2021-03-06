import React, {Fragment, useState} from 'react'
import styled from 'styled-components'
import Phone from "./Phone";
import PopupThanks from "../Popups/PopupThanks";
import PopupThanksRu from "../Popups/PopupThanks/index.ru";
import HandleSubmit from "./HandleSubmit";

const Button = styled.button`
    align-items: center;
    background: rgba(255, 255, 255, 0.09);
    border: none;
    font-weight: 700;
    padding: 1em 2.5em;
    border-radius: 5em;
    font-size: .8em;
    color: #fff;
    flex: 1;
    background: linear-gradient(100.69deg, #005BE4 0%, #4900E4 100%);
    cursor: pointer;
    @media(max-aspect-ratio: 3/3), (max-height: 500px){
        margin: 0 0 2em 0;
    }
`
const From = styled.form`
  margin-top: 2em;
  input{
    background: #212121;
    border-radius: .5em;
    color: #fff;
    font-weight: 500;
    padding: 1em 1em 1em 2em;
    border: none;
    font-size: .8em;
    margin-right: 1.5em;
    flex: 2;
    @media(max-aspect-ratio: 3/3), (max-height: 500px){
        min-width: 10em;
        margin: 0 0 2em 0;
    }
  }
`;

const ContactPageForm = ({locale, form}) => {
  const [inputsValue, setInputsValue] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);

  const handleChange = e => {
    setInputsValue({ ...inputsValue, [e.target.name]: e.target.value })
  };

  return (
      <Fragment>
        {popupOpen &&
            <Fragment>
              {locale === 'ua' ?
                  <PopupThanks close={setPopupOpen}/>
                  :
                  <PopupThanksRu close={setPopupOpen}/>
              }
            </Fragment>
        }
        <From
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={(e) => HandleSubmit({
            event: e,
            body: inputsValue,
            name: "страница контактов",
            setPopupOpen: setPopupOpen})}
          className="row-to-column"
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <div hidden>
            <label>
              Don’t fill this out:{' '}
              <input name="bot-field" onChange={(e) => handleChange(e)} />
            </label>
          </div>
          <input
            className="input"
            type={'text'}
            name={'name'}
            onChange={(e) => handleChange(e)}
            id={'name'}
            required={true}
            placeholder={form.name}
          />
          <Phone
            className="input"
            name={'phone'}
            onChange={(e) => handleChange(e)}
            required={true}
            placeholder={form.phone}
          />
          <Button type="submit">
            {form.btn}
          </Button>
        </From>
      </Fragment>
  )
}
export default ContactPageForm