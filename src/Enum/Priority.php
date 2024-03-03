<?php

namespace App\Enum;

enum Priority: string{
    case Mandatory = 'Obligatoire';
    case Necessary = 'Nécessaire';
    case Optional = 'Optionnel';

}