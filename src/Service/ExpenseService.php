<?php

namespace App\Service;


use App\Entity\Expense;
use App\Entity\SpendingProfile;
use App\Repository\ExpenseRepository;
use App\Repository\SpendingProfileRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class ExpenseService extends  AbstractController {
    public function getCleanData(Request $request):array
    {
        $spendingProfileData = ["name" => "","budget" => ""];
        $reqArr = $request->toArray();
        foreach($reqArr as $k => $v){
            if($k === count($reqArr) - 1)
            {
                $spendingProfileData["name"] = current($v);
                $spendingProfileData['budget'] = next($v);
                unset($reqArr[count($reqArr) - 1]);
            }
        }
        return [$spendingProfileData,$reqArr,];
    }
    public function saveProfileAndExpenses(Request $request,SpendingProfileRepository $profileRepository,ExpenseRepository $expenseRepository):void
    {
        $spendingProfileData = current($this->getCleanData($request));
        $expensesData = $this->getCleanData($request)[1];

        $spending = new SpendingProfile();
        $spending->setName($spendingProfileData['name']);
        $spending->setBudget($spendingProfileData['budget']);
        $spending->setUser($this->getUser());
        $spending->setRemainingBalance(544);
        foreach($expensesData as $expenseArr)
        {

            $expense = new Expense();
            $expense->setName($expenseArr['name']);
            $expense->setAmount(floatval($expenseArr['amount']));
            $expense->setCategory($expenseArr['category']);
            $expense->setPriority($expenseArr['priority']);
            $expense->setSpendingProfile($spending);


            $expenseRepository->getEm()->persist($expense);
            $expenseRepository->getEm()->flush();
        }
        $profileRepository->getEm()->persist($spending);
        $profileRepository->getEm()->flush();
    }
}

