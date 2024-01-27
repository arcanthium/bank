"use client";

import { AppConstants } from "@/app/constants/app-constants";
import { NewAnnouncementForm } from "../../form";
import { useEffect, useState } from "react";
import { GET } from "@/app/utils/http-client";
import { useParams } from "next/navigation";

async function getAnnouncement(id: string) {
  const response = await fetch(`${AppConstants.BACKEND_URL}/announcements/${id}`, {
    method: "GET",
  });
  return response.json();
}

export default function EditAnnouncementPage() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState<any | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async (id: string | number) => {
      const response = await GET(`/announcements/${id}`);
      const announcementData = await response.json();

      setAnnouncement(announcementData);
    };

    if (!announcement) {
      fetchAnnouncement(id as string);
    }
  }, [announcement, id]);

  if (!announcement) {
    return <>Loading...</>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>Edit Announcement</h1>
      <NewAnnouncementForm
        title={announcement.title}
        description={announcement.description}
        action="edit"
        id={announcement.id}
      />
    </div>
  );
}
