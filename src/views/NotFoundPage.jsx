import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div>
            <h1>Not Found Page</h1>
            <Link to={"/"}>
                <button>Go back to Main</button>
            </Link>
        </div>
    );
};

export default NotFoundPage;