import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';


export default function LogoutButton({ onLogout }) {
    const { logout } = useAuth();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutClick = () => setShowConfirm(true);

  const confirmLogout = () => {
    logout();
    toast.success("You have successfully logged out!");
    setShowConfirm(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    toast.warning("Logout cancelled");
    setShowConfirm(false);
  };




  return (
    <>
      <button
        onClick={handleLogoutClick}
        className="bg-[#E9E9E9] dark:bg-[#303030] w-8 sm:w-10 aspect-square flex justify-center items-center rounded-lg cursor-pointer"
      >
        <svg
          className="w-[16px] sm:w-[20px]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <g
            className="fill-[#1A1A1A] dark:fill-white"
            clipPath="url(#clip0_66_1680)"
          >
            <path d="M16.381 7.875c-.018-.198-.179-.282-.29-.396q-1.404-1.45-2.812-2.893c-.107-.11-.217-.216-.31-.338-.323-.429-.288-1.048.072-1.4a.985.985 0 0 1 1.391.023 968 968 0 0 1 5.245 5.387c.429.444.432 1.052 0 1.5a758 758 0 0 1-5.213 5.355c-.455.462-1.031.452-1.461.026-.377-.372-.355-1.044.084-1.504 1.014-1.06 2.044-2.105 3.067-3.157.115-.119.224-.244.343-.372-.162-.16-.335-.09-.489-.092q-4.23-.006-8.46-.004c-.151 0-.302.007-.452-.008-.46-.045-.812-.387-.89-.852-.071-.418.169-.857.577-1.058.28-.138.58-.152.884-.152q4.095.003 8.188-.002c.173 0 .359.056.527-.064z" />
            <path d="M.001 9.01Q0 6.406.001 3.804C.005 1.743 1.624.048 3.636.01c.935-.018 1.87-.01 2.806 0 .64.007 1.092.414 1.111.975.02.55-.416 1.024-1.034 1.082-.36.034-.724.014-1.086.016-.482.002-.968.033-1.447-.006-1.185-.096-2.028.715-2.04 2.053-.006.868-.002 1.735-.002 2.602 0 2.323.002 4.646-.002 6.97 0 .375.038.745.16 1.096.255.734.92 1.174 1.824 1.191.845.017 1.69 0 2.534.008.644.006 1.083.406 1.092.982.01.59-.444 1.013-1.108 1.017q-1.403.009-2.806 0c-1.97-.01-3.63-1.713-3.636-3.736-.004-1.75 0-3.5 0-5.25" />
          </g>
          <defs>
            <clipPath id="clip0_66_1680">
              <path fill="#fff" d="M0 0h20v18H0z" />
            </clipPath>
          </defs>
        </svg>
      </button>

        <ConfirmDialog
            title="Confirm Logout"
            description="Are you sure you want to logout?"
            isOpen={showConfirm}
            onConfirm={confirmLogout}
            onCancel={cancelLogout}
        />
    </>
  );
}
