'use client';

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateField, resetForm, fetchProducts } from "../store/slices/productFormSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiPlus, FiTrash2, FiUploadCloud, FiArrowLeft, FiCheckCircle } from "react-icons/fi";

const CATEGORIES = ["Electronics", "Clothing", "Home & Kitchen", "Beauty", "Sports", "Books", "Other"];
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

export default function AddProduct() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const formData = useAppSelector((state) => state.productForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);

    useEffect(() => {
        dispatch(resetForm());
    }, [dispatch]);

    const handleInputChange = (field: any, value: any) => {
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

                // Using the key provided by the user. 
                const res = await fetch(`https://api.imgbb.com/1/upload?key=f29449e712111ed5e49dbc6e43c00d09`, {
                    method: "POST",
                    body: data,
                });

                const json = await res.json();
                if (json.success) {
                    uploadedUrls.push(json.data.url);
                }
            }
            handleInputChange("images", uploadedUrls);
        } catch (error) {
            console.error("Image upload failed:", error);
            alert("Failed to upload images. Please try again.");
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
            alert(error);
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
                alert("Product added successfully!");
                dispatch(resetForm());
                dispatch(fetchProducts());
                router.push("/admindashboard");
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add product");
            }
        } catch (error: any) {
            console.error("Error adding product:", error);
            alert(error.message || "An error occurred while adding the product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                    >
                        <FiArrowLeft size={20} className="mr-2" />
                        <span className="font-medium">Back</span>
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Add New Product</h1>
                    <div className="w-20"></div> {/* Spacer */}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 mt-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                            <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mr-3 text-sm">1</span>
                            Basic Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-700">Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Wireless Headphones"
                                    className="input input-bordered w-full focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                    value={formData.productName}
                                    onChange={(e) => handleInputChange("productName", e.target.value)}
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-700">Brand Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Sony"
                                    className="input input-bordered w-full focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                    value={formData.brandName}
                                    onChange={(e) => handleInputChange("brandName", e.target.value)}
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-700">Price ($)</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    step="0.01"
                                    className="input input-bordered w-full focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange("price", e.target.value)}
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-700">Stock Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="input input-bordered w-full focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                    value={formData.stock}
                                    onChange={(e) => handleInputChange("stock", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label">
                                <span className="label-text font-bold text-gray-700">Description</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-32 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                placeholder="Describe the product features, specifications, etc."
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                            ></textarea>
                        </div>
                    </section>

                    {/* Category & Colors */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                            <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm">2</span>
                            Category & Attributes
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="label">
                                    <span className="label-text font-bold text-gray-700">Category</span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => handleInputChange("category", cat)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.category === cat
                                                ? "bg-teal-600 text-white shadow-md"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-bold text-gray-700">Available Colors</span>
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {COLORS.map((color) => {
                                        const isSelected = formData.colors.find(c => c.value === color.value);
                                        return (
                                            <button
                                                key={color.value}
                                                type="button"
                                                onClick={() => toggleColor(color)}
                                                className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${isSelected ? "border-teal-600 scale-110 shadow-sm" : "border-transparent"
                                                    }`}
                                                style={{ backgroundColor: color.value }}
                                                title={color.name}
                                            >
                                                {isSelected && (
                                                    <FiCheckCircle
                                                        className={color.value === "#FFFFFF" ? "text-gray-800" : "text-white"}
                                                        size={20}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Images */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                            <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mr-3 text-sm">3</span>
                            Product Images
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {formData.images.map((url, index) => (
                                <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                                    <Image
                                        src={url}
                                        alt={`Product ${index}`}
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                    >
                                        <FiTrash2 size={14} />
                                    </button>
                                </div>
                            ))}

                            <label className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${uploadingImages ? "bg-gray-50 border-gray-300" : "hover:bg-teal-50 hover:border-teal-300 border-gray-300"
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
                                        <span className="loading loading-spinner loading-md text-teal-600"></span>
                                        <span className="text-xs text-gray-500 mt-2">Uploading...</span>
                                    </div>
                                ) : (
                                    <>
                                        <FiUploadCloud size={24} className="text-gray-400 mb-2" />
                                        <span className="text-xs font-medium text-gray-500">Add Image</span>
                                    </>
                                )}
                            </label>
                        </div>
                        <p className="text-xs text-gray-400 mt-4 italic">
                            * First image will be used as the primary product thumbnail.
                        </p>
                    </section>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || uploadingImages}
                            className={`btn btn-lg bg-teal-600 hover:bg-teal-700 text-white border-none rounded-xl px-12 shadow-xl transition-all hover:scale-105 active:scale-95 ${isSubmitting ? "loading" : ""
                                }`}
                        >
                            {isSubmitting ? "Creating Product..." : "Publish Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}