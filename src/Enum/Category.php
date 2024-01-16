<?php

namespace App\Enum;

enum Category: string{
    case Health = 'Santé';
    case Insurance = 'Assurance';
    case BankFees = 'Banque - Frais bancaires';
    case Recreation = 'Loisirs';
    case Savings = 'Epargne';
    case Debts = 'Dettes';
    case CurrentExpenses = 'Dépenses courantes';
}