<?php

namespace App\Entity;

use App\Enum\Category;
use App\Enum\ExpenseType;
use App\Repository\ExpenseRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExpenseRepository::class)]
class Expense
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(enumType: Category::class)]
    private ?Category $category = null;

    #[ORM\Column]
    private ?float $amount = null;

    #[ORM\Column(enumType: ExpenseType::class)]
    private ?ExpenseType $typeOfExpense = null;

    #[ORM\ManyToOne(inversedBy: 'expense')]
    #[ORM\JoinColumn(nullable: false)]
    private ?SpendingProfile $spendingProfile = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): static
    {
        $this->amount = $amount;

        return $this;
    }

    public function getTypeOfExpense(): ?ExpenseType
    {
        return $this->typeOfExpense;
    }

    public function setTypeOfExpense(?ExpenseType $typeOfExpense): static
    {
        $this->typeOfExpense = $typeOfExpense;

        return $this;
    }

    public function getSpendingProfile(): ?SpendingProfile
    {
        return $this->spendingProfile;
    }

    public function setSpendingProfile(?SpendingProfile $spendingProfile): static
    {
        $this->spendingProfile = $spendingProfile;

        return $this;
    }
}
