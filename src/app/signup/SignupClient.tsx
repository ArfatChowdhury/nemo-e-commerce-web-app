'use client'

import React, { useState, Suspense } from "react"
import { useAuth } from "../context/authContext"
import { FiMail, FiLock, FiArrowRight, FiCheckCircle, FiAlertCircle, FiUser } from "react-icons/fi"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

function SignupContent() {
    const { createUser } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectPath = searchParams.get('redirect') || "/"

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            setLoading(false)
            return
        }

        try {
            await createUser(email, password, name)
            setSuccess(true)

            setTimeout(() => {
                router.push(redirectPath)
            }, 1500)
        } catch (err: any) {
            console.error("Auth Error:", err.code, err.message)
            if (err.code === 'auth/email-already-in-use') {
                setError("Email is already registered. Please login instead.")
            } else if (err.code === 'auth/invalid-email') {
                setError("Invalid email address.")
            } else if (err.code === 'auth/weak-password') {
                setError("Password is too weak.")
            } else {
                setError("Something went wrong. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center p-6 relative overflow-hidden">

            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-emerald-200/40 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-teal-900 tracking-tight flex items-center justify-center gap-2">
                        <span className="bg-teal-600 text-white p-2 rounded-xl">N</span>
                        Nemo Squad
                    </h1>
                    <p className="text-teal-700/70 font-medium mt-2">Join us! Create your account today</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-teal-900/10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-teal-500 pl-4">Sign Up</h2>

                    {success ? (
                        <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border-4 border-white shadow-lg">
                                <FiCheckCircle />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h3>
                            <p className="text-gray-500 font-medium">Redirecting you to the home page...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm font-medium flex items-center gap-3 animate-shake">
                                    <FiAlertCircle className="text-lg flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                                <div className="relative group">
                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        className="w-full bg-white border-2 border-gray-50 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-teal-400 transition-all text-gray-800 font-medium placeholder:text-gray-300 shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                                <div className="relative group">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="john@example.com"
                                        className="w-full bg-white border-2 border-gray-50 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-teal-400 transition-all text-gray-800 font-medium placeholder:text-gray-300 shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                                <div className="relative group">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full bg-white border-2 border-gray-50 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-teal-400 transition-all text-gray-800 font-medium placeholder:text-gray-300 shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Confirm Password</label>
                                <div className="relative group">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        placeholder="••••••••"
                                        className="w-full bg-white border-2 border-gray-50 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-teal-400 transition-all text-gray-800 font-medium placeholder:text-gray-300 shadow-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white font-black py-5 rounded-2xl shadow-xl shadow-teal-900/20 transition-all duration-300 flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {!success && (
                        <div className="mt-8 text-center bg-gray-50/50 p-4 rounded-2xl">
                            <p className="text-sm text-gray-500 font-medium">
                                Already have an account?{" "}
                                <Link href={`/login${redirectPath !== '/' ? `?redirect=${redirectPath}` : ''}`} className="text-teal-600 font-bold hover:text-teal-700 ml-1 underline underline-offset-4 decoration-teal-200">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center text-teal-900/40 text-xs font-bold uppercase tracking-widest">
                    Run Like Nemo &copy; 2025
                </div>
            </div>
        </div>
    )
}

export default function SignupClient() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <SignupContent />
        </Suspense>
    )
}
