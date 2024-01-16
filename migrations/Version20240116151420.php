<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240116151420 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE expense ADD spending_profile_id INT NOT NULL');
        $this->addSql('ALTER TABLE expense ADD CONSTRAINT FK_2D3A8DA6D050EABA FOREIGN KEY (spending_profile_id) REFERENCES spending_profile (id)');
        $this->addSql('CREATE INDEX IDX_2D3A8DA6D050EABA ON expense (spending_profile_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE expense DROP FOREIGN KEY FK_2D3A8DA6D050EABA');
        $this->addSql('DROP INDEX IDX_2D3A8DA6D050EABA ON expense');
        $this->addSql('ALTER TABLE expense DROP spending_profile_id');
    }
}
