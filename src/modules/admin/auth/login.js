"use client";

import React, { useState } from "react";
import Image from "next/image";
import AppLogo from "../../../assets/images/app-logo.svg";
import BannerImage from "../../../assets/images/banner-login.png";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { authActions } from "./auth.action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginSchema from "@/validations/Login.schema";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";


export const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(LoginSchema),
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        const payload = {
            email: data.email,
            password: data.password,
        };
        setLoading(true);
        dispatch(
            authActions.postLogin(
                payload,
                (response) => {
                    if (response.success === true) {
                        toast.success("Login Successful!");
                        setLoading(false);
                        router.push("/admin/dashboard");
                    }
                },
                (error) => {
                    toast.error(error.error || "Login failed");
                    setLoading(false);
                }
            )
        );
    };

    return (
        <div className="flex h-screen">
            <div
                className="hidden md:block w-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url(${BannerImage.src})` }}
            />
            <div className="flex w-full md:w-1/2 flex-col justify-center items-center relative px-10">
                <div className="absolute top-6 left-6">
                    <Image src={AppLogo} alt="App Logo" width={160} />
                </div>
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold text-gray-900 text-center leading-tight">
                        Just a couple of clicks and we
                        <span className="text-orange-600"> Start.</span>
                    </h1>
                    <p className="text-gray-600 text-center mt-2 text-lg">
                        Please enter your credentials
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10">
                        <div>
                            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter Your Email"
                                {...register("email")}
                                className={`mt-2 bg-gray-100 border ${errors.email ? "border-red-500" : "border-gray-300"} h-11`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="mt-6">
                            <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                            <InputGroup className={`mt-2 bg-gray-100 border ${errors.password ? "border-red-500" : "border-gray-300"} h-11`}>
                                <InputGroupInput
                                    id="password"
                                    placeholder="Enter Password"
                                    type={showPass ? "text" : "password"}
                                    {...register("password")}
                                    className="h-11"
                                />

                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                        type="button"
                                        size="icon-xs"
                                        onClick={() => setShowPass(!showPass)}
                                    >
                                        {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-10 bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg rounded-lg disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
