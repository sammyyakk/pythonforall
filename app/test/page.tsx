"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun, FileCode } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Page() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({}) // Updated typing here

  useEffect(() => {
    setMounted(true)

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }
    
    const observer = new IntersectionObserver(observerCallback, observerOptions)

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const sections = [
    { id: "overview", title: "Overview of YOLO" },
    { id: "features", title: "Key Features of YOLOv8" },
    { id: "applications", title: "Practical Applications of YOLOv8" },
    { id: "getting-started", title: "Getting Started with YOLOv8" },
    { id: "advanced-features", title: "Advanced Features of YOLOv8" },
    { id: "tips", title: "Tips for Beginners" },
    { id: "troubleshooting", title: "Troubleshooting Common Issues" },
    { id: "resources", title: "Additional Resources" },
  ]

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const navHeight = 64; // Adjust this value according to your navbar height
      const offsetTop = section.getBoundingClientRect().top + (window.scrollY - 10) - navHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  }
  

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link className="flex items-center justify-center" href="/">
            <FileCode className="h-6 w-6" />
            <span className="ml-2 text-lg font-bold">PythonForAll</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Home
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Modules
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Student Corner
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              About
            </Link>
          </nav>
          <Button variant="ghost" size="icon" className="ml-4" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>
      <div className="flex-1 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6 py-8">
          <aside className="md:w-64 flex-shrink-0">
            <nav className="sticky top-24">
              <AnimatePresence>
                {sections.map((section) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        activeSection === section.id ? "bg-primary/10 text-primary" : ""
                      }`}
                      onClick={() => scrollToSection(section.id)}
                    >
                      {section.title}
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </nav>
          </aside>
          <main className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
                Ultralytics YOLO
              </h1>

              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(el) => { sectionRefs.current[section.id] = el; }}
                  className="mb-12"
                >
                  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {section.title}
                  </h2>
                  <div className="mt-4">
                    {section.id === "overview" && (
                      <p className="leading-7">
                        YOLO (You Only Look Once) is a high-performance object detection and image segmentation model developed by Joseph Redmon and Ali Farhadi at the University of Washington. Since its inception in 2015, YOLO has been celebrated for its ability to deliver high-speed, accurate results by processing an entire image in a single pass through a neural network. It remains one of the fastest object detection algorithms available.
                      </p>
                    )}
                    {section.id === "features" && (
                      <>
                        <p className="leading-7 mb-4">
                          Ultralytics YOLOv8 is the latest version in the YOLO series, offering enhancements that improve performance, flexibility, and efficiency. YOLOv8 supports various vision AI tasks, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Detection: Identifying objects in images.</li>
                          <li>Segmentation: Dividing images into meaningful segments.</li>
                          <li>Pose Estimation: Determining human poses.</li>
                          <li>Tracking: Following objects across frames in videos.</li>
                          <li>Classification: Categorizing detected objects.</li>
                        </ul>
                        <p className="leading-7 mt-4">
                          YOLOv8 is designed to be highly efficient and can be deployed on both edge devices and cloud APIs.
                        </p>
                      </>
                    )}
                    {section.id === "applications" && (
                      <>
                        <p className="leading-7 mb-4">
                          YOLOv8 has broad applications across multiple fields, such as:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Autonomous Vehicles: Real-time detection of pedestrians, vehicles, and obstacles.</li>
                          <li>Surveillance Systems: Monitoring public spaces and identifying suspicious activities.</li>
                          <li>Healthcare: Analyzing medical images for disease detection.</li>
                          <li>Retail Analytics: Customer behavior tracking and inventory management.</li>
                          <li>Augmented Reality: Enhancing user experiences with real-time object recognition.</li>
                        </ul>
                      </>
                    )}
                    {section.id === "getting-started" && (
                      <>
                        <h3 className="text-2xl font-semibold mb-4">Installation</h3>
                        <p className="leading-7 mb-4">
                          To get started with YOLOv8, install the Ultralytics package with pip:
                        </p>
                        <pre className="bg-secondary/10 p-4 rounded-lg overflow-x-auto">
                          <code>pip install ultralytics</code>
                        </pre>
                        <h3 className="text-2xl font-semibold mt-8 mb-4">Using the Ultralytics CLI</h3>
                        <p className="leading-7 mb-4">
                          The CLI provides an easy way to interact with YOLO models. The basic structure for commands is:
                        </p>
                        <pre className="bg-secondary/10 p-4 rounded-lg overflow-x-auto">
                          <code>yolo TASK MODE ARGS</code>
                        </pre>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                          <li>TASK (optional): Choose from detect, segment, classify, pose, or obb.</li>
                          <li>MODE (required): Options include train, val, predict, export, track, or benchmark.</li>
                          <li>ARGS (optional): Additional arguments like imgsz=640.</li>
                        </ul>
                        <h3 className="text-2xl font-semibold mt-8 mb-4">Python Interface</h3>
                        <p className="leading-7 mb-4">
                          For those preferring Python, here&apos;s an example:
                        </p>
                        <pre className="bg-secondary/10 p-4 rounded-lg overflow-x-auto">
                          <code>{`from ultralytics import YOLO
model = YOLO('yolov8n.pt')
results = model("https://ultralytics.com/images/bus.jpg")
results.show()`}</code>
                        </pre>
                      </>
                    )}
                    {section.id === "advanced-features" && (
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Model Customization: Fine-tune pre-trained models with custom datasets.</li>
                        <li>Multi-Scale Predictions: Effective detection of objects at various scales.</li>
                        <li>Real-Time Processing: Ideal for video streams with minimal latency.</li>
                      </ul>
                    )}
                    {section.id === "tips" && (
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Use Pre-Trained Models: Start with pre-trained models to become familiar with the framework.</li>
                        <li>Experiment with Tasks: Explore different tasks (detection, segmentation, etc.).</li>
                        <li>Leverage Online Resources: Utilize tutorials, forums, and documentation for troubleshooting.</li>
                      </ul>
                    )}
                    {section.id === "troubleshooting" && (
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Installation Errors: Ensure you have Python 3.7+ and an updated pip.</li>
                        <li>Model Loading Issues: Verify file paths and memory availability.</li>
                        <li>Performance Problems: Consider smaller models, hardware optimizations, or cloud solutions.</li>
                      </ul>
                    )}
                    {section.id === "resources" && (
                      <p className="leading-7">
                        Explore Ultralytics Documentation for comprehensive guides on installation, training, and advanced features.
                      </p>
                    )}
                  </div>
                </section>
              ))}

            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}
