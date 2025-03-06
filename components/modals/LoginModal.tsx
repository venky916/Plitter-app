"use client";
import useLoginModal from "@/hooks/useLoginModal";
import React, { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { login } from "@/actions/login";
import toast from "react-hot-toast";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const OnSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = {
        email,
        password,
      };
      const response = await login(data);
      // console.log(response, "login response");
      if (response?.error) {
        toast.error("Something went wrong");
      }
      if (response?.success) {
        toast.success("Login success");
        // router.refresh();
        // router.push(router.asPath);
        window.location.reload();
      }

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p> First Time using Plitter</p>
      <span
        onClick={onToggle}
        className="text-white cursor-pointer hover:underline "
      >
        Create an account
      </span>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={OnSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
