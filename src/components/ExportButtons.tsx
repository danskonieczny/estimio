'use client'

import { useState } from 'react'
import { PricingResult } from '@/lib/types'
import { Download, FileText, Table } from 'lucide-react'

interface ExportButtonsProps {
  estimate: PricingResult
}

export default function ExportButtons({ estimate }: ExportButtonsProps) {
  const [loading, setLoading] = useState<'pdf' | 'excel' | null>(null)

  const handleExport = async (format: 'pdf' | 'excel') => {
    setLoading(format)
    
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estimate, format })
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `wycena-${Date.now()}.${format === 'pdf' ? 'pdf' : 'xlsx'}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex space-x-3">
      <button
        onClick={() => handleExport('pdf')}
        disabled={loading === 'pdf'}
        className="btn-primary flex items-center space-x-2 flex-1"
      >
        <FileText className="h-4 w-4" />
        <span>{loading === 'pdf' ? 'Generuję...' : 'Eksport PDF'}</span>
      </button>

      <button
        onClick={() => handleExport('excel')}
        disabled={loading === 'excel'}
        className="btn-secondary flex items-center space-x-2 flex-1"
      >
        <Table className="h-4 w-4" />
        <span>{loading === 'excel' ? 'Generuję...' : 'Eksport Excel'}</span>
      </button>
    </div>
  )
}
