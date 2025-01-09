'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronDown } from 'lucide-react'
import CheatsheetTile from '@/components/cheatsheet-tile'

// Placeholder data for top universities and their courses
const universities = [
  { id: 1, name: 'Massachusetts Institute of Technology (MIT)', country: 'USA' },
  { id: 2, name: 'University of Cambridge', country: 'UK' },
  { id: 3, name: 'Stanford University', country: 'USA' },
  { id: 4, name: 'University of Oxford', country: 'UK' },
  { id: 5, name: 'Harvard University', country: 'USA' },
  { id: 6, name: 'California Institute of Technology (Caltech)', country: 'USA' },
  { id: 7, name: 'Imperial College London', country: 'UK' },
  { id: 8, name: 'ETH Zurich', country: 'Switzerland' },
  { id: 9, name: 'University College London (UCL)', country: 'UK' },
  { id: 10, name: 'University of Chicago', country: 'USA' },
]

const courses = [
  'Computer Science',
  'Engineering',
  'Physics',
  'Mathematics',
  'Biology',
  'Chemistry',
  'Economics',
  'Business Administration',
  'Law',
  'Medicine',
]

// Placeholder data for cheatsheets
const cheatsheets = universities.flatMap(uni =>
  courses.map((course, index) => ({
    id: `${uni.id}-${index}`,
    title: `${course} - ${uni.name}`,
    description: `A comprehensive cheatsheet for ${course} students at ${uni.name}.`,
    url: `/cheatsheets/${uni.id}-${index}.pdf`,
    university: uni.name,
    country: uni.country,
    course: course,
  }))
)

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([])
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [results, setResults] = useState(cheatsheets)

  const countries = Array.from(new Set(universities.map(uni => uni.country)))

  useEffect(() => {
    const filteredResults = cheatsheets.filter(sheet =>
      sheet.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCountries.length === 0 || selectedCountries.includes(sheet.country)) &&
      (selectedUniversities.length === 0 || selectedUniversities.includes(sheet.university)) &&
      (selectedCourses.length === 0 || selectedCourses.includes(sheet.course))
    )
    setResults(filteredResults)
  }, [searchTerm, selectedCountries, selectedUniversities, selectedCourses])

  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 space-y-4">
        <Input
          type="text"
          placeholder="Search for cheatsheets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Countries
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                {countries.map(country => (
                  <div
                    key={country}
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => toggleSelection(country, selectedCountries, setSelectedCountries)}
                  >
                    <div className={`w-4 h-4 border rounded-sm flex items-center justify-center ${selectedCountries.includes(country) ? 'bg-primary border-primary' : 'border-input'}`}>
                      {selectedCountries.includes(country) && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <span>{country}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Universities
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                {universities.map(uni => (
                  <div
                    key={uni.id}
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => toggleSelection(uni.name, selectedUniversities, setSelectedUniversities)}
                  >
                    <div className={`w-4 h-4 border rounded-sm flex items-center justify-center ${selectedUniversities.includes(uni.name) ? 'bg-primary border-primary' : 'border-input'}`}>
                      {selectedUniversities.includes(uni.name) && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <span>{uni.name}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Courses
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                {courses.map(course => (
                  <div
                    key={course}
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => toggleSelection(course, selectedCourses, setSelectedCourses)}
                  >
                    <div className={`w-4 h-4 border rounded-sm flex items-center justify-center ${selectedCourses.includes(course) ? 'bg-primary border-primary' : 'border-input'}`}>
                      {selectedCourses.includes(course) && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="space-y-4">
        {results.map(sheet => (
          <CheatsheetTile
            key={sheet.id}
            title={sheet.title}
            description={sheet.description}
            url={sheet.url}
          />
        ))}
      </div>
    </div>
  )
}

