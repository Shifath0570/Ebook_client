"use client";
import { Button, Description, Input, Label, Surface, TextArea, TextField, ListBox, Select, Modal } from "@heroui/react";
import { FaRegEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const GENRES = [
    { label: "Fantasy", value: "fantasy" },
    { label: "Sci-Fi", value: "sci-fi" },
    { label: "Mystery", value: "mystery" },
    { label: "Romance", value: "romance" },
    { label: "Thriller", value: "thriller" },
    { label: "Non-Fiction", value: "non-fiction" },
];

const UpdateBook = ({ book }) => {

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        genre: "",
        description: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDragActive, setIsDragActive] = useState(false);

    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGenreChange = (value) => {
        setFormData((prev) => ({ ...prev, genre: value }));
    };

    const handleFileProcess = (file) => {
        if (file && file.type.startsWith("image/")) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFileProcess(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileProcess(e.dataTransfer.files[0]);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile) return alert("Please upload a cover image.");

        setIsSubmitting(true);

        try {
            const imgFormData = new FormData();
            imgFormData.append("image", imageFile);

            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_API

            const imgBBResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "PATCH",
                body: imgFormData,
            });

            const imgBBData = await imgBBResponse.json();

            if (!imgBBData.success) {
                throw new Error("Image upload failed");
            }

            const coverImageUrl = imgBBData.data.url;

            const finalPayload = {
                ...formData,
                price: parseFloat(formData.price),
                coverImage: coverImageUrl,
                status: "published",
                writerName: user?.name,
                writerId: user?.id,
                date: new Date()
            };

            console.log("Production Ready Payload:", finalPayload);
            alert("Ebook added successfully!");

            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

            const res = await fetch(`${baseUrl}/updateBook/${book._id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(finalPayload)
            })
            const data = await res.json()
            console.log(data)
            window.location.reload();

            // const res = await createBooks(finalPayload)

            alert("Book posted successfully!");
            console.log(res)

            setFormData({ title: "", price: "", genre: "", description: "" });
            setImageFile(null);
            setImagePreview("");

        } catch (error) {
            console.error("Submission Error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    // const onSubmit = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData(e.target)
    //     const updateDetails = Object.fromEntries(formData.entries())

    //     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    //     const res = await fetch(`${baseUrl}/updateBook/${book._id}`, {
    //         method: "PATCH",
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(updateDetails)
    //     })
    //     const data = await res.json()
    //     console.log(data)
    //     window.location.reload();
    // }


    return (
        <Modal>
            <Button variant="outline" className={"text-xs font-medium bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1.5 rounded-md border border-zinc-700/50 transition-colors"}><FaRegEdit /><span>Edit</span></Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Update Book</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <div className="flex items-center justify-center rounded-3xl bg-surface p-6 border">
                                    <Surface className="w-full">
                                        <form onSubmit={handleSubmit} className="grid grid-cols-1  gap-8">

                                            <div className="flex flex-col gap-4">
                                                <label className="text-sm font-medium text-slate-300">Ebook Cover Image</label>

                                                <div
                                                    onDragEnter={handleDrag}
                                                    onDragOver={handleDrag}
                                                    onDragLeave={handleDrag}
                                                    onDrop={handleDrop}
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className={`relative group flex flex-col items-center justify-center h-[380px] w-full rounded-xl border-2 border-dashed cursor-pointer overflow-hidden transition-all duration-300
                    ${isDragActive ? "border-indigo-500 bg-indigo-500/10" : "border-slate-700 bg-slate-950/40 hover:border-slate-500 hover:bg-slate-950/60"}`}
                                                >
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                        accept="image/*"
                                                        className="hidden"
                                                    />

                                                    <AnimatePresence mode="wait">
                                                        {imagePreview ? (
                                                            <motion.div
                                                                key="preview"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-950"
                                                            >
                                                                <img
                                                                    src={imagePreview}
                                                                    alt="Cover Preview"
                                                                    className="w-full h-full object-contain p-2"
                                                                />
                                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                                                                    <p className="text-white text-sm font-medium bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700">
                                                                        Change Cover Image
                                                                    </p>
                                                                </div>
                                                            </motion.div>
                                                        ) : (
                                                            <motion.div
                                                                key="placeholder"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                className="flex flex-col items-center text-center p-6 pointer-events-none"
                                                            >
                                                                <div className="p-4 bg-slate-800/50 rounded-full text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                                                    </svg>
                                                                </div>
                                                                <p className="text-slate-200 font-semibold mb-1">Drag & drop your cover here</p>
                                                                <p className="text-xs text-slate-400">or click to browse your files</p>
                                                                <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-wider">Supports JPEG, PNG, WEBP</p>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-5 justify-between">
                                                <div className="flex flex-col gap-5">

                                                    <TextField isRequired className="flex flex-col gap-1.5 w-full">
                                                        <Label className="text-sm font-medium text-slate-300">Book Title</Label>
                                                        <Input
                                                            type="text"
                                                            name="title"
                                                            aria-label="Book Title"
                                                            placeholder="Enter the ebook title"
                                                            value={formData.title}
                                                            onChange={handleInputChange}
                                                            required
                                                            className="w-full rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-slate-200 px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
                                                        />
                                                    </TextField>

                                                    <div className="grid grid-cols-2 gap-4">

                                                        <TextField isRequired className="flex flex-col gap-1.5">
                                                            <Label className="text-sm font-medium text-slate-300">Price ($)</Label>
                                                            <div className="relative flex items-center">
                                                                <span className="absolute left-4 text-slate-500 text-sm">$</span>
                                                                <Input
                                                                    type="number"
                                                                    name="price"
                                                                    aria-label="Price"
                                                                    placeholder="0.00"
                                                                    value={formData.price}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    min="0"
                                                                    step="0.01"
                                                                    className="w-full rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-slate-200 pl-8 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
                                                                />
                                                            </div>
                                                        </TextField>

                                                        <div className="flex flex-col gap-1.5">
                                                            <label className="text-sm font-medium text-slate-300">Genre *</label>
                                                            <Select
                                                                aria-label="Genre"
                                                                placeholder="Select genre"
                                                                value={formData.genre || null}
                                                                onChange={handleGenreChange}
                                                                isRequired
                                                                className="w-full rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-slate-200 px-3 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
                                                            >
                                                                <Select.Trigger className="w-full flex items-center justify-between text-left">
                                                                    <Select.Value placeholder="Select genre" className="text-slate-200" />
                                                                    <Select.Indicator className="text-slate-400" />
                                                                </Select.Trigger>
                                                                <Select.Popover className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl p-1">
                                                                    <ListBox className="text-slate-200">
                                                                        {GENRES.map((genre) => (
                                                                            <ListBox.Item
                                                                                key={genre.value}
                                                                                id={genre.value}
                                                                                textValue={genre.label}
                                                                                className="px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors"
                                                                            >
                                                                                {genre.label}
                                                                            </ListBox.Item>
                                                                        ))}
                                                                    </ListBox>
                                                                </Select.Popover>
                                                            </Select>
                                                        </div>

                                                    </div>

                                                    <TextField isRequired className="flex flex-col gap-1.5 w-full">
                                                        <Label className="text-sm font-medium text-slate-300">Full Content / Description</Label>
                                                        <TextArea
                                                            name="description"
                                                            aria-label="Full Content or Description"
                                                            placeholder="Write or paste your full ebook content description here..."
                                                            value={formData.description}
                                                            onChange={handleInputChange}
                                                            required
                                                            rows={6}
                                                            className="w-full rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-slate-200 px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600 resize-none"
                                                        />
                                                    </TextField>

                                                </div>

                                                <Button
                                                    type="submit"
                                                    isLoading={isSubmitting}
                                                    spinner={
                                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                        </svg>
                                                    }
                                                    className="w-full mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-6 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300"
                                                >
                                                    {isSubmitting ? "Processing Ebook Metadata..." : "Publish Ebook"}
                                                </Button>
                                            </div>

                                        </form>
                                    </Surface>
                                </div>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>

    );
};

export default UpdateBook;