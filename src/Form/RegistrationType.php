<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RegistrationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('username',TextType::class,[
                'label' => 'Utilisateur',
                'required' => false
            ])
            ->add('password',RepeatedType::class,[
                'type' => PasswordType::class,
                'invalid_message' => 'Oops! Les mots de passe doivent correspondrent',
                'options' => ['attr' => ['class' => 'password-field']],
                'required' => false,
                'first_options' => [
                    'label' => 'Mot de passe',
                    'attr' => ['name' => 'password']],
                'second_options' => [
                    'label' => 'Confirmez votre de mot de passe',
                    'attr' => ['name' => 'check_password']],
            ])
            ->add('save',SubmitType::class,[
                'label' => 'Envoyer',
                'attr' => ['class' => 'btn btn-dark','name' => 'save']
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'attr' => ['id' => 'form']
        ]);
    }
}
