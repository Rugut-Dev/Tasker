'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Construction } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4 overflow-hidden">
      <div className="relative w-full max-w-2xl text-center space-y-12 mb-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-200 rounded-full opacity-20"
              style={{
                width: Math.random() * 100 + 20,
                height: Math.random() * 100 + 20,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                scale: [1, Math.random() + 0.5],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>

        {/* 404 Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-64 h-64 mx-auto"
        >
          <Image
            src="/404.png"
            alt="404 Illustration"
            layout="fill"
            className="object-contain"
          />
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Oops! Page Under Construction
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            We're working hard to bring you something amazing. Please check back soon!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Link href="/">
            <Button 
              variant="default" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto group transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <Home className="mr-2 h-4 w-4 group-hover:animate-pulse" />
              Back to Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto group transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:animate-bounce" />
            Go Back
          </Button>
        </motion.div>
      </div>

      {/* Under Construction Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex items-center justify-center bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-md"
      >
        <Construction className="mr-2 h-5 w-5 text-yellow-500 animate-spin" />
        <span className="text-gray-700 font-medium">
          This page is actively being developed
        </span>
      </motion.div>
    </div>
  );
}