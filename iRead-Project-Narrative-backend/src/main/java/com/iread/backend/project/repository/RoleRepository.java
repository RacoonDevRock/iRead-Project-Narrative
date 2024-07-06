package com.iread.backend.project.repository;

import com.iread.backend.project.entity.Role;
import com.iread.backend.project.enumeration.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleEnum(RoleEnum roleEnum);
}

