"use client"

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

interface Subtopic {
  id: string;
  title: string;
}

interface Section {
  id: string;
  title: string;
  subtopics?: Subtopic[];
}

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    setMounted(true);

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  const sections: Section[] = [
    { id: "introduction", title: "Introduction to the Topic" },
    {
      id: "subtopic1",
      title: "Subtopic 1: Overview",
      subtopics: [
        { id: "subtopic1-1", title: "Overview Point 1" },
        { id: "subtopic1-2", title: "Overview Point 2" },
      ],
    },
    {
      id: "subtopic2",
      title: "Subtopic 2: Details",
      subtopics: [
        { id: "subtopic2-1", title: "Detail Point 1" },
        { id: "subtopic2-2", title: "Detail Point 2" },
      ],
    },
    {
      id: "subtopic3",
      title: "Subtopic 3: Applications",
      subtopics: [
        { id: "subtopic3-1", title: "Application Point 1" },
        { id: "subtopic3-2", title: "Application Point 2" },
      ],
    },
    { id: "conclusion", title: "Conclusion and Summary" },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const navHeight = 64; // Adjust this value according to your navbar height
      const offsetTop = section.getBoundingClientRect().top + (window.scrollY - 10) - navHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6 py-8">
          <Sidebar sections={sections} activeSection={activeSection} scrollToSection={scrollToSection} />
          <main className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 py-4">
                Sample Topic
              </h1>

              {/* Image Placeholder */}
              <div className="w-full max-w-xs mx-auto mb-8 bg-gray-300 aspect-square flex items-center justify-center">
                <span className="text-gray-600">Image Placeholder</span>
              </div>

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
                    {section.id === "introduction" && (
                      <p className="leading-7">
                        This is an introduction to the sample topic. It provides an overview of the subject matter and sets the stage for the subsequent sections.
                      </p>
                    )}
                    {section.id === "subtopic1" && (
                      <>
                        <p className="leading-7 mb-4">
                          Subtopic 1 covers the basic concepts and foundational information needed to understand the topic.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Point 1: Explanation of the first point.</li>
                          <li>Point 2: Details about the second point.</li>
                          <li>Point 3: Insights into the third point.</li>
                        </ul>
                        {section.subtopics && (
                          <ul className="list-disc pl-6 space-y-2">
                            {section.subtopics.map((subtopic) => (
                              <li key={subtopic.id}>
                                <section
                                  key={subtopic.id}
                                  id={subtopic.id}
                                  ref={(el) => { sectionRefs.current[subtopic.id] = el; }}
                                  className="mb-12"
                                >
                                  <h3 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                                    {subtopic.title}
                                  </h3>
                                  <div className="mt-4">
                                    <p className="leading-7">
                                      This is the content for {subtopic.title}.
                                    </p>
                                  </div>
                                </section>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                    {section.id === "subtopic2" && (
                      <>
                        <p className="leading-7 mb-4">
                          Subtopic 2 dives deeper into the details, exploring more complex aspects of the topic.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Aspect 1: Analysis of the first aspect.</li>
                          <li>Aspect 2: Examination of the second aspect.</li>
                          <li>Aspect 3: Discussion of the third aspect.</li>
                        </ul>
                        {section.subtopics && (
                          <ul className="list-disc pl-6 space-y-2">
                            {section.subtopics.map((subtopic) => (
                              <li key={subtopic.id}>
                                <section
                                  key={subtopic.id}
                                  id={subtopic.id}
                                  ref={(el) => { sectionRefs.current[subtopic.id] = el; }}
                                  className="mb-12"
                                >
                                  <h3 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                                    {subtopic.title}
                                  </h3>
                                  <div className="mt-4">
                                    <p className="leading-7">
                                      This is the content for {subtopic.title}.
                                    </p>
                                  </div>
                                </section>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                    {section.id === "subtopic3" && (
                      <>
                        <p className="leading-7 mb-4">
                          Subtopic 3 focuses on the practical applications and real-world implications of the topic.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Application 1: Example of the first application.</li>
                          <li>Application 2: Case study of the second application.</li>
                          <li>Application 3: Exploration of the third application.</li>
                        </ul>
                        {section.subtopics && (
                          <ul className="list-disc pl-6 space-y-2">
                            {section.subtopics.map((subtopic) => (
                              <li key={subtopic.id}>
                                <section
                                  key={subtopic.id}
                                  id={subtopic.id}
                                  ref={(el) => { sectionRefs.current[subtopic.id] = el; }}
                                  className="mb-12"
                                >
                                  <h3 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                                    {subtopic.title}
                                  </h3>
                                  <div className="mt-4">
                                    <p className="leading-7">
                                      This is the content for {subtopic.title}.
                                    </p>
                                  </div>
                                </section>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                    {section.id === "conclusion" && (
                      <p className="leading-7">
                        In conclusion, this topic has been thoroughly explored, covering its introduction, subtopics, and applications. This summary provides a concise overview of the key takeaways.
                      </p>
                    )}
                  </div>
                </section>
              ))}
            </motion.div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}