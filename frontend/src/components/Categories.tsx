interface Props {
    categories: { name: string; total: number; solved?: number }[];
    isLoggedIn: string | null;
}

export default ({ categories, isLoggedIn }: Props) => {
    return (
        <div
            className="rounded p-3 text-white"
            style={{ backgroundColor: "#222222" }}
        >
            <div className="fw-bold">Categories</div>
            <div className="form-check">
                {categories.map((category) => (
                    <div key={category.name} className="m-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                        ></input>
                        <label className="form-check-label">
                            {category.name} (
                            {isLoggedIn ? category.solved + "/" : ""}
                            {category.total})
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};
