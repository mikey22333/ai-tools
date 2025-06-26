'use client'

import { useState } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  const insertTag = (tag: string, hasClosing: boolean = true) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    let newText: string
    if (hasClosing) {
      newText = value.substring(0, start) + 
                `<${tag}>${selectedText}</${tag}>` + 
                value.substring(end)
    } else {
      newText = value.substring(0, start) + 
                `<${tag}>` + 
                value.substring(end)
    }

    onChange(newText)
    
    // Restore focus and cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + (hasClosing ? tag.length + 2 : tag.length + 2)
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const insertList = (type: 'ul' | 'ol') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const selectedText = value.substring(textarea.selectionStart, textarea.selectionEnd)
    
    let listContent = ''
    if (selectedText) {
      const lines = selectedText.split('\n')
      listContent = lines.map(line => `  <li>${line.trim()}</li>`).join('\n')
    } else {
      listContent = '  <li>List item</li>'
    }

    const newText = value.substring(0, start) + 
                   `<${type}>\n${listContent}\n</${type}>` + 
                   value.substring(textarea.selectionEnd)

    onChange(newText)
  }

  const toolbarButtons = [
    { label: 'H2', action: () => insertTag('h2') },
    { label: 'H3', action: () => insertTag('h3') },
    { label: 'B', action: () => insertTag('strong') },
    { label: 'I', action: () => insertTag('em') },
    { label: 'Link', action: () => insertTag('a href=""') },
    { label: 'UL', action: () => insertList('ul') },
    { label: 'OL', action: () => insertList('ol') },
    { label: 'Code', action: () => insertTag('code') },
    { label: 'Quote', action: () => insertTag('blockquote') },
    { label: 'BR', action: () => insertTag('br', false) },
  ]

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 p-2">
        <div className="flex items-center space-x-1">
          {toolbarButtons.map((button) => (
            <button
              key={button.label}
              type="button"
              onClick={button.action}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
            >
              {button.label}
            </button>
          ))}
          <div className="border-l border-gray-300 dark:border-gray-500 h-6 mx-2"></div>
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`px-3 py-1 text-sm border border-gray-300 dark:border-gray-500 rounded transition-colors ${
              isPreview 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                : 'bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500'
            }`}
          >
            {isPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      {/* Editor/Preview */}
      {isPreview ? (
        <div 
          className="p-4 min-h-[400px] bg-white dark:bg-gray-800 prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ) : (
        <textarea
          id="content-editor"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 min-h-[400px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none font-mono text-sm"
        />
      )}

      {/* Helper Text */}
      <div className="bg-gray-50 dark:bg-gray-700 border-t border-gray-300 dark:border-gray-600 p-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Select text and use toolbar buttons to format. HTML tags are supported.
        </p>
      </div>
    </div>
  )
}
