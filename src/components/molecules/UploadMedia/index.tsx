// @ts-nocheck
"use client";
import Modal from "@/components/molecules/Modal";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getUserAlbums } from "@/services/gallery";
import { createPost, updatePost } from "@/services/posts";
import {
  getBusinessAlbums,
  getProjectAlbums,
  getEventAlbums,
  getUserWorkspaceBusinesses,
  getUserWorkspaceEvents,
  getUserWorkspaceProjects,
} from "@/services/workspaces";
import { AlbumsData, WorkspaceData } from "@/types/common";
import { PostCategories } from "@/utils/constants";
import { getApiMedia } from "@/utils/getApiMedia";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const UploadMedia = ({
  type,
  open,
  handleModal,
  refetchPosts,
  initialBusinessId = null,
  initialProjectId = null,
  initialEventId = null,
  initialAlbums = null,
  post = null,
}: {
  type?: String;
  open: boolean;
  handleModal: (open: boolean) => void;
  refetchPosts: () => void;
  initialBusinessId?: string | null;
  initialProjectId?: string | null;
  initialEventId?: string | null;
  initialAlbums?: AlbumsData[] | null;
  post?: any | null;
}) => {
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [uploadProgressPercent, setUploadProgressPercent] = useState(0);
  const isEditing = !!post;

  // Form state
  const [form, setForm] = useState({
    title: "",
    caption: "",
    category: "",
    visible: "0",
    album: "",
    event: "",
    project: "",
    business: "",
  });

  // Media files state
  const [images, setImages] = useState<File[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [existingMedia, setExistingMedia] = useState<any[]>([]);
  const [mediaToDelete, setMediaToDelete] = useState<number[]>([]);

  // Filter and selection states
  const [accountType, setAccountType] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(initialEventId);
  const [selectedProject, setSelectedProject] = useState(initialProjectId);
  const [selectedBusiness, setSelectedBusiness] = useState(initialBusinessId);

  // Available albums (either from props or fetched)
  const [availableAlbums, setAvailableAlbums] = useState<AlbumsData[]>([]);

  // Success state
  const [successUpload, setSuccessUpload] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Image validation utility
  const imageValidator = (file: File) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  // Video validation utility using HTML5 video element
  const videoValidator = (file: File) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        resolve({
          width: video.videoWidth,
          height: video.videoHeight,
          duration: video.duration,
        });
        URL.revokeObjectURL(video.src);
      };

      video.onerror = reject;
      video.src = URL.createObjectURL(file);
    });
  };

  // Fetch user albums for personal account type
  const { data: personalAlbums } = useQuery({
    queryKey: ["ALbumsData"],
    queryFn: () =>
      getUserAlbums({
        limit: 100,
        page: 1,
      }),
    select: (response: any) => {
      return response?.data;
    },
    enabled: !initialBusinessId && !initialProjectId && !initialEventId,
  });

  // Fetch business albums when initialBusinessId is provided
  const { data: businessAlbumsData, isSuccess: businessAlbumsLoaded } =
    useQuery({
      queryKey: ["BusinessAlbumsData", selectedBusiness],
      queryFn: () =>
        selectedBusiness
          ? getBusinessAlbums(selectedBusiness, {
              page: 1,
              limit: 100,
            })
          : Promise.reject(new Error("Business ID is undefined")),
      select: (response: any) => {
        return response?.data;
      },
      enabled: !!selectedBusiness,
    });

  // Fetch project albums when initialProjectId is provided
  const { data: projectAlbumsData, isSuccess: projectAlbumsLoaded } = useQuery({
    queryKey: ["ProjectAlbumsData", selectedProject],
    queryFn: () =>
      selectedProject
        ? getProjectAlbums(selectedProject, {
            page: 1,
            limit: 100,
          })
        : Promise.reject(new Error("Project ID is undefined")),
    select: (response: any) => {
      return response?.data;
    },
    enabled: !!selectedProject,
  });

  // Fetch event albums when initialEventId is provided
  const { data: eventAlbumsData, isSuccess: eventAlbumsLoaded } = useQuery({
    queryKey: ["EventAlbumsData", selectedEvent],
    queryFn: () =>
      selectedEvent
        ? getEventAlbums(selectedEvent, {
            page: 1,
            limit: 100,
          })
        : Promise.reject(new Error("Event ID is undefined")),
    select: (response: any) => {
      return response?.data;
    },
    enabled: !!selectedEvent,
  });

  // Fetch workspace data
  const { data: business } = useQuery({
    queryKey: ["UserBusinessList", currentUser?.id ?? "anonymous"],
    queryFn: () =>
      currentUser?.id
        ? getUserWorkspaceBusinesses(currentUser.id, {
            page: 1,
            limit: 100,
            user_id: currentUser?.id ?? null,
          })
        : Promise.reject(new Error("User ID is undefined")),
    select: (response: any) => {
      return response?.data;
    },
  });

  const { data: projects } = useQuery({
    queryKey: ["UserProjectsList", currentUser?.id ?? "anonymous"],
    queryFn: () =>
      currentUser?.id
        ? getUserWorkspaceProjects(currentUser.id, {
            page: 1,
            limit: 100,
            user_id: currentUser?.id ?? null,
          })
        : Promise.reject(new Error("User ID is undefined")),
    select: (response: any) => {
      return response?.data;
    },
  });

  const { data: events } = useQuery({
    queryKey: ["UserEventsList", currentUser?.id ?? "anonymous"],
    queryFn: () =>
      currentUser?.id
        ? getUserWorkspaceEvents(currentUser.id, {
            page: 1,
            limit: 100,
            user_id: currentUser?.id ?? null
          })
        : Promise.reject(new Error("User ID is undefined")),
    select: (response: any) => {
      return response?.data;
    },
  });

  // Initialize form with post data when editing
  useEffect(() => {
    if (open && post) {
      // Set form data from post
      setForm({
        title: post?.title || "",
        caption: post?.description || "",
        category: post?.category?.id?.toString() || "",
        visible: post?.private?.toString() || "0",
        album: post?.album?.id?.toString() || "",
        event: post?.event?.id?.toString() || "",
        project: post?.project?.id?.toString() || "",
        business: post?.business?.id?.toString() || "",
      });

      // Set account type based on post source
      if (post?.source) {
        setAccountType(post.source === "personal" ? "personal" : post.source);
      }

      // Set existing media
      if (post?.medias && post.medias.length > 0) {
        setExistingMedia(post.medias);
      }

      // Set relevant workspace IDs
      if (post?.business) {
        setSelectedBusiness(post.business.id);
      } else if (post?.project) {
        setSelectedProject(post.project.id);
      } else if (post?.event) {
        setSelectedEvent(post.event.id);
      }
    } else if (open && !post) {
      // Reset form for new post creation
      resetForm();
    }
  }, [post, open]);

  // Set account type and initialize form based on provided IDs
  useEffect(() => {
    if (open && !post) {
      if (initialBusinessId && business) {
        const selectedBusiness = business.find(
          (b: WorkspaceData) => b.id === Number(initialBusinessId)
        );
        if (selectedBusiness) {
          setAccountType("business");
          setForm((prev) => ({
            ...prev,
            business: selectedBusiness.id.toString(),
          }));
        }
      } else if (initialProjectId && projects) {
        const selectedProject = projects.find(
          (p: WorkspaceData) => p.id === Number(initialProjectId)
        );
        if (selectedProject) {
          setAccountType("project");
          setForm((prev) => ({
            ...prev,
            project: selectedProject.id.toString(),
          }));
        }
      } else if (initialEventId && events) {
        const selectedEvent = events.find(
          (e: WorkspaceData) => e.id === Number(initialEventId)
        );
        if (selectedEvent) {
          setAccountType("event");
          setForm((prev) => ({
            ...prev,
            event: selectedEvent.id.toString(),
          }));
        }
      }
    }
  }, [
    initialBusinessId,
    initialProjectId,
    initialEventId,
    business,
    projects,
    events,
    open,
    post,
  ]);

  // Set available albums based on initial values or fetched data
  useEffect(() => {
    if (initialAlbums) {
      // If initial albums are provided directly, use them
      setAvailableAlbums(initialAlbums);
    } else if (initialBusinessId && businessAlbumsData) {
      // If initialBusinessId is provided and business albums are loaded, use them
      setAvailableAlbums(businessAlbumsData);
    } else if (initialProjectId && projectAlbumsData) {
      // If initialProjectId is provided and project albums are loaded, use them
      setAvailableAlbums(projectAlbumsData);
    } else if (initialEventId && eventAlbumsData) {
      // If initialEventId is provided and event albums are loaded, use them
      setAvailableAlbums(eventAlbumsData);
    } else if (
      personalAlbums &&
      !initialBusinessId &&
      !initialProjectId &&
      !initialEventId
    ) {
      // For personal account type without any workspace selection
      setAvailableAlbums(personalAlbums);
    }
  }, [
    initialAlbums,
    personalAlbums,
    initialBusinessId,
    initialProjectId,
    initialEventId,
    businessAlbumsData,
    projectAlbumsData,
    eventAlbumsData,
  ]);

  // Handle form field changes
  const onFormChange = (e: { target: { name: any; value: any } }) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle image/video file selection
  const onChangeImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    const maxImageFileSize = 30 * 1024 * 1024; // 30MB
    const maxVideoFileSize = 30 * 1024 * 1024; // 30MB
    const minImageDimension = 2000; // 2000px
    const minVideoDimension = 1080; // 1080px
    const minVideoDuration = 10; // 10s

    const validFiles: File[] = [];
    const invalidErrors: string[] = [];

    for (const file of selectedFiles) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      // ---- FILE TYPE ----
      if (!isImage && !isVideo) {
        const msg = "Unsupported file type";
        toast.error(msg);
        invalidErrors.push(msg);
        continue;
      }

      // ---- SIZE CHECK ----
      if (isImage && file.size > maxImageFileSize) {
        const msg = "Image size exceeds 30MB limit";
        toast.error(msg);
        invalidErrors.push(msg);
        continue;
      }

      if (isVideo && file.size > maxVideoFileSize) {
        const msg = "Video size exceeds 30MB limit";
        toast.error(msg);
        invalidErrors.push(msg);
        continue;
      }

      try {
        // ---- IMAGE VALIDATION ----
        if (isImage) {
          const { width, height } = await imageValidator(file);

          if (width < minImageDimension && height < minImageDimension) {
            const msg = `Image must be at least ${minImageDimension}px on one side`;
            toast.error(msg);
            invalidErrors.push(msg);
            continue;
          }

          validFiles.push(file);
          continue;
        }

        // ---- VIDEO VALIDATION ----
        if (isVideo) {
          const { width, height, duration } = await videoValidator(file);

          if (duration < minVideoDuration) {
            const msg = `Video must be at least ${minVideoDuration} seconds long`;
            toast.error(msg);
            invalidErrors.push(msg);
            continue;
          }

          if (width < minVideoDimension && height < minVideoDimension) {
            const msg = `Video must be at least ${minVideoDimension}px on one side`;
            toast.error(msg);
            invalidErrors.push(msg);
            continue;
          }

          validFiles.push(file);
        }
      } catch {
        const msg = `Failed to validate ${isImage ? "image" : "video"}`;
        toast.error(msg);
        invalidErrors.push(msg);
      }
    }

    // --- SET STATES ---
    if (invalidErrors.length > 0) {
      // show only last triggered error (cleaner UX)
      setErrorMessage(invalidErrors[invalidErrors.length - 1]);
    } else {
      setErrorMessage("");
    }

    setImages(validFiles);
  };

  const onChangeThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setThumbnailFile(null);
      return;
    }

    const file = e.target.files[0];
    const maxImageFileSize = 30 * 1024 * 1024; // 30MB
    const minImageDimension = 1000; // Minimum dimension for thumbnail

    // Validate file type
    if (!file.type.startsWith("image/")) {
      const message = `Please select an image file for thumbnail`;
      toast.error(message);
      setErrorMessage(message);
      return;
    }

    // Validate file size
    if (file.size > maxImageFileSize) {
      const message = `Thumbnail size exceeds 30MB limit`;
      toast.error(message);
      setErrorMessage(message);
      return;
    }

    try {
      const { width, height } = (await imageValidator(file)) as {
        width: number;
        height: number;
      };

      if (width < minImageDimension || height < minImageDimension) {
        const message = `Thumbnail must be at least ${minImageDimension}x${minImageDimension} pixels`;
        toast.error(message);
        setErrorMessage(message);
        return;
      }

      setThumbnailFile(file);
    } catch (error) {
      const message = `Failed to validate thumbnail`;
      toast.error(message);
      setErrorMessage(message);
    }
  };

  // Handle removing an existing media
  const removeExistingMedia = (mediaId: number) => {
    setExistingMedia(existingMedia.filter((media) => media.id !== mediaId));
    setMediaToDelete((prev) => [...prev, mediaId]);
  };

  // Reset form
  const resetForm = () => {
    setForm({
      title: "",
      caption: "",
      category: "",
      visible: "0",
      album: "",
      event: "",
      project: "",
      business: "",
    });
    setImages([]);
    setExistingMedia([]);
    setMediaToDelete([]);
    setError(false);
    setAccountType("");
    setCategoryDescription("");
    setSelectedEvent(initialEventId);
    setSelectedProject(initialProjectId);
    setSelectedBusiness(initialBusinessId);
    setSuccessUpload(false);
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);

    try {
      let formData = new FormData();

      // Append basic fields
      formData.append("title", form.title);
      formData.append("description", form.caption);
      if (type) {
        formData.append("type", type.toString());
      }
      formData.append("category_id", form.category);

      // Append conditional fields
      if (form.album) formData.append("album_id", form.album);
      if (form.event) formData.append("event_id", form.event);
      if (form.project) formData.append("project_id", form.project);
      if (form.business) formData.append("business_id", form.business);
      // Append thumbnail for video type
      if (type === "video" && thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      // Handle privacy setting
      if (form.album && JSON.parse(form?.album)?.private) {
        formData.append("private", "1");
      } else {
        formData.append("private", parseInt(form.visible).toString());
      }

      // Append media files
      for (let i = 0; i < images?.length; i++) {
        formData.append("media_files[]", images[i]);
      }

      // For editing, include media to delete
      if (isEditing && mediaToDelete.length > 0) {
        formData.append("media_to_delete", JSON.stringify(mediaToDelete));
      }
      if (isEditing) {
        formData.append("_method", "patch");
      }

      let response;
      if (isEditing) {
        // Update existing post
        response = await updatePost(post.id, formData, (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgressPercent(percentCompleted);
        });
        toast.success("Post updated successfully");
      } else {
        // Create new post
        response = await createPost(formData, (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgressPercent(percentCompleted);
        });
        toast.success(`${type} uploaded successfully`);
      }

      // Handle success
      const data = response?.data;
      // Handle success
      setUploadedImage(data?.media_url || data?.medias?.[0]?.large_thumbnail);
      // setSuccessUpload(true);
      refetchPosts();
      // toast.success(`${type} uploaded successfully`);
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Failed to upload media");
      // toast.error("Failed to upload media");
    } finally {
      setLoading(false);
      handleModal(false);
    }
  };

  // Function to get category description
  const getCategoryDescription = (categoryId: any) => {
    const category = PostCategories.find((cat) => cat.id == categoryId);
    return category?.description || "";
  };

  // Reset form when modal closes
  const handleClose = () => {
    resetForm();
    handleModal(false);
  };

  return (
    <Modal
      show={open}
      onAction={handleSubmit}
      size="2xl"
      actionButton={`${isEditing ? "Update" : "Create"}`}
      actionDisabled={error}
      cancelButton="Cancel"
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="dark"
      onCloseAction={() => handleModal(false)}
    >
      {!successUpload ? (
        <div className="px-2 py-4">
          <h1 className="text-center font-medium text-lg lg:text-xl mb-4">
            {isEditing
              ? `Edit ${type === "image" ? "Photo" : "Video"}`
              : `Upload ${type === "image" ? "Photo" : "Video"}`}
          </h1>

          <form className="space-y-6">
            {/* Title field */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={onFormChange}
                className="w-full p-3 border rounded-lg outline-none"
                placeholder="Name of your content"
                required
              />
            </div>

            {/* File upload field */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                {isEditing
                  ? `Change ${type === "image" ? "Photos" : "Video"} (Optional)`
                  : `Select ${type === "image" ? "Photos" : "a Video"}`}
                {!isEditing && <span className="text-red-500">*</span>}
              </label>
              {/* {error && (
                <p className="text-xs text-red-500 mb-1">
                  {type === "image"
                    ? "Minimum accepted resolution: 2000px X 2000px, Maximum size: 30MB"
                    : "Minimum accepted resolution: 1920 x 1080px  Minimum duration: 10 seconds, Minimum resolution: 1080 × 1080px, Maximum size: 30MB"}
                </p>
              )} */}
              {errorMessage && (
                <p className="text-xs text-red-500 mb-1">{errorMessage}</p>
              )}

              {/* Display existing media when editing */}
              {isEditing && existingMedia.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm mb-2">Current media:</p>
                  <div className="flex flex-wrap gap-2">
                    {existingMedia.map((media) => (
                      <div key={media.id} className="relative group">
                        <img
                          src={getApiMedia(
                            media.medium_thumbnail || media.path
                          )}
                          alt="Existing media"
                          className="w-24 h-24 object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingMedia(media.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <input
                type="file"
                id="media"
                onChange={onChangeImages}
                multiple={type === "image"}
                className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                accept={type === "image" ? "image/*" : "video/*"}
              />
            </div>

            {type === "video" && (
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Video Thumbnail
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  onChange={onChangeThumbnail}
                  className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                  accept="image/*"
                />
                {thumbnailFile && (
                  <div className="mt-2">
                    <p className="text-sm text-green-600">
                      Thumbnail selected: {thumbnailFile.name}
                    </p>
                    <img
                      src={URL.createObjectURL(thumbnailFile)}
                      alt="Thumbnail preview"
                      className="w-32 h-32 object-cover rounded-md border mt-2"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Progress bar for upload */}
            {loading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-na_red h-2.5 rounded-full"
                  style={{ width: `${uploadProgressPercent}%` }}
                ></div>
              </div>
            )}

            {/* Caption field */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Caption <span className="text-red-500">*</span>
              </label>
              <textarea
                name="caption"
                rows={4}
                value={form.caption}
                onChange={onFormChange}
                className="w-full p-3 border rounded-lg outline-none"
                placeholder={`Tell the world the story behind your ${type}`}
                required
              ></textarea>
            </div>

            {/* Category select */}

            {initialBusinessId || initialProjectId || initialEventId ? (
              <div>
                <label className="block mb-2 text-sm font-medium">
                  {type === "image" ? "Photo" : "Video"} Category{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={(e) => {
                    onFormChange(e);
                    setCategoryDescription(
                      getCategoryDescription(e.target.value)
                    );
                  }}
                  className="w-full p-3 border rounded-lg outline-none text-gray-700"
                  required
                >
                  <option value="">-- Select --</option>
                  {PostCategories.map((item: any) => (
                    <option
                      key={item.id}
                      value={item.id}
                      className="capitalize"
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
                {categoryDescription && (
                  <p className="mt-1 text-xs text-na_blue">
                    {categoryDescription}
                  </p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    {type === "image" ? "Photo" : "Video"} Category{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={(e) => {
                      onFormChange(e);
                      setCategoryDescription(
                        getCategoryDescription(e.target.value)
                      );
                    }}
                    className="w-full p-3 border rounded-lg outline-none text-gray-700"
                    required
                  >
                    <option value="">-- Select --</option>
                    {PostCategories.map((item: any) => (
                      <option
                        key={item.id}
                        value={item.id}
                        className="capitalize"
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {categoryDescription && (
                    <p className="mt-1 text-xs text-na_blue">
                      {categoryDescription}
                    </p>
                  )}
                </div>

                {/* Account type select - Only show if no initial values provided */}

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Select Account Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="accountType"
                    value={accountType}
                    onChange={(e) => {
                      setForm((prev) => ({
                        ...prev,
                        album: "",
                        event: "",
                        project: "",
                        business: "",
                      }));
                      setAccountType(e.target.value);
                    }}
                    className="w-full p-3 border rounded-lg outline-none text-gray-700"
                  >
                    <option value="">-- Select --</option>
                    <option value="personal">Personal</option>
                    {events?.length > 0 && <option value="event">Event</option>}
                    {projects?.length > 0 && (
                      <option value="project">Project</option>
                    )}
                    {business?.length > 0 && (
                      <option value="business">Organisation</option>
                    )}
                  </select>
                </div>
              </div>
            )}

            {/* Personal album select */}
            {accountType === "personal" && (
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Select Album <span className="text-red-500">*</span>
                </label>
                {availableAlbums?.filter(
                  (album: AlbumsData) =>
                    album.event_id === null &&
                    album.project_id === null &&
                    album.business_id === null
                )?.length > 0 ? (
                  <select
                    name="album"
                    value={form.album}
                    onChange={onFormChange}
                    className="w-full p-3 border rounded-lg outline-none text-gray-700"
                    required={accountType === "personal"}
                  >
                    <option value="">-- Select --</option>
                    {availableAlbums
                      ?.filter(
                        (album: AlbumsData) =>
                          album.event_id === null &&
                          album.project_id === null &&
                          album.business_id === null
                      )
                      ?.map((album: AlbumsData) => (
                        <option key={album.id} value={album?.id}>
                          {album.name}
                        </option>
                      ))}
                  </select>
                ) : (
                  <p className="text-na_blue text-sm">
                    You {`don't`} have any albums
                  </p>
                )}
              </div>
            )}

            {/* Event select */}
            {(accountType === "event" || initialEventId) && (
              <div className="space-y-6">
                {!initialEventId && (
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Select Event <span className="text-red-500">*</span>
                    </label>
                    {events?.length > 0 ? (
                      <select
                        name="event"
                        value={form.event}
                        onChange={(e) => {
                          onFormChange(e);
                          if (e.target.value) {
                            // const selectedEventId = JSON.parse(
                            //   e.target.value
                            // ).id;
                            setSelectedEvent(e.target.value);
                          }
                        }}
                        className="w-full p-3 border rounded-lg outline-none text-gray-700"
                        required={accountType === "event"}
                      >
                        <option value="">-- Select --</option>
                        {events?.map((event: WorkspaceData) => (
                          <option key={event.id} value={event?.id.toString()}>
                            {event.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-na_blue text-sm">
                        No events available
                      </p>
                    )}
                  </div>
                )}

                {/* Event album select */}
                {eventAlbumsLoaded && eventAlbumsData?.length > 0 ? (
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Select Event Album <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="album"
                      value={form.album}
                      onChange={onFormChange}
                      className="w-full p-3 border rounded-lg outline-none text-gray-700"
                    >
                      <option value="">-- Select --</option>
                      {eventAlbumsData?.map((album: AlbumsData) => (
                        <option key={album.id} value={album.id.toString()}>
                          {album.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (initialAlbums?.length ?? 0) > 0 ? (
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Select Event Album <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="album"
                      value={form.album}
                      onChange={onFormChange}
                      className="w-full p-3 border rounded-lg outline-none text-gray-700"
                    >
                      <option value="">-- Select --</option>
                      {initialAlbums?.map((album: AlbumsData) => (
                        <option key={album.id} value={album.id.toString()}>
                          {album.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p className="text-na_blue text-sm">
                    {!eventAlbumsData?.length ||
                      (!initialAlbums?.length &&
                        " No albums available for this event")}
                  </p>
                )}
              </div>
            )}

            {/* Project select */}
            {(accountType === "project" || initialProjectId) && (
              <div className="space-y-6">
                {!initialProjectId && (
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Select Project <span className="text-red-500">*</span>
                    </label>
                    {projects?.length > 0 ? (
                      <select
                        name="project"
                        value={form.project}
                        onChange={(e) => {
                          onFormChange(e);
                          if (e.target.value) {
                            // const selectedProjectId = JSON.parse(
                            //   e.target.value
                            // ).id;
                            setSelectedProject(e.target.value);
                          }
                        }}
                        className="w-full p-3 border rounded-lg outline-none text-gray-700"
                        required={accountType === "project"}
                      >
                        <option value="">-- Select --</option>
                        {projects?.map((project: WorkspaceData) => (
                          <option
                            key={project.id}
                            value={project.id.toString()}
                            selected={
                              initialProjectId === project.id.toString()
                            }
                          >
                            {project.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-na_blue text-sm">
                        No projects available
                      </p>
                    )}
                  </div>
                )}

                {/* Project album select */}
                {projectAlbumsLoaded && projectAlbumsData?.length > 0 ? (
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Select Project Album{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="album"
                      value={form.album}
                      onChange={onFormChange}
                      className="w-full p-3 border rounded-lg outline-none text-gray-700"
                    >
                      <option value="">-- Select --</option>
                      {projectAlbumsData?.map((album: AlbumsData) => (
                        <option key={album.id} value={album.id.toString()}>
                          {album.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (initialAlbums?.length ?? 0) > 0 ? (
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Select Project Album{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="album"
                      value={form.album}
                      onChange={onFormChange}
                      className="w-full p-3 border rounded-lg outline-none text-gray-700"
                    >
                      <option value="">-- Select --</option>
                      {initialAlbums?.map((album: AlbumsData) => (
                        <option key={album.id} value={album.id.toString()}>
                          {album.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p className="text-na_blue text-sm">
                    {!projectAlbumsData?.length ||
                      (!initialAlbums?.length &&
                        " No albums available for this project")}
                  </p>
                )}
              </div>
            )}

            {/* Business select */}
            {(accountType === "business" || initialBusinessId) && (
              <div className="space-y-6">
                {!initialBusinessId && (
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Select Organisation
                      <span className="text-red-500">*</span>
                    </label>
                    {business?.length > 0 ? (
                      <select
                        name="business"
                        value={form.business}
                        onChange={(e) => {
                          onFormChange(e);
                          if (e.target.value) {
                            setSelectedBusiness(e.target.value);
                          }
                        }}
                        className="w-full p-3 border rounded-lg outline-none text-gray-700"
                        required={accountType === "business"}
                      >
                        <option value="">-- Select --</option>
                        {business?.map((business: WorkspaceData) => (
                          <option
                            key={business.id}
                            value={business.id.toString()}
                            selected={
                              initialBusinessId === business.id.toString()
                            }
                          >
                            {business.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-na_blue text-sm">
                        No organisations available
                      </p>
                    )}
                  </div>
                )}

                {/* Business album select */}
                {businessAlbumsLoaded && businessAlbumsData?.length > 0 ? (
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Select Organisation Album
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="album"
                      value={form.album}
                      onChange={onFormChange}
                      className="w-full p-3 border rounded-lg outline-none text-gray-700"
                    >
                      <option value="">-- Select --</option>
                      {businessAlbumsData?.map((album: AlbumsData) => (
                        <option key={album.id} value={album?.id.toString()}>
                          {album.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (initialAlbums?.length ?? 0) > 0 ? (
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Select Organisation Album{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="album"
                      value={form.album}
                      onChange={onFormChange}
                      className="w-full p-3 border rounded-lg outline-none text-gray-700"
                    >
                      <option value="">-- Select --</option>
                      {initialAlbums?.map((album: AlbumsData) => (
                        <option key={album.id} value={album?.id.toString()}>
                          {album.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p className="text-na_blue text-sm">
                    {!businessAlbumsData?.length ||
                      (!initialAlbums?.length &&
                        " No albums available for this organisation")}
                  </p>
                )}
              </div>
            )}

            {/* Visibility select */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Visibility
              </label>
              <select
                name="visible"
                value={form.visible}
                onChange={onFormChange}
                disabled={
                  (accountType && accountType !== "personal") ||
                  (form.album && JSON.parse(form?.album)?.private)
                }
                className="w-full p-3 border rounded-lg outline-none text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="0">Public</option>
                <option value="1">Private</option>
              </select>
              <p className="mt-1 text-xs text-na_blue">
                {accountType && accountType !== "personal"
                  ? `${
                      accountType?.toLowerCase() === "business"
                        ? "Organisation"
                        : accountType
                    } can only be public`
                  : form.album && JSON.parse(form?.album)?.private
                  ? "Posts in private albums are private"
                  : form.visible === "1"
                  ? "Private means visible to only me"
                  : "Public means visible to everyone"}
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center p-6">
          <h2 className="text-xl font-medium mb-4">Upload Successful!</h2>
          {uploadedImage && (
            <div className="mb-4 w-full max-w-xs overflow-hidden rounded-lg">
              <img
                src={uploadedImage}
                alt="Uploaded media"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          <div className="flex space-x-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Close
            </button>
            <button
              onClick={() => setSuccessUpload(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Upload More
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UploadMedia;
