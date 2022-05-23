// @ts-ignore
import requset from './request'
export function getUrlKey(key: string, href: string) {
  const reg = new RegExp(`[?|&]${key}=([^&;]+?)(&|#|;|$)`).exec(href) || [
    '',
    '',
  ]
  const regUrl = reg[1].replace(/\+/g, '%20')
  return decodeURIComponent(regUrl) || null
}

//SSOLogin

// 非https下的复制方法
export function copyToClipboard(textToCopy: any) {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(textToCopy)
  } else {
    // text area method
    const textArea = document.createElement('textarea')
    textArea.value = textToCopy
    // make the textarea out of viewport
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    return new Promise((res: any, rej) => {
      // here the magic happens
      document.execCommand('copy') ? res() : rej()
      textArea.remove()
    })
  }
}

export function percent(covered: any, total: any) {
  let tmp
  if (total > 0) {
    tmp = (1000 * 100 * covered) / total
    return Math.floor(tmp / 10) / 100
  } else {
    return 100.0
  }
}
