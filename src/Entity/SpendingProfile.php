<?php

namespace App\Entity;

use App\Enum\ExpenseType;
use App\Repository\SpendingProfileRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SpendingProfileRepository::class)]
class SpendingProfile
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?float $budget = null;
    #[ORM\Column(enumType:ExpenseType::class)]
    private ?ExpenseType $expenseType;

    #[ORM\Column]
    private ?float $remainingBalance = null;

    #[ORM\ManyToOne(inversedBy: 'spendingProfile')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'spendingProfile', targetEntity: Expense::class)]
    private Collection $expense;

    public function __construct()
    {
        $this->expense = new ArrayCollection();
    }

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

    public function getBudget(): ?float
    {
        return $this->budget;
    }

    public function setBudget(float $budget): static
    {
        $this->budget = $budget;

        return $this;
    }

    public function getRemainingBalance(): ?float
    {
        return $this->remainingBalance;
    }

    public function setRemainingBalance(float $remainingBalance): static
    {
        $this->remainingBalance = $remainingBalance;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getExpenseType(): ?ExpenseType
    {
        return $this->expenseType;
    }

    public function setExpenseType(ExpenseType $expenseType): void
    {
        $this->expenseType = $expenseType;
    }

    /**
     * @return Collection<int, Expense>
     */
    public function getExpense(): Collection
    {
        return $this->expense;
    }

    public function addExpense(Expense $expense): static
    {
        if (!$this->expense->contains($expense)) {
            $this->expense->add($expense);
            $expense->setSpendingProfile($this);
        }

        return $this;
    }

    public function removeExpense(Expense $expense): static
    {
        if ($this->expense->removeElement($expense)) {
            // set the owning side to null (unless already changed)
            if ($expense->getSpendingProfile() === $this) {
                $expense->setSpendingProfile(null);
            }
        }

        return $this;
    }
}
