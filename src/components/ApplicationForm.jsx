import "../styles/index.css";

export default function ApplicationForm({
    company,
    role,
    status,
    setCompany,
    setRole,
    setStatus,
    onSubmit,
}) {
    return (
        <form className="w-full flex justify-center gap-2" onSubmit={onSubmit}>
            <input
                className="h-9 border-2 rounded-md px-3 py-1 hover:scale-105 transition duration-300 ease-in-out"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company"
                required
            />
            <input
                className="h-9 border-2 rounded-md px-3 py-1 hover:scale-105 transition duration-300 ease-in-out"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Role"
                required
            />
            <select
                className="h-9 border-2 rounded-md px-3 py-1 hover:scale-105 transition duration-300 ease-in-out"
                name="status"
                id="status"
                aria-label="Application status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
            </select>
            <button
                className="font-bold h-9 bg-black text-white py-1 px-3 rounded-lg transition duration-300 ease-in-out hover:scale-105 active:cursor-grab hover:cursor-pointer"
                type="submit"
            >
                Add Application
            </button>
        </form>
    );
}
