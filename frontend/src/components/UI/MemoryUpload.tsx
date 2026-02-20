"use client";
import React, { useState, useRef } from 'react';
import { API_BASE_URL } from '@/lib/api';

interface MemoryUploadProps {
    relativeId: string;
    onSuccess: () => void;
    onClose: () => void;
}

const MemoryUpload: React.FC<MemoryUploadProps> = ({ relativeId, onSuccess, onClose }) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('relativeId', relativeId);

        try {
            const response = await fetch(`${API_BASE_URL}/contributions/upload-memory`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                onSuccess();
                onClose();
            } else {
                const errorData = await response.json();
                console.error('Upload Error:', errorData);
            }
        } catch (error) {
            console.error('Error uploading memory:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-[#f2ead0] p-6 rounded-sm shadow-2xl border-l-8 border-orange-500 max-w-md w-full animate-fade-in text-zinc-900 mx-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold font-serif text-orange-900">Sube un recuerdo</h2>
                <button onClick={onClose} className="text-orange-900 hover:text-orange-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-orange-300 rounded-sm p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50 transition-colors h-48 overflow-hidden"
                >
                    {preview ? (
                        <img src={preview} alt="Vista previa" className="w-full h-full object-contain" />
                    ) : (
                        <div className="text-center">
                            <span className="text-4xl block mb-2">📸</span>
                            <p className="text-sm text-orange-800">Haz clic para elegir una foto</p>
                            <p className="text-[10px] text-orange-400 mt-1">Formatos sugeridos: JPG, PNG</p>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>

                {file && (
                    <div className="text-[10px] text-zinc-500 italic text-center">
                        Seleccionado: {file.name}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!file || uploading}
                    className="w-full bg-orange-600 text-white font-bold py-3 rounded-sm hover:bg-orange-700 transition-colors disabled:bg-orange-300 shadow-lg active:scale-95 duration-150"
                >
                    {uploading ? 'Subiendo a la nube...' : 'Colocar en el Altar'}
                </button>
            </form>

            <p className="text-[9px] text-orange-400 mt-4 text-center italic">
                Nota: El archivo se guardará de forma permanente en la galería de este altar.
            </p>
        </div>
    );
};

export default MemoryUpload;
