/* eslint-disable jsx-a11y/img-redundant-alt */

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import ArticleContainer from './Article';
import Page from '../../page';

import logo2 from '../../assets/Home.jpg';
import logo3 from '../../assets/connecte.jpg';

import './style.scss';

function Home() {
  const isLogged = useSelector((state) => state.user.logged);
  const pseudo = useSelector((state) => state.user.firstname);

  return (
    <div className="home">
      <div className="home-main">
        { isLogged && (
          <Page>
            <p className="home-message">
              {`Hello ${pseudo} !`}
              <span className="home-message-program">"Chaque petits pas mène à un grand changement"</span>
              <img src={logo3} alt="picture-welcome" className="home-message-picture" />
            </p>
          </Page>
        )}
        { !isLogged && (
          <Page>

            <div className="home-header">
              <h1 className="home-title-big">
                Un esprit sain, dans un corps sain !
                <span className="home-title-small">
                  Pour travailler sainement.
                </span>
              </h1>
              <img src={logo2} alt="home-image" className="home-logo" />
              <p className="home-description">
                L'application FitWork te suit au bureau !
              </p>
              <p className="home-description2">
                Une application de conseils, d'exercices
                physiques et relaxant, pour maintenir ton bien-être au travail.
              </p>
              <p className="home-description2">Découvre tous nos conseils bien-être en consultant les articles mis à disposition par nos coachs!</p>
              <ArticleContainer />

              <Button as={Link} to="/inscription" className="home-btn" variant="primary" size="lg">
                Je m'inscris !
              </Button>
            </div>
          </Page>

        )}
      </div>

    </div>
  );
}

export default Home;
