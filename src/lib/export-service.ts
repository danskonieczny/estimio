import { PricingResult } from './types'
import jsPDF from 'jspdf'
import ExcelJS from 'exceljs'

export class ExportService {
  async generatePDF(estimate: PricingResult): Promise<Buffer> {
    const pdf = new jsPDF()
    
    // Nagłówek
    pdf.setFontSize(20)
    pdf.text('Wycena Projektu Aplikacji', 20, 30)
    
    pdf.setFontSize(12)
    pdf.text(`Data: ${new Date().toLocaleDateString('pl-PL')}`, 20, 45)
    
    // Podsumowanie
    pdf.setFontSize(16)
    pdf.text('Podsumowanie', 20, 65)
    
    pdf.setFontSize(12)
    pdf.text(`Całkowity koszt: ${estimate.totalCost.toLocaleString('pl-PL')} PLN`, 20, 80)
    pdf.text(`Czas realizacji: ${estimate.totalHours} godzin`, 20, 95)
    
    // Breakdown
    let yPos = 120
    pdf.setFontSize(16)
    pdf.text('Szczegóły wyceny', 20, yPos)
    yPos += 20
    
    estimate.breakdown.forEach((item) => {
      pdf.setFontSize(14)
      pdf.text(`${item.category}: ${item.cost.toLocaleString('pl-PL')} PLN`, 25, yPos)
      yPos += 15
      
      pdf.setFontSize(10)
      pdf.text(`${item.hours}h - ${item.features.join(', ')}`, 30, yPos)
      yPos += 20
    })
    
    return Buffer.from(pdf.output('arraybuffer'))
  }
  
  async generateExcel(estimate: PricingResult): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Wycena Projektu')
    
    // Nagłówek
    worksheet.addRow(['Wycena Projektu Aplikacji'])
    worksheet.addRow([`Data: ${new Date().toLocaleDateString('pl-PL')}`])
    worksheet.addRow([])
    
    // Podsumowanie
    worksheet.addRow(['Podsumowanie'])
    worksheet.addRow(['Całkowity koszt:', `${estimate.totalCost.toLocaleString('pl-PL')} PLN`])
    worksheet.addRow(['Czas realizacji:', `${estimate.totalHours} godzin`])
    worksheet.addRow([])
    
    // Nagłówki tabeli
    worksheet.addRow(['Kategoria', 'Koszt (PLN)', 'Godziny', 'Funkcjonalności'])
    
    // Dane
    estimate.breakdown.forEach((item) => {
      worksheet.addRow([
        item.category,
        item.cost,
        item.hours,
        item.features.join(', ')
      ])
    })
    
    // Stylowanie
    worksheet.getRow(1).font = { size: 16, bold: true }
    worksheet.getRow(4).font = { size: 14, bold: true }
    worksheet.getRow(8).font = { bold: true }
    
    // Szerokość kolumn
    worksheet.getColumn(1).width = 20
    worksheet.getColumn(2).width = 15
    worksheet.getColumn(3).width = 10
    worksheet.getColumn(4).width = 40
    
    return Buffer.from(await workbook.xlsx.writeBuffer())
  }
}
