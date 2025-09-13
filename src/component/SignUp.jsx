import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase_config";
import InputField from "./ruesable/InputField";
import FormButton from "./ruesable/FormButton";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            return setError("Please fill the blank");
        }

        if (password !== confirmPassword) {
            return setError("Password do not match");
        }
        setLoading(true);
        setError("");

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, { displayName: name });
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-indigo-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
                    Create Account
                </h2>
                { error && <p className="text-red-500 text-center">{ error }</p>}
                <form onSubmit={ handleSubmit }>
                    <InputField
                        id="name"
                        label="Full Name"
                        type="text"
                        value={formData.name}
                        onChange={ handleChange }
                        placeholder="Full Name"
                    />
                    <InputField
                        id="email"
                        label="E-mail"
                        type="email"
                        value={formData.email}
                        onChange={ handleChange }
                        placeholder="example@email.com"
                    />
                    <InputField
                        id="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={ handleChange }
                        placeholder="*********"
                    />
                    <InputField
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={ handleChange }
                        placeholder="*********"
                    />
                    <FormButton
                        loading={ loading }
                        text="Sign Up"
                        loadingText="Creating Account..."
                    />
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Alredy have an account?{""}
                    <a href="/login" className="text-purple-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    )
}

export default SignUp