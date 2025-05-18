import { useRef, useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(false);

  async function signup() {
    const username = usernameRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    if (!username || !password) return;

    try {
      setLoading(true);
      await axios.post(
        `${BACKEND_URL}/api/v1/signup`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("You have signedup!");
    } catch (err) {
      console.error(err);
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
            text="Signup"
            loading={loading}
            onClick={signup}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
