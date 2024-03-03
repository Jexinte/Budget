<?php

namespace App\Controller;

use App\Form\SpendingProfileType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SpendingProfileController extends AbstractController
{
    #[Route('/spending-profile', name: 'spendingProfileGet',methods: ['GET'])]
    public function spendingProfileGet(): Response
    {
        $form = $this->createForm(SpendingProfileType::class);
        return $this->render('spending_profile/spending_profile.twig', [
            'form' => $form,
        ]);
    }
    #[Route('/spending-profile', name: 'spendingProfilePost',methods: ['POST'])]
    public function spendingProfilePost(Request $request): Response
    {
        $form = $this->createForm(SpendingProfileType::class);
        $response = new Response();
        $form->handleRequest($request);

        if($form->isValid() && $form->isSubmitted())
        {
            dd('OK');
        }
        return $this->render('spending_profile/spending_profile.twig', [
            'form' => $form,
        ],$response->setStatusCode($response::HTTP_BAD_REQUEST));
    }
}
