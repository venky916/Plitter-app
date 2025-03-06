"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id as string);
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage as string);
    setCoverImage(currentUser?.coverImage as string);
    setName(currentUser?.name as string);
    setUsername(currentUser?.username as string);
    setBio(currentUser?.bio as string);
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.coverImage,
    currentUser?.profileImage,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      mutateFetchedUser();
      editModal.onClose();
      toast.success("Updated");
    } catch (error) {
      console.log(error)
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    name,
    username,
    profileImage,
    coverImage,
    editModal,
    mutateFetchedUser,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload Profile Image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload Cover Image"
      />
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal?.isOpen}
      title="Edit Your Profile"
      actionLabel="Save"
      onClose={editModal?.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
