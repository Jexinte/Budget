<?php

namespace App\Controller;

use App\Form\LoginType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class LoginController extends AbstractController
{
    #[Route('/login', name: 'login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        $form = $this->createForm(LoginType::class);
        $error = $authenticationUtils->getLastAuthenticationError();
        $response = new Response();
        $statusCode = $response::HTTP_OK;
        if($error)
        {
            $error = new FormError('Identifiant ou mot de passe invalide !');
            $usernameField = $form->get('username');
            $usernameField->addError($error);
            $statusCode = $response::HTTP_BAD_REQUEST;
        }
        return $this->render('login/login.twig',[
            'form' => $form
        ],$response->setStatusCode($statusCode));
    }

}
