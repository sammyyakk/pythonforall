import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
  sections: { id: string; title: string }[]
  activeSection: string
  scrollToSection: (sectionId: string) => void
}

export default function Sidebar({ sections, activeSection, scrollToSection }: SidebarProps) {
  return (
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
  )
}