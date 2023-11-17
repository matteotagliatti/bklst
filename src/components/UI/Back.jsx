import { Link } from "react-router-dom";

export default function BackIcon({ to }) {
  return (
    <Link to={to} className="block mb-5">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 3L2 7L6 11"
          stroke="#A3A3A3"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 7H9.2C11.8509 7 14 9.23863 14 12"
          stroke="#A3A3A3"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
