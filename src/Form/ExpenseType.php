<?php

namespace App\Form;

use App\Entity\Expense;
use App\Enum\Category;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use App\Enum\Priority;

class ExpenseType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name',TextType::class,[
                'label' => 'Nom de la dépense',
                'required' => false
            ])
            ->add('category',ChoiceType::class,
                [
                    'label' => 'Quel est la catégorie de votre dépense ?',
                    'required' => false,
                    'choices' => [
                        Category::Health->value => Category::Health->value,
                        Category::Insurance->value => Category::Insurance->value,
                        Category::BankFees->value => Category::BankFees->value,
                        Category::Recreation->value => Category::Recreation->value,
                        Category::Savings->value => Category::Savings->value,
                        Category::Debts->value => Category::Debts->value,
                        Category::CurrentExpenses->value  => Category::CurrentExpenses->value
                    ]
                ])
            ->add('amount',NumberType::class,
            [
                'label' => 'Montant de la dépense',
                'required' => false
            ])
   
            ->add('priority',ChoiceType::class,
            [
                'label' => 'Comment qualifiez-vous cette dépense ?',
                'required' => false,
                'choices' => [
                    Priority::Mandatory->value  => Priority::Mandatory->value,
                    Priority::Necessary->value  => Priority::Necessary->value ,
                    Priority::Optional->value  => Priority::Optional->value
                ]
            ])

        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Expense::class,
        ]);
    }
}
