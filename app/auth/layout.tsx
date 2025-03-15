'use client'
import Image from 'next/image';

import { ReactNode } from 'react';
import AuthProvider from '../providers/AuthProvider';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  return (
    <AuthProvider>
      <div className="relative w-full h-screen flex items-center justify-center bg-[#292929] text-white overflow-hidden">
        {/* Background Images */}
        <div className="absolute top-0 left-0 w-full h-1/2">
        <Image 
          src="/bgGridTop.png" 
          alt="Grid Background Top"
          layout="fill"
          objectFit="cover"
        />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2">
        <Image 
          src="/bgGridBottom.png" 
          alt="Grid Background Bottom"
          layout="fill"
          objectFit="cover"
        />
        </div>
        {/* Logo */}
        <div className="absolute top-4 left-8 bg-[#252525] p-4 rounded-2xl  text-white text-xl font-bold">Mobace</div>
        
          {children}

      </div>
    </AuthProvider>
  );
}