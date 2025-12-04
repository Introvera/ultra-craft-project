"use client";

import React, { useState } from "react";

const CARDS_PER_PAGE = 4;

type Step = {
  number: number;
  title: string;
  text: string;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Client\nConsultation",
    text: "Understanding your needs, lifestyle, and project goals.",
  },
  {
    number: 2,
    title: "Concept &\nMoodboard",
    text: "Creating visual direction through colors, materials, and inspiration.",
  },
  {
    number: 3,
    title: "Design\nDevelopment",
    text: "Finalizing furniture layouts, spatial planning, and detailing.",
  },
  {
    number: 4,
    title: "Material\nSelection",
    text: "Finalizing furniture layouts, spatial planning, and detailing.",
  },
  // sample extra cards (duplicate last two)
  {
    number: 5,
    title: "Design\nDevelopment",
    text: "Finalizing furniture layouts, spatial planning, and detailing.",
  },
  {
    number: 6,
    title: "Material\nSelection",
    text: "Finalizing furniture layouts, spatial planning, and detailing.",
  },
];

function chunkSteps(arr: Step[], size: number): Step[][] {
  const chunks: Step[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function HowWeWork() {
  const pages = chunkSteps(steps, CARDS_PER_PAGE);
  const pageCount = pages.length;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1));
  };

  return (
    <section
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "36px 68px 68px 68px",
        background: "rgba(212, 184, 150, 0.13)",
      }}
    >
      <div style={{ maxWidth: "1440px", width: "100%" }}>
        {/* Header */}
        <h2
          style={{
            width: "442px",
            color: "#604D37",
            fontFamily: "Poppins",
            fontSize: "32px",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          How We Work
        </h2>

        <p
          style={{
            width: "422px",
            color: "#0A0A0A",
            fontFamily: "Poppins",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          Every project follows a clear, collaborative process designed to keep
          you informed, involved, and confident from the first conversation to
          the final installation.
        </p>

        {/* Carousel */}
        <div style={{ marginTop: "72px", overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              width: `${pageCount * 100}%`,
              transform: `translateX(-${currentPage * 100}%)`,
              transition: "transform 0.4s ease",
            }}
          >
            {pages.map((page: Step[], pageIndex) => (
              <div key={pageIndex} style={{ flex: "0 0 100%" }}>
                {/* Number row */}
                <div
                  style={{
                    display: "flex",
                    gap: "40px",
                    marginBottom: "24px",
                  }}
                >
                  {page.map((step: Step) => (
                    <div
                      key={step.number}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "302px",
                      }}
                    >
                      {/* Badge */}
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "999px",
                          backgroundColor: "#000000",
                          color: "#FAFAFA",
                          fontFamily: "Inter",
                          fontSize: "16px",
                          fontWeight: 600,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "12px",
                        }}
                      >
                        {step.number}
                      </div>

                      {/* Line */}
                      <div
                        style={{
                          width: "254px",
                          height: "2px",
                          background: "#B3B3B3",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Card row */}
                <div style={{ display: "flex", gap: "40px" }}>
                  {page.map((step: Step) => (
                    <div
                      key={`card-${step.number}`}
                      style={{
                        width: "302px",
                        minHeight: "192px",
                        background: "#FFFFFF",
                        borderRadius: "24px",
                        padding: "24px",
                        boxShadow: "0 18px 45px rgba(0,0,0,0.06)",
                      }}
                    >
                      <h3
                        style={{
                          whiteSpace: "pre-line",
                          fontFamily: "Poppins",
                          fontSize: "24px",
                          fontWeight: 600,
                          marginBottom: "16px",
                          color: "#000000",
                        }}
                      >
                        {step.title}
                      </h3>

                      <p
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#000000",
                        }}
                      >
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {Array.from({ length: pageCount }).map((_, index) =>
              index === currentPage ? (
                <div
                  key={index}
                  style={{
                    width: "24px",
                    height: "10px",
                    borderRadius: "999px",
                    background: "#92806A",
                  }}
                />
              ) : (
                <div
                  key={index}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "rgba(146,128,106,0.4)",
                  }}
                />
              )
            )}
          </div>

          {/* Arrows */}
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            {/* Prev button */}
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              style={{
                display: "flex",
                width: "36px",
                height: "36px",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                aspectRatio: "1/1",
                borderRadius: "999px",
                border: "1px solid #604D37",
                background: "#0A0A0A",
                opacity: currentPage === 0 ? 0.4 : 1,
                cursor: currentPage === 0 ? "default" : "pointer",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12.01"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12.71 6.28982C12.8037 6.38278 12.8781 6.49338 12.9289 6.61524C12.9797 6.7371 13.0058 6.8678 13.0058 6.99981C13.0058 7.13183 12.9797 7.26253 12.9289 7.38439C12.8781 7.50625 12.8037 7.61685 12.71 7.70981L9.41 10.9998L17 10.9998C17.2652 10.9998 17.5196 11.1052 17.7071 11.2927C17.8946 11.4802 18 11.7346 18 11.9998C18 12.265 17.8946 12.5194 17.7071 12.7069C17.5196 12.8945 17.2652 12.9998 17 12.9998L9.41 12.9998L12.71 16.2898C12.8983 16.4781 13.0041 16.7335 13.0041 16.9998C13.0041 17.2661 12.8983 17.5215 12.71 17.7098C12.5217 17.8981 12.2663 18.0039 12 18.0039C11.7337 18.0039 11.4783 17.8981 11.29 17.7098L6.29 12.7098C6.19896 12.6147 6.12759 12.5026 6.08 12.3798C6.02709 12.2601 5.99977 12.1307 5.99977 11.9998C5.99977 11.8689 6.02709 11.7395 6.08 11.6198C6.12759 11.4971 6.19896 11.3849 6.29 11.2898L11.29 6.28982C11.383 6.19609 11.4936 6.12169 11.6154 6.07092C11.7373 6.02015 11.868 5.99402 12 5.99402C12.132 5.99402 12.2627 6.02015 12.3846 6.07092C12.5064 6.12169 12.617 6.19609 12.71 6.28982Z"
                  fill="#FAFAFA"
                />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={handleNext}
              disabled={currentPage === pageCount - 1}
              style={{
                display: "flex",
                width: "36px",
                height: "36px",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                aspectRatio: "1/1",
                borderRadius: "999px",
                border: "1px solid #604D37",
                background: "#0A0A0A",
                opacity: currentPage === pageCount - 1 ? 0.4 : 1,
                cursor:
                  currentPage === pageCount - 1 ? "default" : "pointer",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12.01"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.29 6.28982C11.1963 6.38278 11.1219 6.49338 11.0711 6.61524C11.0203 6.7371 10.9942 6.8678 10.9942 6.99981C10.9942 7.13183 11.0203 7.26253 11.0711 7.38439C11.1219 7.50625 11.1963 7.61685 11.29 7.70981L14.59 10.9998L7 10.9998C6.73478 10.9998 6.48043 11.1052 6.29289 11.2927C6.10536 11.4802 6 11.7346 6 11.9998C6 12.265 6.10536 12.5194 6.29289 12.7069C6.48043 12.8945 6.73478 12.9998 7 12.9998L14.59 12.9998L11.29 16.2898C11.1017 16.4781 10.9959 16.7335 10.9959 16.9998C10.9959 17.2661 11.1017 17.5215 11.29 17.7098C11.4783 17.8981 11.7337 18.0039 12 18.0039C12.2663 18.0039 12.5217 17.8981 12.71 17.7098L17.71 12.7098C17.801 12.6147 17.8724 12.5026 17.92 12.3798C17.9729 12.2601 18.0002 12.1307 18.0002 11.9998C18.0002 11.8689 17.9729 11.7395 17.92 11.6198C17.8724 11.4971 17.801 11.3849 17.71 11.2898L12.71 6.28982C12.617 6.19609 12.5064 6.12169 12.3846 6.07092C12.2627 6.02015 12.132 5.99402 12 5.99402C11.868 5.99402 11.7373 6.02015 11.6154 6.07092C11.4936 6.12169 11.383 6.19609 11.29 6.28982Z"
                  fill="#FAFAFA"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
