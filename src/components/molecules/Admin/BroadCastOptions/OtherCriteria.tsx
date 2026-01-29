"use client";

import { Button } from "@/components/atoms/Button";
import { sendEmailBroadcast } from "@/services/admin";
import { Countries, Professions } from "@/utils/constants";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

type CriteriaType = "country" | "professions";

interface FormData {
  filter: CriteriaType;
  subject: string;
  message: string;
  meta: {
    countries?: string[];
    professions?: string[];
  };
}

function OtherCriteria() {
  const [formState, setFormState] = useState({
    type: "country" as CriteriaType,
    subject: "",
    message: "",
    searchParam: "",
    selected: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const dataSource = formState.type === "country" ? Countries : Professions;
  const searchResults = formState.searchParam
    ? dataSource.filter((item) =>
        item.toLowerCase().includes(formState.searchParam.toLowerCase())
      )
    : [];

  const handleSelect = (item: string) => {
    if (!formState.selected.includes(item)) {
      setFormState((prev) => ({
        ...prev,
        selected: [...prev.selected, item],
      }));
    }
  };

  const handleRemove = (item: string) => {
    setFormState((prev) => ({
      ...prev,
      selected: prev.selected.filter((i) => i !== item),
    }));
  };

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const form: FormData = {
        filter: formState.type,
        subject: formState.subject,
        message: formState.message,
        meta: {
          [formState.type === "country" ? "countries" : "professions"]:
            formState.selected,
        },
      };
      await sendEmailBroadcast(form);
      toast.success("Message sent Successfully");
    } catch (error: any) {
      toast.error(
        (error as any)?.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-6 bg-white text-gray-900">
      <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2">
        <div className="py-6 md:py-0 md:px-6">
          <h1 className="text-lg md:text-2xl font-bold">
            Search {formState.type}
          </h1>
          <h1 className="mb-2 lg:text-base">
            Search a {formState.type} to add to the email broadcast list
          </h1>

          <input
            className="input mt-4"
            value={formState.searchParam}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, searchParam: e.target.value }))
            }
          />

          <div className="flex flex-wrap mt-2">
            {searchResults.map((item, index) => (
              <span
                key={index}
                className="bg-gray-200 p-1 m-1 rounded cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                {item}
              </span>
            ))}
          </div>

          {formState.selected.length > 0 && (
            <div className="border mt-2">
              <ul className="space-x-1 flex gap-y-2 flex-wrap p-2">
                {formState.selected.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-1 text-xs flex items-center bg-na_blue rounded-lg text-white"
                  >
                    <p>{item}</p>
                    <img
                      onClick={() => handleRemove(item)}
                      src="/assets/Svg/cancel.svg"
                      alt=""
                      className="ml-1 h-5 w-5 cursor-pointer"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mx-auto w-full max-w-lg">
          <div className="mb-5">
            <h2 className="text-xl font-semibold mb-2">
              Send a Message to Selected{" "}
              {formState.type === "country" ? "Countries" : "Professionals"} on
              letivi
            </h2>
            <select
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  type: e.target.value as CriteriaType,
                  selected: [],
                  searchParam: "",
                }))
              }
              className="w-full rounded-md border mb-3 border-[#e0e0e0] bg-white py-3 px-6"
            >
              <option value="">-- Select --</option>
              <option value="country">Country</option>
              <option value="professions">Professions</option>
            </select>

            <input
              value={formState.subject}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, subject: e.target.value }))
              }
              placeholder="Enter your subject"
              className="w-full rounded-md border mb-3 border-[#e0e0e0] bg-white py-3 px-6"
            />

            <textarea
              value={formState.message}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, message: e.target.value }))
              }
              rows={4}
              placeholder="Type your message"
              className="w-full resize-none rounded-md border mb-3 border-[#e0e0e0] bg-white py-3 px-6"
            />

            <Button
              loading={loading}
              disabled={!formState.subject || !formState.message}
              variant="primary"
              size="lg"
              onClick={handleSendMessage}
            >
              Submit Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OtherCriteria;
