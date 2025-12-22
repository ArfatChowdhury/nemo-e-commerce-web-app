'use client';

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateField, resetForm, fetchProducts, Product } from "../store/slices/productFormSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiEdit2, FiTrash2, FiUploadCloud, FiArrowLeft, FiCheckCircle, FiSearch, FiPackage } from "react-icons/fi";
import { categoriesList } from "@/lib/categoryData";

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

export default function EditProductClient() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { products, loading, error } = useAppSelector((state) => state.productForm);
    const formData = useAppSelector((state) => state.productForm);

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleInputChange = (field: any, value: any) => {
        dispatch(updateField({ field, value }));
    };

    const startEditing = (product: Product) => {
        setEditingProduct(product);
        dispatch(updateField({ field: "productName", value: product.productName }));
        dispatch(updateField({ field: "brandName", value: product.brandName }));
        dispatch(updateField({ field: "price", value: product.price.toString() }));
        dispatch(updateField({ field: "stock", value: product.stock.toString() }));
        dispatch(updateField({ field: "description", value: product.description }));
        dispatch(updateField({ field: "category", value: product.category }));
        dispatch(updateField({ field: "colors", value: product.colors }));
        dispatch(updateField({ field: "images", value: product.images }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEditing = () => {
        setEditingProduct(null);
        dispatch(resetForm());
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
            alert("Failed to upload images.");
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

    const handleDelete = async (productId: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const response = await fetch(`https://backend-of-nemo.vercel.app/products/${productId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Product deleted successfully!");
                dispatch(fetchProducts());
            } else {
                throw new Error("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;

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
                updatedAt: new Date().toISOString(),
            };

            const response = await fetch(`https://backend-of-nemo.vercel.app/products/${editingProduct._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                alert("Product updated successfully!");
                setEditingProduct(null);
                dispatch(resetForm());
                dispatch(fetchProducts());
            } else {
                throw new Error("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brandName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading && products.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <span className="loading loading-spinner loading-lg text-teal-600"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-20">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => editingProduct ? cancelEditing() : router.back()}
                        className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                    >
                        <FiArrowLeft size={20} className="mr-2" />
                        <span className="font-medium">{editingProduct ? "Cancel Editing" : "Back"}</span>
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">
                        {editingProduct ? `Editing: ${editingProduct.productName}` : "Manage Products"}
                    </h1>
                    <div className="w-20 flex justify-end">
                        {!editingProduct && (
                            <button onClick={() => dispatch(fetchProducts())} className="text-teal-600 hover:rotate-180 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-8">
                {editingProduct ? (
                    /* EDIT FORM VIEW */
                    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
                        {/* Basic Info */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-6">Product Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-bold">Product Name</span></label>
                                    <input type="text" className="input input-bordered bg-white focus:border-teal-500" value={formData.productName} onChange={(e) => handleInputChange("productName", e.target.value)} />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-bold">Brand Name</span></label>
                                    <input type="text" className="input input-bordered bg-white focus:border-teal-500" value={formData.brandName} onChange={(e) => handleInputChange("brandName", e.target.value)} />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-bold">Price ($)</span></label>
                                    <input type="number" step="0.01" className="input input-bordered bg-white focus:border-teal-500" value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-bold">Stock</span></label>
                                    <input type="number" className="input input-bordered bg-white focus:border-teal-500" value={formData.stock} onChange={(e) => handleInputChange("stock", e.target.value)} />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <label className="label"><span className="label-text font-bold">Description</span></label>
                                <textarea className="textarea textarea-bordered h-32 bg-white focus:border-teal-500" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)}></textarea>
                            </div>
                        </section>

                        {/* Category & Colors */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="label"><span className="label-text font-bold">Category</span></label>
                                    <div className="flex flex-wrap gap-2">
                                        {categoriesList.map((cat) => (
                                            <button key={cat} type="button" onClick={() => handleInputChange("category", cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.category === cat ? "bg-teal-600 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{cat}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="label"><span className="label-text font-bold">Colors</span></label>
                                    <div className="flex flex-wrap gap-3">
                                        {COLORS.map((color) => {
                                            const isSelected = formData.colors.find(c => c.value === color.value);
                                            return (
                                                <button key={color.value} type="button" onClick={() => toggleColor(color)} className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${isSelected ? "border-teal-600 scale-110 shadow-sm" : "border-gray-200"}`} style={{ backgroundColor: color.value, boxShadow: color.value === "#FFFFFF" ? "inset 0 0 0 1px rgba(0,0,0,0.1)" : "none" }}>
                                                    {isSelected && <FiCheckCircle className={color.value === "#FFFFFF" ? "text-gray-800" : "text-white"} size={20} />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Images */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-6">Images</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {formData.images.map((url, index) => (
                                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                                        <Image src={url} alt={`Product ${index}`} fill className="object-cover" />
                                        <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><FiTrash2 size={14} /></button>
                                    </div>
                                ))}
                                <label className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${uploadingImages ? "bg-gray-50 border-gray-300" : "hover:bg-teal-50 hover:border-teal-300 border-gray-300"}`}>
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImages} />
                                    {uploadingImages ? <span className="loading loading-spinner text-teal-600"></span> : <FiUploadCloud size={24} className="text-gray-400" />}
                                </label>
                            </div>
                        </section>

                        <div className="flex gap-4 justify-end">
                            <button type="button" onClick={cancelEditing} className="btn btn-ghost rounded-xl px-8">Cancel</button>
                            <button type="submit" disabled={isSubmitting || uploadingImages} className={`btn bg-teal-600 hover:bg-teal-700 text-white border-none rounded-xl px-12 shadow-lg ${isSubmitting ? "loading" : ""}`}>
                                {isSubmitting ? "Updating..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                ) : (
                    /* LIST VIEW */
                    <div className="space-y-6">
                        {/* Search & Stats */}
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="relative w-full md:w-96">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="input input-bordered w-full pl-12 rounded-xl bg-white focus:border-teal-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                                <span className="flex items-center"><FiPackage className="mr-2" /> {products.length} Total</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span>{filteredProducts.length} Found</span>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="relative aspect-[4/3] bg-gray-100">
                                        {product.images?.[0] ? (
                                            <Image
                                                src={product.images[0]}
                                                alt={product.productName}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <FiPackage size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-teal-600 shadow-sm">
                                            {product.category}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-800 truncate mb-1">{product.productName}</h3>
                                        <p className="text-xs text-gray-500 mb-3">{product.brandName}</p>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-lg font-black text-teal-600">${product.price}</span>
                                            <span className={`text-xs px-2 py-1 rounded-md font-bold ${product.stock > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                                                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => startEditing(product)}
                                                className="btn btn-sm bg-teal-50 text-teal-600 border-none hover:bg-teal-100 rounded-lg flex items-center justify-center"
                                            >
                                                <FiEdit2 size={14} className="mr-2" /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="btn btn-sm bg-red-50 text-red-600 border-none hover:bg-red-100 rounded-lg flex items-center justify-center"
                                            >
                                                <FiTrash2 size={14} className="mr-2" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                                <FiPackage size={64} className="mx-auto text-gray-200 mb-4" />
                                <h3 className="text-xl font-bold text-gray-400">No products found</h3>
                                <p className="text-gray-400 mt-2">Try adjusting your search or add new products.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
