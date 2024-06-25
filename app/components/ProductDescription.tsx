"use client"
import { type JSONContent, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

export default function ProductDescription({ content }: { content: JSONContent}) {
    const editor = useEditor({
        editable: false,
        extensions: [StarterKit],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm'
            }
        }
    })

    if (!editor){
        return null
    }

  return (
    <div>
        <EditorContent editor={editor} />
    </div>
  )
}
