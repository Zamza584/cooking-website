"use client";

import { useEffect, useState } from "react";

export default function Toast({ message, visible, onClose, type = "success" }) {
    useEffect(() => {
        if (!visible) return;
        const timer = setTimeout(onClose, 2800);
        return () => clearTimeout(timer);
    }, [visible, onClose]);

    if (!visible) return null;

    const isError = type === "error";

    return (
        <div className="toast-container">
            <div className={`toast ${isError ? "toast-error" : "toast-success"}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {isError ? (
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor" />
                    ) : (
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor" />
                    )}
                </svg>
                <span>{message}</span>
            </div>
        </div>
    );
}

