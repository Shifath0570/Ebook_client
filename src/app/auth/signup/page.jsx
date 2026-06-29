"use client";

import { authClient } from "@/lib/auth-client";
import { InputGroup, Label, Button, Input, RadioGroup, Radio } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";

const RegisterForm = () => {
    const router = useRouter();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("reader")

    const [isVisible, setIsVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert("Passwords do not match");
        }

        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            role,
        });

        console.log(data)

        if (error) {
            alert(error.message || "An unexpected registration error occurred.");
        } else {
            router.push("/auth/signin");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md p-8 bg-content1 rounded-2xl border border-default-100 shadow-xl mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground text-center mb-2">
                        Create your Fable Account
                    </h2>

                    <div className="flex flex-col gap-1">
                        <Label className="text-sm font-semibold text-default-700">Full Name*</Label>
                        <Input
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            size="md"
                            variant="primary"
                            placeholder="John Doe" 
                        />
                    </div>


                    <div className="flex flex-col gap-1">
                        <Label className="text-sm font-semibold text-default-700">Email Address*</Label>
                        <Input
                            name="email"
                            value={email}
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            required
                            size="md"
                            variant="primary"
                            placeholder="you@example.com" 
                        />
                    </div>


                    <div className="flex flex-col gap-1">
                        <Label className="text-sm font-semibold text-default-700">Password*</Label>
                        <InputGroup variant="bordered">
                            <InputGroup.Input
                                name="password"
                                value={password}
                                type={isVisible ? "text" : "password"}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                            <InputGroup.Suffix>
                                <button
                                    className="focus:outline-none flex items-center justify-center text-default-400 hover:text-default-600 transition-colors"
                                    type="button"
                                    onClick={toggleVisibility}
                                    aria-label="toggle password visibility"
                                >
                                    {isVisible ? <EyeSlash className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </InputGroup.Suffix>
                        </InputGroup>
                    </div>


                    <div className="flex flex-col gap-1">
                        <Label className="text-sm font-semibold text-default-700">Confirm Password*</Label>
                        <InputGroup variant="bordered">
                            <InputGroup.Input
                                name="confirmPassword"
                                value={confirmPassword}
                                type={isConfirmVisible ? "text" : "password"}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                            <InputGroup.Suffix>
                                <button
                                    className="focus:outline-none flex items-center justify-center text-default-400 hover:text-default-600 transition-colors"
                                    type="button"
                                    onClick={toggleConfirmVisibility}
                                    aria-label="toggle confirm password visibility"
                                >
                                    {isConfirmVisible ? <EyeSlash className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </InputGroup.Suffix>
                        </InputGroup>
                    </div>


                    <div className="flex flex-col gap-2 mt-1">
                        <label>Select Account Type*</label>
                        <RadioGroup
                            name="role"
                            value={role}
                            onChange={value => setRole(value)}
                            required
                            orientation="horizontal"
                            defaultValue="reader">
                            <Radio value="reader">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    Reader
                                </Radio.Content>
                            </Radio>

                            <Radio value="writer">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    Writer
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>


                    <Button
                        type="submit"
                        color="primary"
                        className="font-semibold rounded-xl w-full mt-2">
                        Register Account
                    </Button>
                </form>
            </div>
        </div>

    );
};

export default RegisterForm;