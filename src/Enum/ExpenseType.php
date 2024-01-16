<?php

namespace App\Enum;

enum ExpenseType: string{
    case Mandatory = 'Obligatoire';
    case Necessary = 'Nécessaire';
    case Optional = 'Optionnel';

}