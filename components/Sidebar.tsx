import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface Subtopic {
  id: string;
  title: string;
}

interface Section {
  id: string;
  title: string;
  subtopics?: Subtopic[];
}

interface SidebarProps {
  sections: Section[];
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export default function Sidebar({ sections, activeSection, scrollToSection }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256); // Default width
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const updateSidebarWidth = () => {
      if (contentRef.current) {
        const maxContentWidth = Math.max(
          ...Array.from(contentRef.current.querySelectorAll('button'))
            .map(button => button.scrollWidth)
        );
        setSidebarWidth(Math.max(256, maxContentWidth + 20)); // 20px for left and right padding
      }
    };

    updateSidebarWidth();
    window.addEventListener('resize', updateSidebarWidth);

    return () => window.removeEventListener('resize', updateSidebarWidth);
  }, [sections]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-[70px] left-[11px] z-50 md:hidden"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      )}

      <aside
        className={`
          ${isMobile
            ? `fixed inset-y-0 left-0 z-40 bg-background
               transform transition-transform duration-300 ease-in-out
               ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
            : 'sticky overflow-y-auto'
          }
          flex-shrink-0 pt-16 md:pt-20
        `}
        style={{
          width: `${sidebarWidth}px`,
          height: 'calc(100vh - 4rem)',
          top: '4rem',
        }}
      >
        <nav className={`h-full ${isMobile ? 'p-4' : 'p-4'}`}>
          <div ref={contentRef}>
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
                    className={`w-full justify-start text-base ${
                      activeSection === section.id ? "bg-primary/10 text-primary" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(section.id);
                      if (isMobile) setIsOpen(false);
                    }}
                  >
                    {section.title}
                  </Button>
                  {section.subtopics && (
                    <ul className="pl-4">
                      {section.subtopics.map((subtopic) => (
                        <li key={subtopic.id}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start text-sm ${
                              activeSection === subtopic.id ? "bg-primary/10 text-primary" : ""
                            }`}
                            onClick={() => {
                              scrollToSection(subtopic.id);
                              if (isMobile) setIsOpen(false);
                            }}
                          >
                            {subtopic.title}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </nav>
      </aside>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}