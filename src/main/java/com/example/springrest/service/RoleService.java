package com.example.springrest.service;

import com.example.springrest.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();
    void addRole(Role role);
    void update(Role role);
    void removeById(long id);
}
