"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input } from "@heroui/react";
// import { useRouter } from "next/navigation";

const LoginForm = () => {
    // const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries())

        console.log(user)

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
            callbackURL: "/"
        });
        console.log(data)
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md p-8 bg-content1 rounded-2xl border border-default-100 shadow-xl mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground text-center mb-2">
                        Login to Fable
                    </h2>


                    <div className="flex flex-col gap-1">
                        <label htmlFor="login-email" className="text-sm font-semibold text-default-700">Email Address*</label>
                        <Input
                            id="login-email"
                            name="email"
                            type="email"
                            required
                            variant="bordered"
                            placeholder="you@example.com" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="login-password" className="text-sm font-semibold text-default-700">Password*</label>
                        <Input
                            id="login-password"
                            name="password"
                            type="password"
                            required
                            variant="bordered"
                            placeholder="••••••••" />
                    </div>

                    <Button
                        type="submit"
                        color="primary"
                        className="font-semibold rounded-xl w-full mt-2">
                        Login
                    </Button>
                </form>

                <div className="flex items-center my-4">
                    <hr className="flex-1" />
                    <span className="text-xs text-default-400 px-3">OR</span>
                    <hr className="flex-1" />
                </div>

                <Button
                    variant="bordered"
                    className="w-full font-semibold rounded-xl border-default-200"
                    onClick={handleGoogleLogin}
                >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.66l3.15-3.15C17.45 1.62 14.93 1 12 1 7.37 1 3.4 3.65 1.45 7.5l3.6 2.8C5.97 7.04 8.74 5.04 12 5.04z" />
                        <path fill="#4285F4" d="M23.45 12.3c0-.82-.07-1.6-.22-2.3H12v4.35h6.42c-.27 1.44-1.08 2.66-2.3 3.47l3.58 2.78c2.1-1.94 3.3-4.8 3.3-8.3z" />
                        <path fill="#FBBC05" d="M5.05 14.7c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.45 7.3C.52 9.17 0 11.26 0 13.5s.52 4.33 1.45 6.2l3.6-2.8z" />
                        <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.93l-3.58-2.78c-.99.66-2.26 1.06-4.38 1.06-3.26 0-6.03-2-7.02-4.96l-3.6 2.8C3.4 20.35 7.37 23 12 23z" />
                    </svg>
                    Continue with Google
                </Button>
            </div>
        </div>

    );
};

export default LoginForm;