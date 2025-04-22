import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('zh-cn', {
    month: 'long', //将月份显示为全称(例如：三月)
    day: 'numeric', //显示日期的数字部分
    year: 'numeric' //显示年份的数字部分
  })
}