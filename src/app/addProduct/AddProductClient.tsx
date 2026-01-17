'use client';

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateField, resetForm, fetchProducts } from "../store/slices/productFormSlice";
import type { ProductFormState, ColorOption } from "../store/slices/productFormSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiPlus, FiTrash2, FiUploadCloud, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { categoriesList } from "@/lib/categoryData";
import { toast } from "react-hot-toast";

const COLORS = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Green", value: "#00FF00" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Gray", value: "#808080" },
    { name: "Pink", value: "#FFC0CB" },
];

export default function AddProductClient() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const formData = useAppSelector((state) => state.productForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);

    useEffect(() => {
        dispatch(resetForm());
    }, [dispatch]);

    const handleInputChange = <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => {
        dispatch(updateField({ field, value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setUploadingImages(true);
        const uploadedUrls: string[] = [...formData.images];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const data = new FormData();
                data.append("image", file);

                const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
                    method: "POST",
                    body: data,
                });

                const json = await res.json();
                if (json.success) {
                    uploadedUrls.push(json.data.display_url);
                }
            }
            handleInputChange("images", uploadedUrls);
        } catch (error) {
            console.error("Image upload failed:", error);
            toast.error("Failed to upload images. Please try again.");
        } finally {
            setUploadingImages(false);
        }
    };

    const removeImage = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        handleInputChange("images", newImages);
    };

    const toggleColor = (color: { name: string; value: string }) => {
        const exists = formData.colors.find((c) => c.value === color.value);
        if (exists) {
            handleInputChange("colors", formData.colors.filter((c) => c.value !== color.value));
        } else {
            handleInputChange("colors", [...formData.colors, color]);
        }
    };

    const validateForm = () => {
        if (!formData.productName.trim()) return "Product name is required";
        if (!formData.brandName.trim()) return "Brand name is required";
        if (!formData.price || isNaN(Number(formData.price))) return "Valid price is required";
        if (!formData.stock || isNaN(Number(formData.stock))) return "Valid stock is required";
        if (!formData.category) return "Category is required";
        if (formData.images.length === 0) return "At least one image is required";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            toast.error(error);
            return;
        }

        setIsSubmitting(true);
        try {
            const productData = {
                productName: formData.productName,
                price: Number(formData.price),
                description: formData.description,
                brandName: formData.brandName,
                stock: Number(formData.stock),
                colors: formData.colors,
                category: formData.category,
                images: formData.images,
                createdAt: new Date().toISOString(),
            };

            const response = await fetch("https://backend-of-nemo.vercel.app/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                toast.success("Product added successfully!");
                dispatch(resetForm());
                dispatch(fetchProducts());
                router.push("/admindashboard");
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add product");
            }
        } catch (error: unknown) {
            console.error("Error adding product:", error);
            const errorMessage = error instanceof Error ? error.message : "An error occurred while adding the product.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-slate-600 hover:text-teal-600 transition-all hover:-translate-x-1"
                    >
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mr-3 border border-slate-200">
                            <FiArrowLeft size={18} />
                        </div>
                        <span className="font-semibold">Back to Dashboard</span>
                    </button>
                    <div className="text-center">
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">New Product</h1>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">CREATE A NEW LISTING FOR YOUR STORE</p>
                    </div>
                    <div className="w-10"></div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 mt-12">
                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Basic Information */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border-2 border-slate-200 relative overflow-hidden group hover:border-teal-500/30 transition-all duration-500">
                        <div className="absolute top-0 left-0 w-2 h-full bg-teal-500"></div>
                        <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center">
                            <span className="w-10 h-10 bg-teal-500 text-white rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-teal-500/30 rotate-3 group-hover:rotate-0 transition-transform">
                                <FiPlus size={20} />
                            </span>
                            Basic Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="form-control w-full">
                                <label className="label mb-1">
                                    <span className="label-text font-black text-slate-700 uppercase tracking-wider text-[11px]">Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Wireless Headphones"
                                    className="input input-lg border-2 border-slate-200 w-full bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all rounded-2xl placeholder:text-slate-400 font-medium"
                                    value={formData.productName}
                                    onChange={(e) => handleInputChange("productName", e.target.value)}
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label mb-1">
                                    <span className="label-text font-black text-slate-700 uppercase tracking-wider text-[11px]">Brand Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Sony"
                                    className="input input-lg border-2 border-slate-200 w-full bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all rounded-2xl placeholder:text-slate-400 font-medium"
                                    value={formData.brandName}
                                    onChange={(e) => handleInputChange("brandName", e.target.value)}
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label mb-1">
                                    <span className="label-text font-black text-slate-700 uppercase tracking-wider text-[11px]">Price ($)</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        className="input input-lg pl-10 border-2 border-slate-200 w-full bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all rounded-2xl font-black text-teal-600"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange("price", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-control w-full">
                                <label className="label mb-1">
                                    <span className="label-text font-black text-slate-700 uppercase tracking-wider text-[11px]">Stock Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="input input-lg border-2 border-slate-200 w-full bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all rounded-2xl font-bold text-slate-700"
                                    value={formData.stock}
                                    onChange={(e) => handleInputChange("stock", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full mt-10">
                            <label className="mb-3 px-1">
                                <span className="text-[11px] font-black text-slate-700 uppercase tracking-[0.2em]">Detailed Description</span>
                            </label>
                            <textarea
                                className="textarea w-full border-2 border-slate-200 h-48 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all rounded-[2.5rem] p-8 text-slate-700 font-medium placeholder:text-slate-400 leading-relaxed resize-none"
                                placeholder="Describe the product features, specifications, etc."
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                            ></textarea>
                        </div>
                    </section>

                    {/* Category & Colors */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border-2 border-slate-200 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
                        <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
                        <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center">
                            <span className="w-10 h-10 bg-purple-500 text-white rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-purple-500/30 -rotate-3 group-hover:rotate-0 transition-transform">
                                <FiCheckCircle size={20} />
                            </span>
                            Category & Style
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <label className="label mb-3">
                                    <span className="label-text font-black text-slate-700 uppercase tracking-wider text-[11px]">Target Category</span>
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {categoriesList.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => handleInputChange("category", cat)}
                                            className={`px-5 py-2.5 rounded-2xl text-[13px] font-bold transition-all border-2 ${formData.category === cat
                                                ? "bg-slate-800 border-slate-800 text-white shadow-xl shadow-slate-800/30 -translate-y-1"
                                                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="label mb-3">
                                    <span className="label-text font-black text-slate-700 uppercase tracking-wider text-[11px]">Color Palette</span>
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    {COLORS.map((color) => {
                                        const isSelected = formData.colors.find(c => c.value === color.value);
                                        return (
                                            <button
                                                key={color.value}
                                                type="button"
                                                onClick={() => toggleColor(color)}
                                                className={`w-12 h-12 rounded-2xl border-4 transition-all flex items-center justify-center relative overflow-hidden group/color ${isSelected 
                                                    ? "border-purple-500 scale-110 shadow-lg shadow-purple-500/20" 
                                                    : "border-slate-100 hover:border-slate-300"
                                                }`}
                                                style={{ backgroundColor: color.value }}
                                                title={color.name}
                                            >
                                                {color.value === "#FFFFFF" && <div className="absolute inset-0 border border-slate-100 rounded-xl pointer-events-none"></div>}
                                                {isSelected && (
                                                    <div className={`w-full h-full flex items-center justify-center backdrop-blur-[2px] ${color.value === "#FFFFFF" ? "bg-slate-800/10" : "bg-white/20"}`}>
                                                        <FiCheckCircle
                                                            className={color.value === "#FFFFFF" ? "text-slate-800" : "text-white"}
                                                            size={24}
                                                        />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-white opacity-0 group-hover/color:opacity-20 transition-opacity"></div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Images */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border-2 border-slate-200 relative overflow-hidden group hover:border-orange-500/30 transition-all duration-500">
                        <div className="absolute top-0 left-0 w-2 h-full bg-orange-500"></div>
                        <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center">
                            <span className="w-10 h-10 bg-orange-500 text-white rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-orange-500/30 rotate-6 group-hover:rotate-0 transition-transform">
                                <FiUploadCloud size={20} />
                            </span>
                            Product Gallery
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {formData.images.map((url, index) => (
                                <div key={index} className="relative aspect-square rounded-[2rem] overflow-hidden border-2 border-slate-100 group/img hover:border-orange-500/50 transition-all shadow-md">
                                    <Image
                                        src={url}
                                        alt={`Product ${index}`}
                                        fill
                                        className="object-cover group-hover/img:scale-110 transition-transform duration-700"
                                    />
                                    {index === 0 && (
                                        <div className="absolute bottom-3 left-3 bg-orange-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                            Primary
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur text-red-500 rounded-2xl opacity-0 group-hover/img:opacity-100 transition-all shadow-xl hover:bg-red-500 hover:text-white"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            ))}

                            <label className={`aspect-square rounded-[2rem] border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${uploadingImages 
                                ? "bg-slate-50 border-slate-200 cursor-not-allowed" 
                                : "hover:bg-orange-50 hover:border-orange-500/50 border-slate-200"
                                }`}>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    disabled={uploadingImages}
                                />
                                {uploadingImages ? (
                                    <div className="flex flex-col items-center">
                                        <span className="loading loading-spinner loading-lg text-orange-500"></span>
                                        <span className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-widest">Processing...</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <FiPlus size={28} className="text-slate-400" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Add Media</span>
                                    </>
                                )}
                            </label>
                        </div>
                        <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest flex items-center">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></span>
                                The first image uploaded will be used as the product cover.
                            </p>
                        </div>
                    </section>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-8">
                        <button
                            type="submit"
                            disabled={isSubmitting || uploadingImages}
                            className={`btn btn-lg h-20 px-16 bg-slate-900 hover:bg-black text-white border-none rounded-[2rem] shadow-2xl shadow-slate-900/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-4 disabled:bg-slate-300 disabled:text-slate-500`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner loading-md"></span>
                                    <span className="text-lg font-black uppercase tracking-widest">Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-lg font-black uppercase tracking-widest">Publish Product</span>
                                    <FiCheckCircle size={24} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
