import { Button } from "@/components/ui/button"

export default function VideoHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            Welcome to PythonForAll
          </h1>
          <p className="mx-auto max-w-[700px] text-lg sm:text-xl md:text-2xl mb-8">
            Learn Python programming from scratch, explore its powerful modules, and build amazing projects.
          </p>
          <div className="space-x-4">
          <a href="/yolo">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </a>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}