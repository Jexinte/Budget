<?php

namespace App\Repository;

use App\Entity\SpendingProfile;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SpendingProfile>
 *
 * @method SpendingProfile|null find($id, $lockMode = null, $lockVersion = null)
 * @method SpendingProfile|null findOneBy(array $criteria, array $orderBy = null)
 * @method SpendingProfile[]    findAll()
 * @method SpendingProfile[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SpendingProfileRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SpendingProfile::class);
    }

    /**
     * @return EntityManagerInterface
     */
    public function getEm(): EntityManagerInterface
    {
        return $this->_em;
    }

}
