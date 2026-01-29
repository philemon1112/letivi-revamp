import { Button } from "@/components/atoms/Button";
import LoginPromptModal from "@/components/molecules/LoginPrompt";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useState } from "react";

interface UserProfile {
  profile: {
    bio: string;
  };
  id: string;
}

const Biography = ({ userData }: { userData: UserProfile }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const bio = userData?.profile?.bio || "";
  const [prompt, setPrompt] = useState("interact with this post");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const toggleReadMore = () => setIsExpanded(!isExpanded);
  const showReadMore = bio.length > 950;

  const currentUser = useCurrentUser();
  return (
    <div className="px-2 md:px-4 bg-white py-4 md:py-10 my-4 rounded-xl">
      <LoginPromptModal
        open={showLoginPrompt}
        handleModal={setShowLoginPrompt}
        prompt={prompt}
      />
      <h2 className="font-bold text-na_blue sm:text-2xl text-lg lg:px-4">
        Biography
      </h2>

      <div>
        {bio ? (
          <div>
            <p className="relative text-gray-700 leading-relaxed whitespace-pre-line p-2 md:p-4">
              <pre
                className=""
                dangerouslySetInnerHTML={{
                  __html: isExpanded ? bio : `${bio.substring(0, 950)}...`,
                }}
              ></pre>
              {showReadMore && (
                <span
                  onClick={toggleReadMore}
                  className="text-na_blue cursor-pointer font-medium ml-1"
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </span>
              )}
            </p>
            <div className="flex items-end lg:px-4">
              <Button variant="primary" size="lg" className="ml-auto">
                <a
                  onClick={(e) => {
                    if (!currentUser) {
                      e.preventDefault(); // Prevent navigation
                      setPrompt("download this user's biography");
                      setShowLoginPrompt(true);
                    }
                  }}
                  download
                  href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/bio/users/${userData?.id}/downloads?auth_user_token=${currentUser?.user_token}`}
                >
                  Download
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>

            <p className="text-sm sm:text-base">No Biography for this user</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Biography;
