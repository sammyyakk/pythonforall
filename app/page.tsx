"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Code, Layers } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

// Dynamically import the video component with no SSR
const DynamicVideoHero = dynamic(() => import('./VideoHero'), { ssr: false })

export default function Page() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <DynamicVideoHero />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background text-foreground">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Why PythonForAll?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <BookOpen className="w-8 h-8 mb-2" />
                  <CardTitle>Comprehensive Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>From basics to advanced topics, we cover everything you need to become a Python expert.</p>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <Layers className="w-8 h-8 mb-2" />
                  <CardTitle>Explore Modules</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Dive deep into Python&aposs powerful modules and libraries to extend your programming capabilities.</p>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <Code className="w-8 h-8 mb-2" />
                  <CardTitle>Hands-on Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Apply your knowledge with real-world projects and build your portfolio.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background text-foreground">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Popular Python Modules</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["NumPy", "Pandas", "Matplotlib", "TensorFlow", "Django", "Flask"].map((module) => (
                <Card key={module} className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>{module}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Learn how to use {module} in your Python projects.</p>
                    <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                      Explore {module}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Student Corner</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>Premade Projects</CardTitle>
                  <CardDescription>Ready-to-use Python projects for learning and inspiration</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Web Scraper</li>
                    <li>Todo List Application</li>
                    <li>Weather Forecast Tool</li>
                    <li>Simple Game Development</li>
                  </ul>
                  <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">View All Projects</Button>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>Practice Programs</CardTitle>
                  <CardDescription>Enhance your skills with these Python programs</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Data Structures Implementation</li>
                    <li>Algorithm Challenges</li>
                    <li>File Handling Exercises</li>
                    <li>Object-Oriented Programming Tasks</li>
                  </ul>
                  <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">Start Practicing</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}