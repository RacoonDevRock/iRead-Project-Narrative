package com.iread.backend.project.service;

import com.iread.backend.project.entity.Role;
import com.iread.backend.project.enumeration.RoleEnum;

public interface RoleService {
    Role findByRoleEnum(RoleEnum roleEnum);
}
