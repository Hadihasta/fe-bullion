'use client'
import { toast } from 'sonner'

// Tipe toast
// type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default'

/**
 * ToasterNotif() — helper global
type jenis toast (success, error, info, warning)
  message pesan utama
color optional warna custom (default: auto by type)
 */
// color error = #ef4444 succes = #22c55e  warning = #eab308 info = #f97316
export function ToasterNotif(type, message, color) {
  const baseStyle = {
    background: color || '#374151',
    color: '#fff',
    border: 'none',
  }

  switch (type) {
    case 'success':
      toast.success(message, { style: baseStyle })
      break
    case 'error':
      toast.error(message, { style: baseStyle })
      break
    case 'info':
      toast.info(message, { style: baseStyle })
      break
    case 'warning':
      toast.warning(message, { style: baseStyle })
      break
    default:
      toast(message, { style: baseStyle })
  }
}
