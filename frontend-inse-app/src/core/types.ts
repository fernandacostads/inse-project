export type School = {
  uf: string;
  municipio: string;
  quantidadeAlunos: number;
  name: string;
  classification: string[];
  media: number;
  category: string;
};

export type SchoolResponse = {
  schools: School[];
  maxMedia: number;
};

export type SchoolSort = 'name' | 'mediaAsc' | 'mediaDesc';

