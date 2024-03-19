<?php

namespace App\Entity;

use App\Repository\SpendingProfileRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: SpendingProfileRepository::class)]
#[UniqueEntity(
    fields: 'name',message: 'Le nom du profil n\'est pas disponible, veuillez en définir un autre'
)]
class SpendingProfile
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message:'Oops! Ce champ ne peut être vide !')]
    private ?string $name = null;

    #[ORM\Column]
    #[Assert\NotBlank(message:'Oops! Ce champ ne peut être vide !')]
    private ?float $budget = null;


    #[ORM\Column]
    private ?float $remainingBalance = null;

    #[ORM\ManyToOne(cascade: ['persist'], inversedBy: 'spendingProfile')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'spendingProfile', targetEntity: Expense::class)]
    private Collection $expense;

    #[Assert\Type(type:Expense::class)]
    #[Assert\Valid]
    protected ?Expense $expenseForm;
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

    public function getExpenseForm(): ?Expense
    {
        return $this->expenseForm;
    }

    public function setExpenseForm(?Expense $expenseForm): void
    {
        $this->expenseForm = $expenseForm;
    }
}
