package it.gmirarchi.rubrica.services;

import it.gmirarchi.rubrica.entities.User;
import it.gmirarchi.rubrica.repositories.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UtenteRepository utenteRepository;

    public List<User> getUsers() {
        return utenteRepository.findAll();
    }

    public User saveUser(User utente) {
        return utenteRepository.save(utente);
    }

    public User modifyUser(User utente, Long id) throws Exception {
        Optional<User> existingUserOpt = utenteRepository.findById(id);
        if (existingUserOpt.isPresent()){
            User existingUser = existingUserOpt.get();
            existingUser.setAddress(utente.getAddress());
            existingUser.setAge(utente.getAge());
            existingUser.setName(utente.getName());
            existingUser.setSurname(utente.getSurname());
            existingUser.setTelephone(utente.getTelephone());
            utenteRepository.save(existingUser);
            return existingUser;
        } else {
            throw new Exception("User not found");
        }





    }


    public void deleteUser(Long id) {
        utenteRepository.deleteById(id);
    }

}