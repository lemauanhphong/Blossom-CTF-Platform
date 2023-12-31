import { memo, useState } from "react";

interface props {
    items: itemProps[];
    selectedIndex: number;
}

interface itemProps {
    name: string;
    route: string;
}

export default memo(({ items, selectedIndex }: props) => {
    // let items = ["🌼Home", "Scoreboard", "Challenges"];

    const [selectIndex, setSelectedIndex] = useState(selectedIndex);

    return (
        <>
            <nav>
                <ul className="nav justify-content-center fw-bold nav-underline mt-2">
                    {items.map((item, index) => (
                        <li key={item.route} className="nav-item">
                            <a
                                href={item.route}
                                className={
                                    "nav-link" +
                                    (selectIndex !== index
                                        ? " link-light"
                                        : " active")
                                }
                                style={{ color: "#f03d4d" }}
                                onMouseOver={() => {
                                    setSelectedIndex(index);
                                }}
                                onMouseLeave={() => {
                                    setSelectedIndex(selectedIndex);
                                }}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <hr
                className="mt-0"
                style={{ backgroundColor: "white", height: "1px", border: 0 }}
            />
        </>
    );
});
