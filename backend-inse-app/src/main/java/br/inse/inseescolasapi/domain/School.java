package br.inse.inseescolasapi.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class School {
    
    private Integer NU_ANO_SAEB;
    private Integer CO_UF;
    private String SG_UF;
    private String NO_UF;
    private String CO_MUNICIPIO;
    private String NO_MUNICIPIO;
    @Id
    private String ID_ESCOLA;
    private String NO_ESCOLA;
    private Integer TP_TIPO_REDE;
    private Integer TP_LOCALIZACAO;
    private Integer TP_CAPITAL;
    private Integer QTD_ALUNOS_INSE;
    private Double MEDIA_INSE;
    private String INSE_CLASSIFICACAO;
    private Double PC_NIVEL_1;
    private Double PC_NIVEL_2;
    private Double PC_NIVEL_3;
    private Double PC_NIVEL_4;
    private Double PC_NIVEL_5;
    private Double PC_NIVEL_6;
    private Double PC_NIVEL_7;
    private Double PC_NIVEL_8;
}
