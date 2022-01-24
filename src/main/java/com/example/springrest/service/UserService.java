package com.example.springrest.service;

import com.example.springrest.model.User;

import java.util.List;

public interface UserService {
    User addUser(User user);
    void removeUser(long id);
    List<User> getAllUsers();
    User update(User user);
    User getUserById(long id);
}
