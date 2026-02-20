"use client";
import React, { useState } from 'react';
import { z } from 'zod';
import { API_BASE_URL } from '@/lib/api';

const contributionSchema = z.object({
    author: z.string().min(2, "El nombre debe tener al menos 2 letras").max(50, "El nombre es muy largo"),
    text: z.string().min(1, "El mensaje no puede estar vacío").max(500, "El mensaje es muy largo (máx 500 caracteres)"),
});

interface ContributionFormProps {
    relativeId: string;
    onSuccess: () => void;
    onClose: () => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({ relativeId, onSuccess, onClose }) => {
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [errors, setErrors] = useState<{ author?: string; text?: string }>({});
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Validamos con Zod
        const result = contributionSchema.safeParse({ author, text });

        if (!result.success) {
            const formattedErrors: any = {};
            result.error.issues.forEach((issue) => {
                formattedErrors[issue.path[0]] = issue.message;
            });
            setErrors(formattedErrors);
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/contributions/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ relativeId, author, text }),
            });

            if (response.ok) {
                setAuthor('');
                setText('');
                onSuccess();
                onClose();
            } else {
                const errorData = await response.json();
                console.error('API Error:', errorData);
            }
        } catch (error) {
            console.error('Error submitting contribution:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-[#f2ead0] p-6 rounded-sm shadow-2xl border-l-8 border-orange-500 max-w-md w-full animate-fade-in text-zinc-900 mx-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold font-serif text-orange-900">Deja tu ofrenda</h2>
                <button onClick={onClose} className="text-orange-900 hover:text-orange-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-orange-800 mb-1">Tu nombre</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className={`w-full p-2 bg-white/50 border ${errors.author ? 'border-red-500' : 'border-orange-200'} rounded-sm focus:outline-none focus:border-orange-500`}
                        placeholder="Ej: Juan Pérez"
                    />
                    {errors.author && <p className="text-red-600 text-[10px] mt-1 italic">{errors.author}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-orange-800 mb-1">Tu mensaje o recuerdo</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className={`w-full p-2 bg-white/50 border ${errors.text ? 'border-red-500' : 'border-orange-200'} rounded-sm focus:outline-none focus:border-orange-500 h-24 resize-none`}
                        placeholder="Escribe algo para honrar su memoria..."
                    />
                    {errors.text && <p className="text-red-600 text-[10px] mt-1 italic">{errors.text}</p>}
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-orange-600 text-white font-bold py-3 rounded-sm hover:bg-orange-700 transition-colors disabled:bg-orange-400 shadow-lg active:scale-95 duration-150"
                >
                    {submitting ? 'Colocando ofrenda...' : 'Colocar en el Altar'}
                </button>
            </form>
        </div>
    );
};

export default ContributionForm;
