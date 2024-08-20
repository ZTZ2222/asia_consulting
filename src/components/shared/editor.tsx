"use client"

import React, { useMemo, useRef, useState } from "react"
import useMediaQuery from "@custom-react-hooks/use-media-query"
import JoditEditor from "jodit-react"
import type { ControllerRenderProps } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"

type Props = {
  field: ControllerRenderProps<any, any>
  placeholder?: string
}

export default function Editor({ field, placeholder }: Props) {
  const isTablet = useMediaQuery("(min-width:768px)")
  const editor = useRef(null)
  const [content, setContent] = useState(field.value || "")

  const config = useMemo(() => {
    const options = [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "cut",
      "copy",
      "paste",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "lineHeight",
      "|",
      "outdent",
      "indent",
      "align",
      "|",
      "hr",
      "fullsize",
      "print",
      "|",
      "table",
      "link",
      "image",
      "|",
      "brush",
      "undo",
      "redo",
    ]

    return {
      readonly: false,
      minHeight: isTablet ? 400 : 600,
      placeholder: placeholder || "",
      defaultLineHeight: 1.5,
      enter: "div" as any,
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
    }
  }, [isTablet, placeholder])

  const handleChange = useDebouncedCallback((newContent: string) => {
    setContent(newContent)
    field.onChange(newContent)
  }, 700)

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onChange={handleChange} // preferred to use only this option to update the content for performance reasons
    />
  )
}
//   <div dangerouslySetInnerHTML={{ __html: content }} />
