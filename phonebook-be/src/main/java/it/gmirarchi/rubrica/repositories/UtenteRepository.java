package it.gmirarchi.rubrica.repositories;

import it.gmirarchi.rubrica.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtenteRepository extends JpaRepository<User, Long> {
}