<?php

namespace App\Controller;

use App\Entity\SpendingProfile;
use App\Form\SpendingProfileType;
use App\Repository\ExpenseRepository;
use App\Repository\SpendingProfileRepository;
use App\Service\ExpenseService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SpendingProfileController extends AbstractController
{
    #[Route('/créer-un-profil-de-dépenses', name: 'createSpendingProfileGet',methods: ['GET'])]
    public function createSpendingProfileGet(): Response
    {
        $form = $this->createForm(SpendingProfileType::class);
        return $this->render('spending_profile/create_spending_profile.twig', [
            'form' => $form,
        ]);
    }
    #[Route('/créer-un-profil-de-dépenses', name: 'createSpendingProfilePost',methods: ['POST'])]
    public function createSpendingProfilePost(Request $request,ExpenseService $expenseService,SpendingProfileRepository $profileRepository,ExpenseRepository $expenseRepository): JsonResponse
    {
        return !$expenseService->saveProfileAndExpenses($request,$profileRepository,$expenseRepository) ? $this->json(["status" => Response::HTTP_BAD_REQUEST]) : $this->json(["status" => Response::HTTP_OK]);
    }

    #[Route('/profil-de-dépenses/{slug}',name:'spendingProfileGet',methods:['GET'])]
    public function spendingProfileGet(SpendingProfile $spendingProfile,ExpenseRepository $expenseRepository,ExpenseService $expenseService):Response
    {
        return $this->render("spending_profile/get_spending_profile.twig",[
            "spendingProfile" => $spendingProfile,
            "expenses" => $expenseRepository->findBy(["spendingProfile" => $spendingProfile]),
            "totalExpenses" => count($expenseRepository->findBy(["spendingProfile" => $spendingProfile])),
            "totalAmountExpenses" => $expenseService->totalAmountExpenses($expenseRepository,$spendingProfile)
        ]);
    }

}
