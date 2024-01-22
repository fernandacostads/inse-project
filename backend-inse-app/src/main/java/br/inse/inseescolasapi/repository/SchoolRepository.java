package br.inse.inseescolasapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.inse.inseescolasapi.domain.School;

public interface SchoolRepository  extends JpaRepository<School, String> {
}
