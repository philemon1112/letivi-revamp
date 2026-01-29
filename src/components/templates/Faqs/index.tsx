import React from "react";
import BaseTemplate from "../BaseTemplate";
import Accordion from "@/components/molecules/Accordion";

function Faqs() {
  const faqsArray = [
    {
      question: "What is Letivi ?",
      answer: `Letivi houses high-resolution photos and videos, as well as biographies of thought leaders.
          On Letivi, you can create a personal account and upload your high-resolution headshots, CV, videos, 
          links, bios, and also link all your social accounts, online articles, and research work. You can share 
          the link to your Letivi profile with anyone who needs access to your data for publication or other 
          professional purposes. Additionally, you can create a workspace account for your business/project/event 
          and upload high-resolution photo and videos, write about your workspace, add teammates, and create press 
          releases with high-resolution photos, videos, and logos.
          `,
    },
    {
      question: "Is Letivi for me?",
      answer: `Yes! Letivi is for everyone! Letivi is open to professionals in all sectors, heads of institutions, 
          governments, education and sports, and individuals who are always in the news for the role they play in their 
          communities and are experts in fields such as Science, Technology, Engineering, and Mathematics. It is also 
          for people working in the creative industries and fields such as digital and traditional media, including 
          bloggers, filmmakers, publishers, production houses, TV stations, newspapers, event organisers, advertising 
          agencies, and anyone looking for high-resolution photos and videos.`,
    },
    {
      question: "How Can I own an account?",
      answer: `<p> Sign up with a valid email address and fill out a form, which will generate a token. </p>
          <p> The token will be shared via the provided email, and you will need to approve it.</p>
          <p> You will be redirected to the login window. </p>
          <p> Finish by setting up a profile, bio, and uploading high resolution photos and videos. </p>`,
    },
    // {
    //   question: "Why didn’t I get a token?",
    //   answer: `If you signed up with Gmail or Apple ID, you would not receive a token. You will be redirected to the platform to enter your full name, profession, and industry then you can proceed to set up your profile, bio and high resolution images.`,
    // },
    {
      question:
        "Do I need to pay to access the app on play store or app store?",
      answer: `No, it is a free download, requiring only internet connectivity.      `,
    },
    {
      question:
        "How long does it take for my account to be active after registering??",
      answer: `Account activation is instant upon registration`,
    },
    {
      question: "Can I have more than one account?",
      answer: `No, you cannot have two personal accounts. However, you can have workspaces and 
                  create as many workspaces as needed for businesses, events, or projects.`,
    },
    {
      question: "Can I use the same email to open two accounts?",
      answer: `No, this is not possible.`,
    },
    {
      question: `Why can’t publications and content creators use my images from my Social media
          (Instagram, Facebook, twitter, LinkedIn, Instagram, Snapchat, TikTok, WhatsApp or website)?`,
      answer: `When high resolution photos or videos are posted on social media, their quality reduces and does not meet the standards required by publications, content creators, and high-definition media platforms.`,
    },
    {
      question:
        "Why can’t I use my bio and profile picture from my company website?",
      answer: `Your company website may only have one image of you, which could also be a low-quality image and not very useful for publications.      `,
    },
    {
      question: "How do I get my high resolution images onto Letivi?",
      answer: `It's simple. Just sign up, upload your bio, and your high-resolution photos and videos`,
    },
    {
      question:
        "Do I need to pay to put my high resolution images on the platform?",
      answer: `No, it is free to upload your high-resolution photos and videos.`,
    },
    {
      question: "What kind of high resolution images can I upload?",
      answer: `Your image is your brand. Upload high-resolution photos and videos 
          for the best experience. You may upload portraits (headshots), outdoor shots, 
          business looks, seated positions from head to knee, full-body photos, or casual 
          business photos. You can also include short action video clips of you at work or 
          on the job. Choose photos that represent your brand. You can also upload high-resolution 
          videos and photos to your business, event, or project accounts.`,
    },
    {
      question:
        "Can I upload high resolution photos and videos with watermarks?",
      answer: `Yes, you can. However, ensure that the watermark does not obstruct your high-resolution photo or video in any way, as it is part of your brand.
          `,
    },
    {
      question: "How many high resolution images can I upload?",
      answer: `For now, you can upload as many high-resolution photos and videos as you want
          `,
    },
    {
      question: "What qualifies as a high resolution image to upload?",
      answer: `For high resolution photos, the minimum size should be 2000 pixels, with a resolution of 72 dpi and above. For high resolution videos, 
          the minimum size should be 1920 x 1080p, with a bitrate of 7000 kbps and above. However, the Letivi platform allows only the upload of photos 
          and videos that meet these requirements, making it easier for users who may not be familiar with these dimensions.
          `,
    },
    // {
    //   question: "Is there a premium user?",
    //   answer: `Yes, there is!.
    //   `,
    // },
    // {
    //   question: "How do I become a premium user?",
    //   answer: `You can become a premium member by continuously sharing the link to your page on Letivi and recommending more people to sign up. Alternatively, you become a premium user when your high resolution images are downloaded frequently and reach a certain quota?.
    //   `,
    // },
    // {
    //   question: "What are the perks of being a premium user?",
    //   answer: `As a premium user, you get data analytics on the number of people who have downloaded your high resolution images, giving your personal project visibility on the platform whenever needed.
    //   `,
    // },
    {
      question: "What is the maximum length of my bio?",
      answer: `There is no limit to your full bio, but try to keep it concise yet detailed.
          `,
    },
    {
      question: "Can I add my social media links to my profile?",
      answer: `Yes, we would love it if you did. You can also add links to your articles or publications, such as Google Scholar links if available.
          `,
    },
    {
      question: "Can I change my high-resolution photo and video images?",
      answer: `Yes, you can change them whenever you wish.
          `,
    },
    {
      question:
        "Who owns the licenses for my high-resolution photos and videos?",
      answer: `You are the only one who owns the rights to anything you upload. By uploading images onto Letivi, you consent to the use of your high-resolution photos and videos for informational purposes and storytelling. However, commercial advertising use of your high-resolution photos and videos without your approval is not allowed.
          `,
    },
    {
      question: `Am I required to submit information on the Photographer, videographer,
          Makeup Artist, and so on for the image?`,
      answer: `Yes, we strongly encourage you to provide that information to support creative talents. However, you are the only one who owns the rights to the high-resolution photos and videos you upload.
          `,
    },
    {
      question: "Is Letivi a social media platform?",
      answer: `No, Letivi is not a social media platform. It is a resource platform created to provide access to high-resolution photos
           and videos, reducing the time people spend trying to obtain their bios and high resolution needed for publications, stories,
          news, and events. Letivi helps organisations and individuals properly document their events with high-resolution photos and videos, 
          preserving them for a lifetime and sharing them with the public. It acts as a bridge between various sectors and mainstream media outlets, 
          enabling organisations to preserve their media in high resolution for use in telling their stories.
          `,
    },
    {
      question: "How do I get high-resolution photos and videos from Letivi?",
      answer: `You only need to sign up and search for the name of the person you are looking for. You can then download the high-resolution photos and videos. If they have shared their profile link with you, it makes the process even easier.
          `,
    },
    {
      question:
        "Do I need to pay to use the high-resolution photos and videos on Letivi?",
      answer: `No, you can access high-resolution photos and videos in different categories on the Letivi platform for non-commercial use at no cost. However, commercial use of high-resolution photos and videos requires approval from the owner of the content on the Letivi platform.
          `,
    },
    {
      question:
        "Can an organisation/institution upload high resolution images?",
      answer: `Yes, organisations/institutions can upload high-resolution photos and videos to their workspaces (business, events, projects) or for product launches and write-ups. They can then share the profile link with media houses, bloggers, and journalists.
          `,
    },
    {
      question: "Who owns the high-resolution photos and videos?",
      answer: `The people who uploaded them own the high-resolution photos and videos. They cannot be used for advertising and commercial purposes without the owners' consent.
          `,
    },
    {
      question: "At what point does my account expire or go dormant?",
      answer: `Accounts go dormant after six months of inactivity, which includes no uploads of high-resolution photos and videos, no logins, no interactions, or downloads.
          `,
    },
    {
      question: "What can I upload on Letivi?",
      answer: `
            <ol>
                      <li> 1.high resolution  photos & videos</li>
                      <li> 2.Logos</li>
                      <li> 3.CVs</li>
                      <li> 4.Personal/Professional profile </li>
                      <li> 5.Articles </li>
                      <li> 6.Links to published articles </li>
            </ul>
          `,
    },
    {
      question: "What else can I do on Letivi?",
      answer: `
           <p> 
            <strong>Share: </strong> 
            You can share your profile with anyone outside of the platform via email, social media, WhatsApp, or by copying the link.
           </p>
           <br />
           <p> 
            <strong>Invite: </strong> 
             You can invite family and friends to join the platform via email, social media, WhatsApp, or by copying the link.
           </p>
           <br />
           <p> 
            <strong>Interact: </strong> 
            You can react to high-resolution photos and videos on your feed by making comments, liking, clapping, loving, downloading, and sharing via email, social media, WhatsApp, or by copying the link.
           </p>
           <br />
           <p> 
            <strong>Search: </strong> 
            You can search for photos and videos using categories such as nature, lifestyle, culture, and animals. You can also search for professionals using filters such as name, profession, country, and industry. Additionally, you can search for workspaces using filters like name, industry, country, business, event, and project.
           </p>
           <br />
           <p> 
            <strong>Privacy: </strong> 
            You have the option to make your account public or private. When your account is private, it will not be visible in people searches, and your high-resolution photos and videos will not be visible in searches. You can only be found when you share your profile link with someone. As a private user, you will only see your own posts/uploads on your personal feed.
           </p>
           <br />
           <p> 
            <strong>Download tracking: </strong> 
            You can see who downloaded your media (photos, videos, and bio). It shows the actual file and the number of times it was downloaded, along with the date and time.
           </p>
          <br />
           <p> 
            <strong> Album creation: </strong> 
            You can create albums for your high-resolution photos and videos to organize your gallery. This feature also applies to workspaces (business, project, and event). You can make an album private, which means the album and the photos/videos in it will no longer be visible to other users.
           </p>
          `,
    },
    {
      question: "Can Letivi generate a bio for me?",
      answer: `Yes, Letivi can generate a bio for you. You can upload your CV, and Letivi will use the information from your CV or a form you fill out with personal and professional information to generate three bio samples for you to choose from. This service has a fee of $5 or the equivalent in your local currency.
    
          `,
    },
    {
      question:
        "Can photographers use Letivi to share photos or videos with their clients?",
      answer: `Yes, photographers and videographers can use Letivi to send their work to clients. They can send photos and videos through Letivi messaging, 
          whether or not the client is a user of Letivi. When the clients receive the message, they can sign up if they are not already users and add the high-resolution photos and videos to their gallery or download them.
          `,
    },
    {
      question: "How do I deactivate my account?",
      answer: `To deactivate your account, go to the account settings and choose the deactivate option.
          `,
    },
  ];
  return (
    <BaseTemplate>
      <div className="bg-gray-100 na_bg2  bg-fixed about min-h-screen flex justify-center items-center py-10  lg:p-[115px] ">
        <div className="bg-white bg-opacity-80 rounded-[20px] p-6 max-w-[1400px]">
          <div className="bg-white text-center rounded-[20px] p-8 lg:p-[50px] flex flex-col">
            <h1 className="lg:text-4xl text-2xl text-center font-semibold  my-10">
              FAQ’s
            </h1>
            <div className="space-y-8">
              {faqsArray.map((faq, index) => {
                return <Accordion key={index} faq={faq} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </BaseTemplate>
  );
}

export default Faqs;
