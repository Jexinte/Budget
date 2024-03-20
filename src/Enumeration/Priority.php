<?php

namespace App\Enumeration;

enum Priority: string{
    case Mandatory = 'Obligatoire';
    case Necessary = 'Nécessaire';
    case Optional = 'Optionnel';

}
