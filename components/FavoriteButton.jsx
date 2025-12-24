"use client";

import { useEffect, useState } from "react";

export default function FavoriteButton({ recipeId }) {
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("favorites");
            const ids = raw ? JSON.parse(raw) : [];
            setIsFav(ids.includes(recipeId));
        } catch (e) {
            setIsFav(false);
        }
    }, [recipeId]);

    function toggleFav(e) {
        e.preventDefault();
        try {
            const raw = localStorage.getItem("favorites");
            const ids = raw ? JSON.parse(raw) : [];

            let next;
            if (ids.includes(recipeId)) {
                next = ids.filter((id) => id !== recipeId);
                setIsFav(false);
            } else {
                next = [...ids, recipeId];
                setIsFav(true);
            }
            localStorage.setItem("favorites", JSON.stringify(next));
            // dispatch event so other parts can react
            window.dispatchEvent(new CustomEvent("favoritesUpdated", { detail: next }));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <button
            className={`favorite-btn ${isFav ? "active" : ""}`}
            aria-pressed={isFav}
            onClick={toggleFav}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path
                    d="M12 21s-7.5-4.35-10-7.2C-0.5 9.6 3.2 4 8.6 4 10.8 4 12 5.4 12 5.4S13.2 4 15.4 4C20.8 4 24.5 9.6 22 13.8 19.5 16.85 12 21 12 21z"
                    fill={isFav ? "#ff6b6b" : "transparent"}
                    stroke="#ff6b6b"
                    strokeWidth="1"
                />
            </svg>
        </button>
    );
}
