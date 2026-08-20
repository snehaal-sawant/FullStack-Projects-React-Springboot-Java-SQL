package com.sanvimaritime.service;

import com.sanvimaritime.dto.UserDto;
import com.sanvimaritime.entity.User;
import com.sanvimaritime.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    public long countUsers() {
        return userRepository.count();
    }

    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .company(user.getCompany())
                .phone(user.getPhone())
                .role(user.getRole() != null ? user.getRole().name() : "ROLE_USER")
                .build();
    }
}
