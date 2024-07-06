package com.iread.backend.project.service.impl;

import com.iread.backend.project.entity.Role;
import com.iread.backend.project.enumeration.RoleEnum;
import com.iread.backend.project.repository.RoleRepository;
import com.iread.backend.project.service.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Transactional(readOnly = true)
    @Override
    public Role findByRoleEnum(RoleEnum roleEnum) {
        return roleRepository.findByRoleEnum(roleEnum);
    }
}

