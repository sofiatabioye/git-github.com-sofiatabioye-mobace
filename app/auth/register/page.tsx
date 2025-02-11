"use client";
import RegisterController from './RegisterController';
import { RegisterProvider } from './RegisterContext';

export default function RegisterPage() {

  return (
    <RegisterProvider>
        <RegisterController />
    </RegisterProvider>
  )
  
}