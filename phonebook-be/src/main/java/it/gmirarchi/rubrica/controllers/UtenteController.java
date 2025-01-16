package it.gmirarchi.rubrica.controllers;

import it.gmirarchi.rubrica.entities.User;
import it.gmirarchi.rubrica.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UtenteController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping
    public User creaUtente(@RequestBody User utente) {
        return userService.saveUser(utente);
    }

    @PostMapping("/{id}")
    public User modificaUtente(@RequestBody User utente, @PathVariable Long id) throws Exception {
        return userService.modifyUser(utente, id);
    }

    @DeleteMapping("/{id}")
    public void eliminaUtente(@PathVariable Long id) {
        userService.deleteUser(id);
    }

}