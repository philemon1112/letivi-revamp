import { Button } from "@/components/atoms/Button";
import { sendEmailBroadcast } from "@/services/admin";
import React, { useState } from "react";
import { toast } from "sonner";

function AllUsersBroadcast() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const form = {
        filter: "all_users",
        subject: subject,
        message: message,
      };
      const { data } = await sendEmailBroadcast(form);
      toast.success("Message sent Successfully");
    } catch (error: any) {
     toast.error((error as any)?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center p-4 md:p-12 bg-white">
        <div className="mx-auto w-full max-w-lg ">
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-semibold mb-2">
                Send a Message to all users on letivi
              </h2>
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Subject
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Enter your subject"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-na_blue focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                name="message"
                placeholder="Type your message"
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-na_blue focus:shadow-md"
              />
            </div>

            <Button
              loading={loading}
              disabled={!subject || !message}
              variant="primary"
              size="lg"
              onClick={handleSendMessage}
            >
              Submit Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUsersBroadcast;
