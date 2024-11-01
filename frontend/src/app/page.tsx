import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="px-4 sm:px-6 py-4 flex justify-between items-center border-b bg-white/80 backdrop-blur-lg sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
            <Image
              src="/logo.png"
              alt="Tasker Logo"
              layout="fill"
              objectFit="contain"
              className="dark:invert"
            />
          </div>
          <span className="font-bold text-xl sm:text-2xl tracking-tight text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tasker</span>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hover:bg-blue-50 text-sm sm:text-base">Login</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base">Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Manage Tasks with Ease
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-md mx-auto lg:mx-0">
                Stay organized and boost your productivity with our simple yet powerful task management solution.
              </p>
              <div className="flex gap-4 flex-col sm:flex-row justify-center lg:justify-start">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="border-blue-200 hover:bg-blue-50 w-full">
                    Login to Your Account
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <Image
                src="/hero.avif"
                alt="Task Management"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Why Choose Tasker?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Easy to Use", description: "Intuitive interface for quick task management", icon: CheckCircle, color: "text-green-500" },
              { title: "Collaborative", description: "Share and assign tasks with your team effortlessly", icon: CheckCircle, color: "text-blue-500" },
              { title: "Customizable", description: "Tailor the app to fit your unique workflow needs", icon: CheckCircle, color: "text-purple-500" },
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <feature.icon className={`h-10 w-10 ${feature.color} mb-4`} />
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">What Our Users Say</h2>
            <Card className="bg-white/80 backdrop-blur-md shadow-xl border-none">
              <CardContent className="p-6 sm:p-10">
                <div className="flex items-center mb-6">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg sm:text-2xl text-gray-700 mb-6 sm:mb-8 italic">
                  "Tasker has revolutionized the way our team manages projects. It's intuitive, powerful, and has
                  significantly boosted our productivity."
                </p>
                <div className="flex items-center">
                  <Image
                    src="/jane.jpeg"
                    alt="User Avatar"
                    width={56}
                    height={56}
                    className="rounded-full mr-4 sm:mr-6"
                  />
                  <div>
                    <p className="font-semibold text-base sm:text-lg">Jane Doe</p>
                    <p className="text-gray-500 text-sm sm:text-base">Project Manager, Tech Co.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-12">
          {[
            { title: "Product", links: ["Features", "Pricing", "Integrations"] },
            { title: "Company", links: ["About Us", "Careers", "Contact"] },
            { title: "Resources", links: ["Blog", "Help Center", "Community"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
          ].map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-gray-800">{section.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-8 border-t text-center text-gray-500 text-sm">
          <p>© 2024 Tasker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}