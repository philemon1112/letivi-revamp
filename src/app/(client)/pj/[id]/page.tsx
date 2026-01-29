import { Metadata } from "next";
import { getSharedProjectProfile } from "@/services/shared";
import { getApiMedia } from "@/utils/getApiMedia";
import SharedProjectDetails from "@/components/templates/SharedProject";

interface ParamsType {
  params: Promise<{
    id: string;
  }>;
}

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const { id } = await params;
  try {
    // Fetch project details server-side for metadata
    const projectData = await getSharedProjectProfile(id);
    const project = projectData?.data;

    // Get the first project's image URL if available
    const firstbusinessImage =
      getApiMedia(project?.project_profile?.logo) || "/assets/img/Album01.png";

    return {
      title: `${project?.name || "project"} | Letivi`,
      description: `${project?.description}`,
      openGraph: {
        title: `${project?.name || "project"} | Letivi`,
        description: `${project?.description || ""}`,
        images: [
          {
            url: getApiMedia(project?.business_profile?.logo),
            width: 1200,
            height: 630,
            alt: project?.name || "User Projects",
          },
        ],
        type: "website",
        siteName: "Letivi",
      },
      twitter: {
        card: "summary_large_image",
        title: `${project?.name || "project"} | Letivi`,
        description: `${project?.description || ""}`,
        images: [firstbusinessImage],
        creator: "@letivi",
      },
      alternates: {
        canonical: `${project.profile}`,
      },
    };
  } catch (error) {
    console.log("Error fetching project details:", error);
    // Fallback metadata if fetch fails
    return {
      title: `Project| Letivi`,
      description:
        "View Project on Letivi - High Resolution Stock Photos and Videos",
    };
  }
}

const ProjectDetailsPage = async ({ params }: ParamsType) => {
  const { id } = await params;
  const projectData = await getSharedProjectProfile(id);

  if (!projectData) {
    return <div className="text-black">project not found</div>;
  }

  return (
      <SharedProjectDetails name={id} />
  );
};

export default ProjectDetailsPage;
