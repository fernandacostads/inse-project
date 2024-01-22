package br.inse.inseescolasapi.service;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import br.inse.inseescolasapi.domain.School;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

public class ExcelUploadService {
    public static boolean isValidExcelFile(MultipartFile file) {
        return Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    public static List<School> getSchoolsDataFromExcel(InputStream inputStream) {
        List<School> schools = new ArrayList<>();
       
        try {
            XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
            XSSFSheet sheet = workbook.getSheet("INSE_ESC_2021");
            int rowIndex = 0;
            
            for (Row row : sheet) {
                if (rowIndex == 0) {
                    rowIndex++;
                    continue;
                }
                Iterator<Cell> cellIterator = row.iterator();
                int cellIndex = 0;
                School school = new School();
                while (cellIterator.hasNext()) {
                    Cell cell = cellIterator.next();
                    switch (cellIndex) {
                        case 0 -> school.setNU_ANO_SAEB(getIntValueFromCell(cell));
                        case 1 -> school.setCO_UF(getIntValueFromCell(cell));
                        case 2 -> school.setSG_UF(getStringValueFromCell(cell));
                        case 3 -> school.setNO_UF(getStringValueFromCell(cell));
                        case 4 -> school.setCO_MUNICIPIO(getStringValueFromCell(cell));
                        case 5 -> school.setNO_MUNICIPIO(getStringValueFromCell(cell));
                        case 6 -> school.setID_ESCOLA(getStringValueFromCell(cell));
                        case 7 -> school.setNO_ESCOLA(getStringValueFromCell(cell));
                        case 8 -> school.setTP_TIPO_REDE(getIntValueFromCell(cell));
                        case 9 -> school.setTP_LOCALIZACAO(getIntValueFromCell(cell));
                        case 10 -> school.setTP_CAPITAL(getIntValueFromCell(cell));
                        case 11 -> school.setQTD_ALUNOS_INSE(getIntValueFromCell(cell));
                        case 12 -> school.setMEDIA_INSE(getDoubleValueFromCell(cell));
                        case 13 -> school.setINSE_CLASSIFICACAO(getStringValueFromCell(cell));
                        case 14 -> school.setPC_NIVEL_1(getDoubleValueFromCell(cell));
                        case 15 -> school.setPC_NIVEL_2(getDoubleValueFromCell(cell));
                        case 16 -> school.setPC_NIVEL_3(getDoubleValueFromCell(cell));
                        case 17 -> school.setPC_NIVEL_4(getDoubleValueFromCell(cell));
                        case 18 -> school.setPC_NIVEL_5(getDoubleValueFromCell(cell));
                        case 19 -> school.setPC_NIVEL_6(getDoubleValueFromCell(cell));
                        case 20 -> school.setPC_NIVEL_7(getDoubleValueFromCell(cell));
                        case 21 -> school.setPC_NIVEL_8(getDoubleValueFromCell(cell));
                        default -> {
                        }
                    }
                    cellIndex++;
                }
                schools.add(school);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return schools;
    }

    private static int getIntValueFromCell(Cell cell) {
        if (cell != null) {
            if (cell.getCellType() == CellType.NUMERIC) {
                return (int) cell.getNumericCellValue();
            } else if (cell.getCellType() == CellType.STRING && cell.getStringCellValue() != null && !cell.getStringCellValue().isEmpty()) {
                try {
                    return Integer.parseInt(cell.getStringCellValue());
                } catch (NumberFormatException e) {
                    
                }
            }
        }
        return 0; 
    }

    private static double getDoubleValueFromCell(Cell cell) {
        if (cell != null) {
            if (cell.getCellType() == CellType.NUMERIC) {
                return cell.getNumericCellValue();
            } else if (cell.getCellType() == CellType.STRING && cell.getStringCellValue() != null && !cell.getStringCellValue().isEmpty()) {
                try {
                    return Double.parseDouble(cell.getStringCellValue());
                } catch (NumberFormatException e) {
                    
                }
            }
        }
        return 0.0;
    }

    private static String getStringValueFromCell(Cell cell) {
        if (cell != null) {
            if (cell.getCellType() == CellType.NUMERIC) {
                return String.valueOf((int) cell.getNumericCellValue());
            } else if (cell.getCellType() == CellType.STRING) {
                return cell.getStringCellValue();
            }
        }
        return ""; 
    }
}
