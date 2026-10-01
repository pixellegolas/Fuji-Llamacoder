import { useRef, useState } from "react"

interface PhotoUploadProps {
  onUpload: (photo: string) => void
}

export function PhotoUpload({ onUpload }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        onUpload(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div
      className={`flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors ${
        dragOver
          ? "border-amber-500 bg-amber-500/10"
          : "border-zinc-700 bg-zinc-900"
      }`}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
      }}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
        <span className="text-3xl">🖼️</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold">Upload a Photo</h3>
      <p className="mb-6 text-sm text-zinc-400">
        Drag and drop or click to select
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-400"
      >
        Select Photo
      </button>
    </div>
  )
}