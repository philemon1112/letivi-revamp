"use client";
import { Button } from "@/components/atoms/Button";
import { fetchUserProjects, updateUserProjects } from "@/services/biography";
import { Project, ProjectUpdatePayload } from "@/types/biography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/atoms/Loader";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";

const ProjectsForm = () => {
  const queryClient = useQueryClient();

  // Fetch current user projects
  const { data: projectsData, isPending } = useQuery({
    queryKey: ["projectsList"],
    queryFn: fetchUserProjects,
  });

  // Initialize state with fetched data or empty arrays
  const [projects, setProjects] = useState<Project>({
    books: [],
    articles: [],
    photography: [],
    films: [],
    exhibition: [],
    others: [],
  });

  useEffect(() => {
    if (projectsData?.data) {
      setProjects({
        books: projectsData.data.books || [],
        articles: projectsData.data.articles || [],
        photography: projectsData.data.photography || [],
        films: projectsData.data.films || [],
        exhibition: projectsData.data.exhibition || [],
        others: projectsData.data.others || [],
      });
    }
  }, [projectsData]);

  // Set up mutation for updating projects
  const updateProjectMutation = useMutation({
    mutationFn: updateUserProjects,
    onSuccess: () => {
      toast.success("Projects updated successfully");
      queryClient.invalidateQueries({ queryKey: ["projectsList"] });
    },
    onError: (error) => {
      toast.error("Failed to update projects");
    },
  });

  // Handler for input changes
  const handleChange = (
    categoryKey: keyof Project,
    index: number,
    value: string
  ) => {
    setProjects((prev) => ({
      ...prev,
      [categoryKey]: prev[categoryKey].map((item, idx) =>
        idx === index ? { ...item, name: value } : item
      ),
    }));
  };

  // Add a new item to a category
  const addNewItem = (categoryKey: keyof Project) => {
    setProjects((prev) => ({
      ...prev,
      [categoryKey]: [...prev[categoryKey], { name: "" }],
    }));
  };

  // Remove an item from a category
  const removeItem = (categoryKey: keyof Project, index: number) => {
    setProjects((prev) => ({
      ...prev,
      [categoryKey]: prev[categoryKey].filter((_, idx) => idx !== index),
    }));
  };

  // Submit form data
  const updateUserProjectsData = () => {
    // Convert form data to string arrays for the API request
    // Filter out empty items and extract just the name strings
    const payload: ProjectUpdatePayload = {
      books: projects.books
        .filter((item) => item.name && item.name.trim() !== "")
        .map((item) => item.name),
      articles: projects.articles
        .filter((item) => item.name && item.name.trim() !== "")
        .map((item) => item.name),
      photography: projects.photography
        .filter((item) => item.name && item.name.trim() !== "")
        .map((item) => item.name),
      films: projects.films
        .filter((item) => item.name && item.name.trim() !== "")
        .map((item) => item.name),
      exhibition: projects.exhibition
        .filter((item) => item.name && item.name.trim() !== "")
        .map((item) => item.name),
      others: projects.others
        .filter((item) => item.name && item.name.trim() !== "")
        .map((item) => item.name),
    };

    // Call mutation to update projects
    updateProjectMutation.mutate(payload);
  };

  const isAllEmpty = Object.values(projects).every(
    (items) =>
      items.length === 0 || items.every((item: any) => item.name.trim() === "")
  );

  // Generate a project category section with its items
  const renderCategory = (
    categoryKey: keyof Project,
    categoryLabel: string
  ) => {
    return (
      <div>
        {projects[categoryKey].map((item, idx) => (
          <div key={idx}>
            <div className="my-2">
              <div>
                <div className="mb-2 border-b border-na_blue flex justify-between items-center">
                  <label
                    htmlFor={categoryKey}
                    className="lg:text-base text-sm font-bold"
                  >
                    {categoryLabel}
                  </label>
                </div>
                <textarea
                  required
                  name={categoryKey}
                  placeholder={`Kindly provide a title, a short description and a web link to the ${categoryKey.slice(
                    0,
                    -1
                  )} if available`}
                  rows={4}
                  value={item.name}
                  onChange={(e) =>
                    handleChange(categoryKey, idx, e.target.value)
                  }
                  className="p-2 bg-gray-100 w-full border outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
            {idx !== 0 && (
              <div className="flex justify-end px-4">
                <button
                  onClick={() => removeItem(categoryKey, idx)}
                  className="my-2 font-medium text-na_red"
                >
                  - Remove
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-end px-4">
          <button
            onClick={() => addNewItem(categoryKey)}
            className="my-2 font-medium bg-yellow-400 rounded-full p-2"
          >
            <FaPlus size={16} color="#222" />
          </button>
        </div>
      </div>
    );
  };

  if (isPending) {
    return (
      <div className="flex justify-center p-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-2 md:px-4 bg-white py-4 md:py-10 my-4 rounded-xl">
      <h2 className="font-bold text-na_blue sm:text-2xl text-lg lg:px-4">
        Projects
      </h2>
      <div className="mt-5 z-[-1] lg:p-4">
        {isAllEmpty ? (
          <div className="text-center py-10 text-gray-500 flex flex-col items-center justify-center">
            <FaPlus size={48} className="mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No projects added yet</p>
            <p className="text-sm text-gray-400 mb-4">
              Start by adding your first project in any category.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => addNewItem("others")}
            >
              <FaPlus className="mr-2" /> Add First Project
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 lg:gap-10 gap-4">
            {renderCategory("books", "Books")}
            {renderCategory("articles", "Articles")}
            {renderCategory("photography", "Photography")}
            {renderCategory("films", "Films")}
            {renderCategory("exhibition", "Exhibition")}
            {renderCategory("others", "Others")}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-y-2 sm:flex-row justify-between lg:px-4">
        <Button
          variant="primary"
          size="lg"
          className="ml-auto"
          onClick={updateUserProjectsData}
          disabled={updateProjectMutation.isPending}
          loading={updateProjectMutation.isPending}
        >
          {updateProjectMutation.isPending ? <Loader /> : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default ProjectsForm;
