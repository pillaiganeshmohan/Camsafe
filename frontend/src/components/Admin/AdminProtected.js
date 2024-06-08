import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminProtected(props) {
  const { Admin } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  return <Admin />;
}

export default AdminProtected;
