// @ts-nocheck
"use client";
import CountryDropdown from "@/components/molecules/CountryDropdown";
import CustomDropdown from "@/components/molecules/CustomDropdown";
import Modal from "@/components/molecules/Modal";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { editIndustry, getSearchUsersList } from "@/services/admin";
import { getIndustries } from "@/services/signup";
import {
  createProjectWorkspace,
  updateProjectWorkspace,
} from "@/services/workspaces";
import { filterUsers } from "@/services/professional";
import { UserData } from "@/types/admin";
import { WorkspaceData } from "@/types/common";
import { getApiMedia } from "@/utils/getApiMedia";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ProjectForm = ({
  project,
  open,
  handleModal,
  refetchProjects,
}: {
  project: WorkspaceData | null;
  open: boolean;
  handleModal: (open: boolean) => void;
  refetchProjects: () => void;
}) => {
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [step, setStep] = useState(1);
  const [tagline, setTagline] = useState("");
  const [industry, setIndustry] = useState("");
  const [other_industry, setOther_industry] = useState<string | null>(null);
  const [otherIndustry, setOtherIndustry] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [searchParam, setsearchParam] = useState("");
  const [teamMemberId, setTeamMemberId] = useState([currentUser?.id]);
  const [teamMember, setTeamMember] = useState<UserData[]>([]);
  const [userName, setTeamMemberName] = useState("");
  const defaultImg = "/assets/Img/default.png";
  const addTeamMember = (item: UserData) => {
    const isMemberAdded = teamMemberId.includes(item.id);
    if (!isMemberAdded) {
      setTeamMemberId([...teamMemberId, item.id]);
      setTeamMember([...teamMember, item]);
    }
  };

  const removeTeamMember = (id: number) => {
    const result = teamMember.filter((_, idx) => idx !== id);
    setTeamMember(result);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const resetForm = () => {
    setName("");
    setTagline("");
    setCountry("");
    setIndustry("");
    setOther_industry(null);
    setOtherIndustry(false);
    setDescription("");
    setWebsite("");
    setFacebook("");
    setInstagram("");
    setTwitter("");
    setYoutube("");
    setLinkedin("");
    setFile(null);
    setPreview(null);
    setsearchParam("");
    setTeamMemberId([currentUser?.id]); // Reset to only the current user
    setTeamMember([]);
  };

  const { data: searchResult, isLoading: fetching } = useQuery({
    queryKey: ["filterUsersList", searchParam],
    queryFn: () =>
      filterUsers({
        query: searchParam,
      }),
    select: (response: any) => {
      return response?.data;
    },
  });

  // Update name when industry changes or modal opens
  useEffect(() => {
    if (open) {
      setName(project?.name || "");
      setTagline(project?.specialize || "");
      setCountry(project?.country?.toLowerCase() || "");
      setIndustry(project?.industry?.id || "");
      setOther_industry(project?.other_industry || "");
      if (project?.other_industry) {
        setOtherIndustry(true);
      }
      setDescription(project?.description || "");
      setWebsite(project?.project_profile?.website || "");
      setFacebook(project?.project_profile?.facebook || "");
      setInstagram(project?.project_profile?.instagram || "");
      setTwitter(project?.project_profile?.twitter || "");
      setYoutube(project?.project_profile?.youtube || "");
      setLinkedin(project?.project_profile?.linkedin || "");
      setFile(null);
      setPreview(null);
      setsearchParam("");
      setTeamMemberId([currentUser?.id]); // Reset to only the current user
      setTeamMember([]);
    }
  }, [project, open]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setName("");
    }
  }, [open]);

  const handleSubmit = async () => {
    try {
      if (project?.id) {
        if (step === 1) {
          setStep(2);
          return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("tagline", tagline);
        formData.append("country", country);
        formData.append("industry_id", industry === 22 ? "" : industry);
        formData.append("description", description);
        formData.append("website", website);
        formData.append("facebook", facebook);
        formData.append("instagram", instagram);
        formData.append("twitter", twitter);
        formData.append("linkedin", linkedin);
        formData.append("youtube", youtube);
        formData.append("project_id", project?.id.toString());
        const validTeamMembers = teamMemberId.filter(
          (id) => id !== null && id !== undefined
        );
        formData.append("collaborator_id", validTeamMembers.join(","));
        if (file) formData.append("logo", file);
        formData.append("specialize", tagline);
        formData.append("private", currentUser?.user?.private || "0");
        formData.append("source", "hi there");
        formData.append(
          "other_industry",
          other_industry !== null ? other_industry : ""
        );
        const res = await updateProjectWorkspace(formData);
        toast.success("Project Updated Successfully");
        refetchProjects();
      } else {
        if (step === 1) {
          setStep(2);
          return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("tagline", tagline);
        formData.append("country", country);
        formData.append("industry_id", industry === "20" ? "" : industry);
        formData.append("description", description);
        formData.append("website", website);
        formData.append("facebook", facebook);
        formData.append("instagram", instagram);
        formData.append("twitter", twitter);
        formData.append("linkedin", linkedin);
        formData.append("youtube", youtube);
        const validTeamMembers = teamMemberId.filter(
          (id) => id !== null && id !== undefined
        );
        formData.append("collaborator_id", validTeamMembers.join(","));
        if (file) formData.append("logo", file);
        formData.append("specialize", tagline);
        formData.append("private", currentUser?.user?.private || "0");
        formData.append("source", "hi there");
        formData.append(
          "other_industry",
          other_industry !== null ? other_industry : ""
        );
        const { data } = await createProjectWorkspace(formData);
        toast.success("project Created Successfully");
      }

      refetchProjects();
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "An error occurred"
      );
    } finally {
      if (step === 2) {
        setLoading(false);
        handleModal(false);
        resetForm();
        setStep(1);
      }
    }
  };

  const {
    data: industries,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["Industry"],
    queryFn: async () => await getIndustries(),
  });

  const handleSelected = (industryId: string | number | null) => {
    if (industryId) {
      setIndustry(industryId);
      console.log(industryId);
      if (industryId === 22) {
        setOtherIndustry(true);
      }
    }
  };

  function onCloseAction() {
    if (step === 2) {
      setStep(1);
      return;
    }
    handleModal(false);
  }
  return (
    <Modal
      show={open}
      onAction={handleSubmit}
      cancelButton={`${step === 1 ? "Cancel" : "Previous"}`}
      size="2xl"
      actionButton={`${step === 1 ? "Next" : project ? "Update" : "Create"}`}
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="dark"
      onCloseAction={() => onCloseAction()}
    >
      <h1 className="text-center font-medium text-lg lg:text-xl capitalize mb-2">
        {project ? `Update ${project?.name}` : "Add project"} ?
      </h1>
      {step === 1 && (
        <div className="mx-auto">
          <form className="">
            <h1 className="mb-1 lg:text-base">Name</h1>
            <input
              required
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              className="lg:text-base text-xs p-2 mb-2 border w-full rounded outline-none"
              placeholder="Name of your project"
            />
            <h1 className="mb-1  lg:text-base ">Tagline</h1>
            <input
              required
              type="text"
              onChange={(e) => {
                setTagline(e.target.value);
              }}
              value={tagline}
              className="lg:text-base text-xs p-2.5 mb-2 border w-full rounded outline-none"
              placeholder="Say something about your project"
            />

            <div className="my-2 w-full grid lg:grid-cols-2 gap-2 ">
              <div className="">
                {otherIndustry ? (
                  <div>
                    <h1 className="mb-1  lg:text-base ">Other Industry</h1>
                    <input
                      type="text"
                      placeholder="Type your industry"
                      id="industry"
                      required
                      onChange={(e) => {
                        setOther_industry(e.target.value);
                      }}
                      value={other_industry || ""}
                      className="lg:text-base text-xs p-2 border w-full rounded outline-none"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="lg:text-base mb-1">Industry</h1>
                    <CustomDropdown
                      id={"industriesList"}
                      dataList={industries}
                      selectedOption={industry}
                      onSelected={handleSelected}
                      placeholder="Select an industry"
                      canSearch={true}
                      className={""}
                    />
                  </>
                )}
              </div>

              <div className="">
                <h1 className="mb-1 lg:text-base">Country</h1>

                <CountryDropdown
                  id="user-country"
                  preferredCountries={["us", "ca", "gb"]}
                  value={country}
                  onChange={(value) => setCountry(value)}
                />
              </div>
            </div>

            <div>
              <h1 className="mb-1 lg:text-base">Description</h1>
              <textarea
                name=""
                id=""
                cols={30}
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project"
                className="lg:text-base text-xs p-2.5 mb-2 border w-full rounded outline-none"
              ></textarea>
            </div>

            <div className="my-1 w-full grid lg:grid-cols-2 gap-2 ">
              <div>
                <h1 className="mb-1 lg:text-base ">LinkedIn</h1>
                <input
                  required
                  type="text"
                  onChange={(e) => {
                    setLinkedin(e.target.value);
                  }}
                  value={linkedin}
                  className="lg:text-base text-xs p-2.5 mb-2 border w-full rounded outline-none"
                  placeholder="https://letivi.com"
                />
              </div>
              <div>
                <h1 className="mb-1  lg:text-base ">Website</h1>
                <input
                  required
                  type="text"
                  onChange={(e) => {
                    setWebsite(e.target.value);
                  }}
                  value={website}
                  className="lg:text-base text-xs p-2.5 mb-2 border w-full rounded outline-none"
                  placeholder="https://letivi.com"
                />
              </div>
              <div>
                <h1 className="mb-1 lg:text-base ">Facebook</h1>
                <input
                  required
                  type="text"
                  onChange={(e) => {
                    setFacebook(e.target.value);
                  }}
                  value={facebook}
                  className="lg:text-base text-xs p-2.5 mb-2 border w-full rounded outline-none"
                  placeholder="https://letivi.com"
                />
              </div>
              <div>
                <h1 className="mb-1  lg:text-base ">Instagram</h1>
                <input
                  required
                  type="text"
                  onChange={(e) => {
                    setInstagram(e.target.value);
                  }}
                  value={instagram}
                  className="lg:text-base text-xs p-2.5 mb-2 border w-full rounded outline-none"
                  placeholder="https://letivi.com"
                />
              </div>
              <div>
                <h1 className="mb-1  lg:text-base ">Twitter</h1>
                <input
                  required
                  onChange={(e) => {
                    setTwitter(e.target.value);
                  }}
                  type="text"
                  value={twitter}
                  className="lg:text-base text-xs p-2.5 mb-2 border w-full rounded outline-none"
                  placeholder="https://letivi.com"
                />
              </div>
              <div>
                <h1 className="mb-1 lg:text-base">Youtube</h1>
                <input
                  required
                  type="text"
                  onChange={(e) => {
                    setYoutube(e.target.value);
                  }}
                  value={youtube}
                  className="lg:text-base text-xs p-2.5 mb-2 border w-full rounded outline-none"
                  placeholder="https://letivi.com"
                />
              </div>
            </div>
          </form>
        </div>
      )}

      {step === 2 && (
        <div>
          {!project?.id && (
            <>
              <h1 className="font-semibold text-xl text-gray-800">
                Additional Information
              </h1>
              <p className="text-gray-500 text-base mt-2">Collaborators List</p>

              <input
                value={userName}
                onChange={(e) => {
                  setTeamMemberName(e.target.value);
                  setsearchParam(e.target.value);
                }}
                placeholder="Search a user to add as collaborator"
                className="bg-white border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-2"
              />

              {searchParam?.length > 0 && (
                <div className="border max-h-40 overflow-y-auto">
                  {searchResult?.length > 0 && (
                    <ul className="space-y-2">
                      {searchResult?.map((item: UserData, idx: string) => {
                        return (
                          <li
                            key={idx}
                            onClick={() => {
                              addTeamMember(item);
                            }}
                            className="p-2 flex items-center hover:bg-slate-400"
                          >
                            {item?.picture ? (
                              <img
                                src={getApiMedia(item?.picture || "")}
                                className=" object-cover h-10 w-10 rounded-full mr-2 "
                                alt=""
                              />
                            ) : (
                              <div className="rounded-full border border-blue-500 w-10  h-10 flex justify-center items-center mr-2">
                                {item?.first_name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            {item.first_name} {item.last_name}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {searchResult?.length === 0 && (
                    <div className="text-na_red text-center py-2">
                      No result found
                    </div>
                  )}
                </div>
              )}

              {teamMember.length > 0 && (
                <div className="border">
                  <ul className="space-x-1 flex gap-y-2 flex-wrap p-2">
                    {teamMember.map((item: UserData, idx: number) => {
                      return (
                        <span
                          key={idx}
                          role="alert"
                          className="inline-flex items-center bg-gray-100 text-gray-700 border border-gray-500 text-xs font-medium mr-2 px-1.5 rounded-full py-1"
                        >
                          {item?.picture ? (
                            <img
                              src={getApiMedia(item?.picture)}
                              alt="Rounded avatar"
                              className="w-4 h-4 mr-1 rounded-full"
                            />
                          ) : (
                            <img
                              src={defaultImg}
                              alt="Rounded avatar"
                              className="w-4 h-4 mr-1 rounded-full"
                            />
                          )}
                          {item?.first_name}{" "}
                          <button
                            type="button"
                            onClick={() => {
                              removeTeamMember(idx);
                            }}
                            className="inline-flex items-center p-0.5 ml-1 text-sm  bg-transparent rounded-full hover:bg-gray-200 "
                            data-dismiss="alert"
                          >
                            <img
                              src={"/assets/Svg/cancel.svg"}
                              alt=""
                              className="ml-1 h-5 w-5 cursor-pointer "
                            />
                            <span className="sr-only">Remove badge</span>
                          </button>
                        </span>
                      );
                    })}
                  </ul>
                </div>
              )}
            </>
          )}

          <p className="text-gray-500 text-base mt-3 mb-1">
            project Flyer / Poster
          </p>
          <label
            htmlFor="file-upload"
            className="w-full py-10 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              id="file-upload"
              type="file"
              hidden
              accept="image/png, image/jpeg, application/pdf"
              onChange={handleFileChange}
            />
            <div className="grid gap-1">
              {!file && (
                <h2 className="text-center text-gray-400 text-xs leading-4">
                  PNG, JPG or PDF, smaller than 15MB
                </h2>
              )}
            </div>
            <div className="grid gap-2">
              {!file && (
                <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
                  Drag and Drop your file here or Click to Upload
                </h4>
              )}

              {file && (
                <div className="flex flex-col items-center">
                  {preview && file.type.startsWith("image/") && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  )}
                  <p className="text-xs text-gray-600 mt-1">{file.name}</p>
                </div>
              )}
            </div>
          </label>
          <div className="mt-4"></div>
        </div>
      )}

      <br />
    </Modal>
  );
};

export default ProjectForm;
