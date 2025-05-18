import { useRef, useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function signin() {
    const username = usernameRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    if (!username || !password) return;

    try {
      setLoading(true);

      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
      alert("You have signedin!");

    } catch (err: any) {

      if (axios.isAxiosError(err) && err.response?.status === 403) {
        alert("Incorrect username or password");

      } else {
        alert("Something went wrong");
      }
      
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center ">
      <div className=" rounded border bg-[#D3D3D3]">
        <div className="px-10 mt-10 mb-2">
          <Input ref={usernameRef} placeholder="Username" />
        </div>
        <div className="px-10 mb-10">
          <Input ref={passwordRef} placeholder="Password" />
        </div>

        <div className="flex justify-center m-10">
          <Button
            variant="primary"
            text="Signin"
            loading={loading}
            onClick={signin}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
