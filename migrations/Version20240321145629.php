<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240321145629 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE expense CHANGE type_of_expense priority VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE spending_profile ADD slug VARCHAR(255) NOT NULL, DROP remaining_balance, CHANGE expense_type description VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE expense CHANGE priority type_of_expense VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE spending_profile ADD expense_type VARCHAR(255) NOT NULL, ADD remaining_balance DOUBLE PRECISION NOT NULL, DROP description, DROP slug');
    }
}
