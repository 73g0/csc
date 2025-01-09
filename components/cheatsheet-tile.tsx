import { FileText } from '@geist-ui/icons'

interface CheatsheetTileProps {
  title: string
  description: string
  url: string
}

export default function CheatsheetTile({ title, description, url }: CheatsheetTileProps) {
  return (
    <div className="p-4 border rounded-md hover:bg-secondary flex items-start space-x-4">
      <div className="bg-primary text-primary-foreground p-2 rounded-md">
        <FileText />
      </div>
      <div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:underline">
          {title}
        </a>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}

