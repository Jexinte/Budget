<?php

namespace App\Form;

use App\Entity\SpendingProfile;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SpendingProfileType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name',TextType::class,
            [
                'label' => 'Nom du profil',
                'required' => false
            ])
            ->add('budget',NumberType::class,[
                'label' => 'Quel est votre budget ?',
                'required' => false
            ])

            ->add('expenseForm',ExpenseType::class)
            ->add('save',SubmitType::class,[
                'label' => 'Envoyer',
                'attr' => ['class' => 'btn btn-dark']
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => SpendingProfile::class,
            'attr' => ['id' => 'spending_form']
        ]);
    }
}
