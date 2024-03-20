<?php

namespace App\Controller;

use App\Repository\SpendingProfileRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomepageController extends AbstractController
{
    #[Route('/', name: 'homepage')]
    public function homepage(SpendingProfileRepository $profileRepository): Response
    {
        return $this->render('homepage/homepage.twig', [
            'spendingProfiles' => $profileRepository->findAll(),
            'totalSpendingProfiles' => count($profileRepository->findAll())
        ]);
    }
}
