'use client';

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateField, resetForm, fetchProducts, Product, ProductFormState } from "../store/slices/productFormSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiEdit2, FiTrash2, FiUploadCloud, FiArrowLeft, FiCheckCircle, FiSearch, FiPackage, FiPlus } from "react-icons/fi";
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

    const handleInputChange = <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => {
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
        } catch (error: unknown) {
            console.error("Image upload failed:", error);
            toast.error("Failed to upload images.");
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
        const deleteAction = async () => {
            const response = await fetch(`https://backend-of-nemo.vercel.app/products/${productId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to delete product");
            }

            dispatch(fetchProducts());
            return "Product removed from inventory";
        };

        toast.promise(deleteAction(), {
            loading: 'Deleting product...',
            success: (msg) => msg,
            error: (err) => err instanceof Error ? err.message : "Could not delete product",
        }, {
            style: {
                borderRadius: '1.5rem',
                background: '#1e293b',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '14px',
                padding: '16px 24px',
            },
            success: {
                icon: <div className="bg-green-500 p-1.5 rounded-lg"><FiCheckCircle className="text-white" size={16} /></div>,
            },
            error: {
                icon: <div className="bg-red-500 p-1.5 rounded-lg"><FiTrash2 className="text-white" size={16} /></div>,
            },
        });
    };

    const confirmDelete = (productId: string) => {
        toast((t) => (
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-[1.25rem] flex items-center justify-center shadow-inner">
                        <FiTrash2 size={24} />
                    </div>
                    <div>
                        <p className="font-black text-slate-800 uppercase tracking-tight text-sm">Delete Product?</p>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[200px]">
                            This action is permanent. The product will be removed from your catalog.
                        </p>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-1">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            handleDelete(productId);
                        }}
                        className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest bg-red-500 text-white hover:bg-red-600 rounded-2xl shadow-xl shadow-red-500/20 transition-all hover:scale-105 active:scale-95"
                    >
                        Confirm Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 6000,
            position: 'top-center',
            style: {
                minWidth: '380px',
                borderRadius: '2rem',
                border: '2px solid #fee2e2',
                padding: '1.5rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            }
        });
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
                toast.success("Product updated successfully!");
                setEditingProduct(null);
                dispatch(resetForm());
                dispatch(fetchProducts());
            } else {
                throw new Error("Failed to update product");
            }
        } catch (error: unknown) {
            console.error("Error updating product:", error);
            const errorMessage = error instanceof Error ? error.message : "Failed to update product.";
            toast.error(errorMessage);
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
        <div className="min-h-screen bg-[#f8fafc] pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
                    <button
                        onClick={() => editingProduct ? cancelEditing() : router.back()}
                        className="flex items-center text-slate-600 hover:text-teal-600 transition-all hover:-translate-x-1"
                    >
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mr-3 border border-slate-200">
                            <FiArrowLeft size={18} />
                        </div>
                        <span className="font-semibold">{editingProduct ? "Cancel Editing" : "Back to Dashboard"}</span>
                    </button>
                    <div className="text-center">
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
                            {editingProduct ? "Edit Product" : "Manage Inventory"}
                        </h1>
                        <p className="text-xs text-slate-400 font-medium mt-0.5 uppercase">
                            {editingProduct ? `Updating: ${editingProduct.productName}` : "View and modify your store products"}
                        </p>
                    </div>
                    <div className="w-10 flex justify-end">
                        {!editingProduct && (
                            <button 
                                onClick={() => dispatch(fetchProducts())} 
                                className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 hover:bg-teal-100 transition-all hover:rotate-180 duration-500"
                                title="Refresh Products"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-12">
                {editingProduct ? (
                    /* EDIT FORM VIEW */
                    <form onSubmit={handleSubmit} className="space-y-12 max-w-4xl mx-auto">
                        {/* Basic Info */}
                        <section className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border-2 border-slate-200 relative overflow-hidden group hover:border-teal-500/30 transition-all duration-500">
                            <div className="absolute top-0 left-0 w-2 h-full bg-teal-500"></div>
                            <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center">
                                <span className="w-10 h-10 bg-teal-500 text-white rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-teal-500/30 rotate-3 group-hover:rotate-0 transition-transform">
                                    <FiPackage size={20} />
                                </span>
                                Product Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="form-control">
                                    <label className="label mb-1"><span className="label-text font-black text-slate-700 uppercase tracking-wider text-[11px]">Product Name</span></label>
                                    <input type="text" className="input input-lg border-2 border-slate-200 w-full bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all rounded-2xl font-medium" value={formData.productName} onChange={(e) => handleInputChange("productName", e.target.value)} />
                                </div>
                                <div className="form-control">
                                    <label className="label mb-1"><span className="label-text font-black text-slate-700 uppercase tracking-wider text-[11px]">Brand Name</span></label>
                                    <input type="text" className="input input-lg border-2 border-slate-200 w-full bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all rounded-2xl font-medium" value={formData.brandName} onChange={(e) => handleInputChange("brandName", e.target.value)} />
                                </div>
                                <div className="form-control">
                                    <label className="label mb-1"><span className="label-text font-black text-slate-700 uppercase tracking-wider text-[11px]">Price ($)</span></label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                        <input type="number" step="0.01" className="input input-lg pl-10 border-2 border-slate-200 w-full bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all rounded-2xl font-black text-teal-600" value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label mb-1"><span className="label-text font-black text-slate-700 uppercase tracking-wider text-[11px]">Stock Inventory</span></label>
                                    <input type="number" className="input input-lg border-2 border-slate-200 w-full bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all rounded-2xl font-bold text-slate-700" value={formData.stock} onChange={(e) => handleInputChange("stock", e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-col w-full mt-10">
                                <label className="mb-3 px-1"><span className="text-[11px] font-black text-slate-700 uppercase tracking-[0.2em]">Detailed Description</span></label>
                                <textarea className="textarea w-full border-2 border-slate-200 h-48 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all rounded-[2.5rem] p-8 text-slate-700 font-medium leading-relaxed resize-none" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)}></textarea>
                            </div>
                        </section>

                        {/* Category & Colors */}
                        <section className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border-2 border-slate-200 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
                            <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <label className="label mb-3"><span className="label-text font-black text-slate-700 uppercase tracking-wider text-[11px]">Category</span></label>
                                    <div className="flex flex-wrap gap-3">
                                        {categoriesList.map((cat) => (
                                            <button key={cat} type="button" onClick={() => handleInputChange("category", cat)} className={`px-5 py-2.5 rounded-2xl text-[13px] font-bold transition-all border-2 ${formData.category === cat ? "bg-slate-800 border-slate-800 text-white shadow-xl shadow-slate-800/30 -translate-y-1" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"}`}>{cat}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="label mb-3"><span className="label-text font-black text-slate-700 uppercase tracking-wider text-[11px]">Available Colors</span></label>
                                    <div className="flex flex-wrap gap-4">
                                        {COLORS.map((color) => {
                                            const isSelected = formData.colors.find(c => c.value === color.value);
                                            return (
                                                <button key={color.value} type="button" onClick={() => toggleColor(color)} className={`w-12 h-12 rounded-2xl border-4 transition-all flex items-center justify-center relative overflow-hidden group/color ${isSelected ? "border-purple-500 scale-110 shadow-lg shadow-purple-500/20" : "border-slate-100 hover:border-slate-300"}`} style={{ backgroundColor: color.value }}>
                                                    {isSelected && <FiCheckCircle className={color.value === "#FFFFFF" ? "text-slate-800" : "text-white"} size={24} />}
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
                                        <Image src={url} alt={`Product ${index}`} fill className="object-cover group-hover/img:scale-110 transition-transform duration-700" />
                                        <button type="button" onClick={() => removeImage(index)} className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur text-red-500 rounded-2xl opacity-0 group-hover/img:opacity-100 transition-all shadow-xl hover:bg-red-500 hover:text-white"><FiTrash2 size={16} /></button>
                                    </div>
                                ))}
                                <label className={`aspect-square rounded-[2rem] border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${uploadingImages ? "bg-slate-50 border-slate-200" : "hover:bg-orange-50 hover:border-orange-500/50 border-slate-200"}`}>
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImages} />
                                    {uploadingImages ? <span className="loading loading-spinner loading-lg text-orange-500"></span> : <FiPlus size={28} className="text-slate-400" />}
                                </label>
                            </div>
                        </section>

                        <div className="flex gap-6 justify-end pt-8">
                            <button type="button" onClick={cancelEditing} className="btn btn-lg h-20 px-12 bg-slate-100 hover:bg-slate-200 text-slate-600 border-none rounded-[2rem] font-black uppercase tracking-widest transition-all">Discard Changes</button>
                            <button
                                type="submit"
                                disabled={isSubmitting || uploadingImages}
                                className={`btn btn-lg h-20 px-16 bg-slate-900 hover:bg-black text-white border-none rounded-[2rem] shadow-2xl shadow-slate-900/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-4 disabled:bg-slate-300 disabled:text-slate-500`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="loading loading-spinner loading-md"></span>
                                        <span className="text-lg font-black uppercase tracking-widest">Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-lg font-black uppercase tracking-widest">Update Product</span>
                                        <FiCheckCircle size={24} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                ) : (
                    /* LIST VIEW */
                    <div className="space-y-12">
                        {/* Search & Stats */}
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-xl shadow-slate-200/50">
                            <div className="relative w-full md:w-[32rem] group">
                                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by product name or brand..."
                                    className="input input-lg w-full pl-16 pr-8 border-2 border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-medium"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-8 bg-slate-50 px-8 py-4 rounded-2xl border border-slate-100">
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">In Inventory</p>
                                    <p className="text-2xl font-black text-slate-800 flex items-center justify-center">
                                        <FiPackage className="mr-3 text-teal-500" size={20} />
                                        {products.length}
                                    </p>
                                </div>
                                <div className="w-px h-10 bg-slate-200"></div>
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Search Result</p>
                                    <p className="text-2xl font-black text-teal-600">{filteredProducts.length}</p>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map((product) => (
                                <div key={product._id} className="bg-white rounded-[2.5rem] overflow-hidden border-2 border-slate-200 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:border-teal-500/30 transition-all duration-500 group">
                                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                                        {product.images?.[0] ? (
                                            <Image
                                                src={product.images[0]}
                                                alt={product.productName}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <FiPackage size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-teal-600 shadow-xl border border-teal-100 uppercase tracking-widest">
                                            {product.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-black text-slate-800 truncate text-lg mb-1 group-hover:text-teal-600 transition-colors">{product.productName}</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{product.brandName}</p>
                                        <div className="flex items-center justify-between mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                            <span className="text-2xl font-black text-teal-600 tracking-tighter">${product.price}</span>
                                            <span className={`text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-widest ${product.stock > 0 ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>
                                                {product.stock > 0 ? `${product.stock} Units` : "Empty"}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={() => startEditing(product)}
                                                className="btn btn-md bg-slate-900 hover:bg-black text-white border-none rounded-xl flex items-center justify-center font-black text-xs uppercase tracking-widest shadow-lg shadow-slate-900/20"
                                            >
                                                <FiEdit2 size={14} className="mr-2" /> Edit
                                            </button>
                                            <button
                                                onClick={() => confirmDelete(product._id)}
                                                className="btn btn-md bg-red-50 text-red-500 border-2 border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-xl flex items-center justify-center font-black text-xs uppercase tracking-widest transition-all"
                                            >
                                                <FiTrash2 size={14} className="mr-2" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-slate-200 shadow-2xl shadow-slate-200/50">
                                <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl border border-slate-100">
                                    <FiPackage size={48} className="text-slate-200" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-widest">No matching products</h3>
                                <p className="text-slate-400 mt-3 font-medium uppercase text-xs tracking-widest">Try a different search term or add new inventory.</p>
                                <button onClick={() => setSearchQuery("")} className="mt-8 btn bg-teal-500 hover:bg-teal-600 text-white border-none rounded-2xl px-8 font-black uppercase tracking-widest shadow-lg shadow-teal-500/30">Clear Search</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
