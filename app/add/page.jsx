"use client";

import { useState } from "react";
import { recipes as baseRecipes } from "@/data/recipes";
import Toast from "@/components/Toast";

export default function AddRecipePage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [prepTime, setPrepTime] = useState(10);
    const [cookTime, setCookTime] = useState(10);
    const [imageSrc, setImageSrc] = useState("");
    const [ingredients, setIngredients] = useState([""]);
    const [instructions, setInstructions] = useState([""]);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    function showToast(msg, type = "success") {
        setToastMessage(msg);
        setToastType(type);
        setToastVisible(true);
    }

    function onImage(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setImageSrc(reader.result);
        reader.readAsDataURL(file);
    }

    function updateAt(list, idx, value, set) {
        const clone = [...list];
        clone[idx] = value;
        set(clone);
    }

    function addAt(set) {
        set((prev) => [...prev, ""]);
    }

    function removeAt(list, idx, set) {
        set(list.filter((_, i) => i !== idx));
    }

    function onSubmit(e) {
        e.preventDefault();

        // Validation
        if (!name.trim()) {
            showToast("Recipe name is required", "error");
            return;
        }
        if (!description.trim()) {
            showToast("Description is required", "error");
            return;
        }
        if (!imageSrc) {
            showToast("Image is required", "error");
            return;
        }
        const filledIngredients = ingredients.filter((i) => i.trim());
        if (filledIngredients.length === 0) {
            showToast("At least one ingredient is required", "error");
            return;
        }
        const filledInstructions = instructions.filter((i) => i.trim());
        if (filledInstructions.length === 0) {
            showToast("At least one instruction is required", "error");
            return;
        }

        try {
            const raw = localStorage.getItem("addedRecipes");
            const added = raw ? JSON.parse(raw) : [];
            const id = Date.now();
            const newRecipe = {
                id,
                name,
                description,
                image: imageSrc || "",
                prepTime: Number(prepTime),
                cookTime: Number(cookTime),
                ingredients: filledIngredients,
                instructions: filledInstructions,
            };
            localStorage.setItem("addedRecipes", JSON.stringify([newRecipe, ...added]));
            window.dispatchEvent(new CustomEvent("recipesUpdated", { detail: newRecipe }));
            showToast("Recipe saved successfully!", "success");
            // reset
            setName("");
            setDescription("");
            setPrepTime(10);
            setCookTime(10);
            setImageSrc("");
            setIngredients([""]);
            setInstructions([""]);
        } catch (err) {
            console.error(err);
            showToast("Failed to save recipe.", "error");
        }
    }

    return (
        <div className="add-recipe-wrap">
            <Toast message={toastMessage} visible={toastVisible} onClose={() => setToastVisible(false)} type={toastType} />
            <div className="add-recipe-card">
                <h1 className="add-title">Add New Recipe</h1>
                <form onSubmit={onSubmit} className="add-recipe-form" noValidate>
                    <div className="form-row">
                        <label className="form-label">Name *</label>
                        <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-row">
                        <label className="form-label">Description *</label>
                        <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                    </div>

                    <div className="form-row form-grid-2">
                        <div>
                            <label className="form-label">Prep Time (min) *</label>
                            <input className="input" type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} min={0} />
                        </div>
                        <div>
                            <label className="form-label">Cook Time (min) *</label>
                            <input className="input" type="number" value={cookTime} onChange={(e) => setCookTime(e.target.value)} min={0} />
                        </div>
                    </div>

                    <div className="form-row">
                        <label className="form-label">Image *</label>
                        <input className="input-file" type="file" accept="image/*" onChange={onImage} />
                        {imageSrc && <img src={imageSrc} alt="preview" className="preview-image" />}
                    </div>

                    <div className="form-row">
                        <h3 className="section-title">Ingredients *</h3>
                        {ingredients.map((ing, i) => (
                            <div key={i} className="form-list-row">
                                <input className="input" value={ing} onChange={(e) => updateAt(ingredients, i, e.target.value, setIngredients)} />
                                <button type="button" className="btn-small" onClick={() => removeAt(ingredients, i, setIngredients)} disabled={ingredients.length === 1}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" className="btn-secondary" onClick={() => addAt(setIngredients)}>Add Ingredient</button>
                    </div>

                    <div className="form-row">
                        <h3 className="section-title">Instructions *</h3>
                        {instructions.map((ins, i) => (
                            <div key={i} className="form-list-row">
                                <input className="input" value={ins} onChange={(e) => updateAt(instructions, i, e.target.value, setInstructions)} />
                                <button type="button" className="btn-small" onClick={() => removeAt(instructions, i, setInstructions)} disabled={instructions.length === 1}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" className="btn-secondary" onClick={() => addAt(setInstructions)}>Add Step</button>
                    </div>

                    <div className="form-row form-actions">
                        <button type="submit" className="btn-primary">Save Recipe</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
