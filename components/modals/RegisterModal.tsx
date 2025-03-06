"use client";

import React, { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { signUp } from "@/actions/register";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const OnSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = {
        email,
        password,
        name,
        username,
      };

      const response = await signUp(data);
      if (response?.error) {
        toast.error("Something went wrong");
      }
      if (response?.success) {
        toast.success("Account created");

        await signIn("credentials", {
          email,
          password,
        });

        registerModal.onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, name, username]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Already have account</p>
      <span
        onClick={onToggle}
        className="text-white cursor-pointer hover:underline "
      >
        Sign in
      </span>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an Account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={OnSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
