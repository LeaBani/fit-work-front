// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Field from './Field';

import { login, logout } from '../../actions/user';

import './style.scss';

// Création du formulaire de connexion avec les props email et password
function LoginForm({
  email,
  password,
}) {
  const navigate = useNavigate();

  // gestion de la connection, des différents états
  const isLogged = useSelector((state) => state.user.logged);
  const isLoading = useSelector((state) => state.user.loading);

  // Utilisation des states pour la modale
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    // 1. gestion du comportement par défaut de la page
    evt.preventDefault();

    // 2. On souscrit l'évênement à l'Action "login"
    dispatch(login());

    // 3. fermeture de la modale après l'envoi du formulaire
    handleClose();

    // 4. on redirige vers l'accueil après le "login"
    const path = '/';
    navigate(path);
  };

  const handleLogOut = () => {
    dispatch(logout());
    const path = '/';
    navigate(path);
  };

  return (
  // Création du form et des champs du formulaire pour la connnexion de l'utilisateur
  // Soumission du form avec un bouton
    <div className="login">
      <div className="login-form">

        {/* Chargement en cours */}
        {isLoading && (
        <p>Chargement...</p>
        )}

        {/* Chargement terminé, vérification de l'authentification */}
        {!isLoading && (
        <>
          {/* Utilisateur est connecté */}
          {isLogged && (
            <div className="login-form-logged">
              <Button
                className="login-button"
                onClick={handleLogOut}
                variant="outline-dark"
                size="lg"
              >
                Se déconnecter
              </Button>
            </div>
          )}

          {/* utilisateur anonyme */}
          {!isLogged && (
            <Button
              className="login-button"
              onClick={handleShow}
              variant="outline-dark"
              size="lg"
            >
              Se connecter
            </Button>
          )}

          <div className="login-form">

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Connecte toi ici!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>

                  <Field
                    name="email"
                    placeholder="Adresse Email"
                    value={email}
                    require
                  />
                  <Field
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    require
                  />
                  <Button variant="primary" type="submit">
                    Envoi
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>

          </div>
        </>
        )}
      </div>

    </div>
  );
}

LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

LoginForm.defaultProps = {
  email: '',
  password: '',
};

export default LoginForm;
