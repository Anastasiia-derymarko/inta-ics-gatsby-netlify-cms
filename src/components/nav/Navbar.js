import React, {useState, useEffect} from 'react'
import { Link } from 'gatsby'
import Tel from '../../img/tel.svg'
import Email from '../../img/email.svg'
import Local from '../../img/local.svg'
import Navigation from './styled'
import Search from './Search'
import Login from './Login'
import Language from './Language'
import Delivery from './delivery'
import Telegram from '../../img/social/telegram.svg'
import Call from '../../img/call.svg'

const Navbar = () => {
    const [isActiveMob, setActiveMob] = useState(false);

    const SetActiveMob = () => {
        setActiveMob(!isActiveMob);
    };

    useEffect(() => {
        document.documentElement.style.overflowY = isActiveMob ? 'hidden' : 'unset';

    }, [isActiveMob ]);

    return (
      <Navigation
        role="navigation"
        aria-label="main-navigation"
        className="row"
        isActive={isActiveMob}
      >
        {/* Hamburger menu */}
        <div
            onClick={() => {setActiveMob(!isActiveMob)}}
            className="navigation__lines">
          <hr/>
          <hr/>
          <hr/>
        </div>
        <div className="navigation__contact row-to-column">
          <a href="">
              <Tel className="icon" alt="contacts" />
              +38 (068) 5555 999
          </a>
          <a href="">
              <Email className="icon" alt="contacts" />
              info@inta-ics.com
          </a>
          <a href="" >
              <Local className="icon" alt="contacts" />
              Украина, Киев, ул. Линейная 17
          </a>
        </div>
        <Link
            to="/"
            className="logo"
            title="Logo">
          <img
              src="/img/logo.png"
              alt="inta ics"
              />
        </Link>
          <div className="row-to-column navigation__list">
              <Delivery
                  setActiveMob={SetActiveMob}
                  isActiveMob={isActiveMob}
              />
              <Link
                  onClick={() => setActiveMob(!isActiveMob)}
                  to="/about">
                  Услуги

              </Link>
              <Link
                  onClick={() => setActiveMob(!isActiveMob)}
                  to="/about">
                  О компании
              </Link>
              <Link
                  onClick={() => setActiveMob(!isActiveMob)}
                  to="/blog/">
                  Блог
              </Link>
              <Link
                  onClick={() => setActiveMob(!isActiveMob)}
                  to="/contact/examples">
                  Помощь
              </Link>
              <Link
                  onClick={() => setActiveMob(!isActiveMob)}
                  to="/contact/examples">
                  Акции
              </Link>
              <Link
                  onClick={() => setActiveMob(!isActiveMob)}
                  to="/cost-page">
                  Стоимость
              </Link>
              <Link
                  onClick={() => setActiveMob(!isActiveMob)}
                  to="/contact/examples">
                  Контакты
              </Link>


        </div>
        <Search isActive={isActiveMob}/>
        <div className="row container" onClick={() => setActiveMob(!isActiveMob)}>
            <Link to="/" className="row circle">
                <Telegram />
            </Link>
            <Link to="/" className="row circle call">
                <Call />
            </Link>
            <Login />
            <Language />
        </div>
      </Navigation>
    )
};

export default Navbar
