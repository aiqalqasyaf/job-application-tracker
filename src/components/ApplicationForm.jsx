import "../styles/index.css";

export default function ApplicationForm({
    company,
    role,
    setCompany,
    setRole,
    onSubmit,
}) {
    return (
        <form className="w-full flex justify-center gap-2" onSubmit={onSubmit}>
            <input
                className="h-9 border-2 rounded-md px-3 py-1 transition duration-300 ease-in-out"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company"
                required
            />
            <input
                className="h-9 border-2 rounded-md px-3 py-1 hover:scale-101 transition duration-300 ease-in-out"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Role"
                required
            />
            <button
                className="font-bold h-9 bg-black text-white py-1 px-3 rounded-lg transition duration-300 ease-in-out hover:scale-101 active:cursor-grab hover:cursor-pointer"
                type="submit"
            >
                Add Application
            </button>
        </form>
    );
}
