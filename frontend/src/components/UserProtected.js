import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProtected(props) {
  const { User } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role == '') {
      navigate("/login");
    }
  }, [navigate]);

  return <User />;
}

export default UserProtected;
