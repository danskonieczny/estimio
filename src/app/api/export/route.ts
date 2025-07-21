import { NextRequest, NextResponse } from 'next/server'
import { ExportService } from '@/lib/export-service'

export async function POST(request: NextRequest) {
  try {
    const { estimate, format } = await request.json()
    
    const exportService = new ExportService()
    
    if (format === 'pdf') {
      const pdfBuffer = await exportService.generatePDF(estimate)
      
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="wycena.pdf"',
        },
      })
    } else if (format === 'excel') {
      const excelBuffer = await exportService.generateExcel(estimate)
      
      return new NextResponse(excelBuffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename="wycena.xlsx"',
        },
      })
    }
    
    return NextResponse.json({ error: 'Invalid format' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}
