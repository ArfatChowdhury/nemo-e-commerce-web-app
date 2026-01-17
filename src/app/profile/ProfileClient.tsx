'use client';

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiEdit2, FiCamera } from "react-icons/fi";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";

export default function ProfileClient() {
    const { user, userData, loading: authLoading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        displayName: "",
        phoneNumber: "",
        address: "",
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                displayName: userData.displayName || user?.displayName || "",
                phoneNumber: userData.phoneNumber || "",
                address: userData.address || "",
            });
        }
    }, [userData, user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);

        const updateAction = async () => {
            // Update Firebase Auth Profile
            await updateProfile(user, { displayName: formData.displayName });

            // Update Firestore Document
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: formData.displayName,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                updatedAt: serverTimestamp(),
            }, { merge: true });

            setIsEditing(false);
            return "Profile updated successfully!";
        };

        toast.promise(updateAction(), {
            loading: 'Saving changes...',
            success: (msg) => msg,
            error: (err) => err instanceof Error ? err.message : "Failed to update profile.",
        }, {
            style: {
                borderRadius: '1rem',
                background: '#333',
                color: '#fff',
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
                    <a href="/login" className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 transition-colors">
                        Go to Login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-teal-900/5 overflow-hidden border border-gray-100">
                    {/* Header/Banner */}
                    <div className="h-48 bg-gradient-to-r from-teal-500 to-emerald-500 relative">
                        <div className="absolute -bottom-16 left-12">
                            <div className="relative group">
                                <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center text-4xl font-black text-teal-600 shadow-2xl border-4 border-white overflow-hidden">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        formData.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()
                                    )}
                                </div>
                                <button className="absolute bottom-2 right-2 p-2 bg-teal-600 text-white rounded-xl shadow-lg hover:bg-teal-700 transition-colors">
                                    <FiCamera />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 pb-12 px-12">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900">{formData.displayName || "User Profile"}</h1>
                                <p className="text-gray-500 font-medium">{user.email}</p>
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 bg-teal-50 text-teal-700 px-6 py-3 rounded-2xl font-bold hover:bg-teal-100 transition-all"
                                >
                                    <FiEdit2 /> Edit Profile
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                                <div className="relative group">
                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-teal-400 disabled:opacity-60 transition-all text-gray-800 font-medium"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                                <div className="relative group">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        value={user.email || ""}
                                        disabled
                                        className="w-full bg-gray-100 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 outline-none opacity-60 text-gray-500 font-medium"
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 ml-1 uppercase tracking-widest font-bold">Email cannot be changed</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                                <div className="relative group">
                                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-teal-400 disabled:opacity-60 transition-all text-gray-800 font-medium"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Shipping Address</label>
                                <div className="relative group">
                                    <FiMapPin className="absolute left-4 top-6 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        rows={3}
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-teal-400 disabled:opacity-60 transition-all text-gray-800 font-medium resize-none"
                                        placeholder="123 Street Name, City, Country"
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="md:col-span-2 flex gap-4 mt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-teal-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-teal-900/20 hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <FiSave /> Save Changes
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
