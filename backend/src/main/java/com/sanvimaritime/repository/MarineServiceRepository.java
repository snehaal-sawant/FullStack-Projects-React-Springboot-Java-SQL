package com.sanvimaritime.repository;

import com.sanvimaritime.entity.MarineServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarineServiceRepository extends JpaRepository<MarineServiceEntity, String> {
}
