"use client";

import { FormEvent, useMemo, useState } from "react";
import FormStatus from "@/components/FormStatus";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function AdmissionsApplicationForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  const [certificateFiles, setCertificateFiles] = useState<FileList | null>(null);
  const [idFiles, setIdFiles] = useState<FileList | null>(null);
  const [photoFiles, setPhotoFiles] = useState<FileList | null>(null);

  const certificateNames = useMemo(
    () => (certificateFiles ? Array.from(certificateFiles).map((f) => f.name) : []),
    [certificateFiles]
  );
  const idNames = useMemo(
    () => (idFiles ? Array.from(idFiles).map((f) => f.name) : []),
    [idFiles]
  );
  const photoNames = useMemo(
    () => (photoFiles ? Array.from(photoFiles).map((f) => f.name) : []),
    [photoFiles]
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message || "Could not submit application.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Application submitted successfully.");
      form.reset();
      setCertificateFiles(null);
      setIdFiles(null);
      setPhotoFiles(null);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="full_name" className="block text-sm text-gray-400 mb-2">Full Name *</label>
          <input id="full_name" type="text" name="full_name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email Address *</label>
          <input id="email" type="email" name="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-gray-400 mb-2">Phone Number *</label>
          <input id="phone" type="tel" name="phone" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="date_of_birth" className="block text-sm text-gray-400 mb-2">Date of Birth *</label>
          <input id="date_of_birth" type="date" name="date_of_birth" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div>
        <label htmlFor="program" className="block text-sm text-gray-400 mb-2">Program of Interest *</label>
        <select id="program" name="program" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500">
          <option value="">Select a program</option>
          <optgroup label="Business & Management">
            <option>Business Administration</option>
            <option>Accounting & Finance</option>
            <option>Marketing & Sales</option>
            <option>Project Management</option>
          </optgroup>
          <optgroup label="Information Technology">
            <option>Software Development</option>
            <option>Web Design & Development</option>
            <option>Cybersecurity</option>
            <option>Data Science & Analytics</option>
          </optgroup>
          <optgroup label="Creative Arts & Media">
            <option>Graphic Design</option>
            <option>Photography & Videography</option>
            <option>Digital Marketing</option>
            <option>Fashion Design</option>
          </optgroup>
          <optgroup label="Vocational Training">
            <option>Electrical Engineering</option>
            <option>Plumbing & Pipefitting</option>
            <option>Carpentry & Joinery</option>
            <option>Automotive Technology</option>
          </optgroup>
        </select>
      </div>

      <div>
        <label htmlFor="study_mode" className="block text-sm text-gray-400 mb-2">Preferred Study Mode *</label>
        <select id="study_mode" name="study_mode" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500">
          <option value="">Select mode</option>
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Online</option>
        </select>
      </div>

      <div>
        <label htmlFor="previous_qualification" className="block text-sm text-gray-400 mb-2">Previous Qualification</label>
        <input id="previous_qualification" type="text" name="previous_qualification" placeholder="e.g. WASSCE, HND, Diploma..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500" />
      </div>

      <div>
        <label htmlFor="additional_info" className="block text-sm text-gray-400 mb-2">Additional Information</label>
        <textarea id="additional_info" rows={4} name="additional_info" placeholder="Tell us about yourself or any questions..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500" />
      </div>

      <div className="rounded-xl border border-white/10 p-5 space-y-5">
        <h3 className="text-white font-semibold">Document Uploads (Storage-Ready)</h3>
        <p className="text-xs text-gray-400">
          Files selected here upload directly to secure cloud storage during submission.
          You can still add external links if needed.
        </p>

        <div>
          <label htmlFor="certificate_files" className="block text-sm text-gray-400 mb-2">Certificates (BECE/WASSCE/etc.)</label>
          <input
            id="certificate_files"
            type="file"
            name="certificate_files"
            multiple
            onChange={(e) => setCertificateFiles(e.target.files)}
            className="w-full text-sm text-gray-300 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white"
          />
          {certificateNames.length > 0 ? (
            <p className="text-xs text-gray-400 mt-2">Selected: {certificateNames.join(", ")}</p>
          ) : null}
          <input
            id="certificate_links"
            type="text"
            name="certificate_links"
            placeholder="Paste certificate file links (comma-separated)"
            className="mt-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="id_files" className="block text-sm text-gray-400 mb-2">National ID Documents</label>
          <input
            id="id_files"
            type="file"
            name="id_files"
            multiple
            onChange={(e) => setIdFiles(e.target.files)}
            className="w-full text-sm text-gray-300 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white"
          />
          {idNames.length > 0 ? (
            <p className="text-xs text-gray-400 mt-2">Selected: {idNames.join(", ")}</p>
          ) : null}
          <input
            id="id_links"
            type="text"
            name="id_links"
            placeholder="Paste ID file links (comma-separated)"
            className="mt-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="photo_files" className="block text-sm text-gray-400 mb-2">Passport Photo(s)</label>
          <input
            id="photo_files"
            type="file"
            name="photo_files"
            multiple
            accept="image/*"
            onChange={(e) => setPhotoFiles(e.target.files)}
            className="w-full text-sm text-gray-300 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white"
          />
          {photoNames.length > 0 ? (
            <p className="text-xs text-gray-400 mt-2">Selected: {photoNames.join(", ")}</p>
          ) : null}
          <input
            id="photo_links"
            type="text"
            name="photo_links"
            placeholder="Paste photo file links (comma-separated)"
            className="mt-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <FormStatus status={status} message={message} />

      <button
        type="submit"
        disabled={status === "loading"}
        className={`w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg ${
          status === "loading" ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {status === "loading" ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
