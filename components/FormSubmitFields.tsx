"use client";

import { useEffect, useRef } from "react";

type Props = {
  subject: string;
};

export function FormSubmitFields({ subject }: Props) {
  const nextRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nextRef.current) {
      nextRef.current.value = new URL("/thank-you", window.location.origin).href;
    }
    if (pageRef.current) {
      pageRef.current.value = window.location.href;
    }
  }, []);

  return (
    <>
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input ref={nextRef} type="hidden" name="_next" defaultValue="" />
      <input ref={pageRef} type="hidden" name="Page" defaultValue="" />
      <input
        type="text"
        name="_honey"
        className="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
    </>
  );
}
