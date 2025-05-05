import Spinner from "@/Components/Spinner";

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
}

/**
 *  A simple button component for consistency across the app.
 * @param label - The label text of the button
 * @param onClick - The function to call when the button is clicked
 * @param disabled - Whether the button is disabled or not
 * @param loading - Whether the button is in a loading state or not
 * @constructor
 */
export default function Button({label, onClick, disabled = false, loading}: ButtonProps) {
    return (
        <button
            className="bg-blue-500 text-white font-bold py-2 px-2 rounded"
            onClick={onClick}
            disabled={disabled}
        >
            {loading ? <Spinner/> : label}
        </button>
    );
}