package com.example.springrest.controller;

import com.example.springrest.model.User;
import com.example.springrest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminRESTController {

    private final UserService userService;

    @Autowired
    public AdminRESTController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public List<User> allUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/admin/{id}")
    public User getUser(@PathVariable long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/admin")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PutMapping("/admin")
    public User update(@RequestBody User user) {
        return userService.update(user);
    }

    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable Long id) {
        userService.removeUser(id);
    }
}
