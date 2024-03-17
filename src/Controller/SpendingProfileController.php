<?php

namespace App\Controller;

use App\Form\SpendingProfileType;
use App\Repository\ExpenseRepository;
use App\Repository\SpendingProfileRepository;
use App\Service\ExpenseService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

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
    public function spendingProfilePost(Request $request,SerializerInterface $serializer,ExpenseService $expenseService,SpendingProfileRepository $profileRepository,ExpenseRepository $expenseRepository): JsonResponse
    {
        $expenseService->saveProfileAndExpenses($request,$profileRepository,$expenseRepository);
        return  $this->json(['data' => 'saved']);
    }
}
