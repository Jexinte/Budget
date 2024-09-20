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
        $userSpendingProfiles = $profileRepository->findBy(['user' => $this->getUser()]);
        return $this->render('homepage/homepage.twig', [
            'spendingProfiles' => $userSpendingProfiles,
            'totalSpendingProfiles' => count($userSpendingProfiles)
        ]);
    }
}
