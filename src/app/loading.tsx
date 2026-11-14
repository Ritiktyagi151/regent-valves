export default function Loading() {
  return (
    <main className="fixed inset-0 z-[100] grid min-h-svh place-items-center bg-ink text-white" role="status" aria-label="Loading page">
      <div className="flex flex-col items-center gap-5">
        <svg viewBox="0 0 100 100" className="h-20 w-20 text-white" fill="none" aria-hidden="true">
          <g className="valve-loader-wheel" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <circle cx="50" cy="23" r="17" />
            <circle cx="50" cy="23" r="3" fill="currentColor" />
            <path d="M50 6v14M50 26v14M33 23h14M53 23h14M38 11l9 9M53 26l9 9M62 11l-9 9M47 26l-9 9" />
          </g>
          <path d="M50 40v13m-11 0h22l6 17H33l6-17ZM7 71h27l16 13 16-13h27v16H66L50 76 34 87H7V71Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M7 79H2m96 0h-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <p className="text-[10px] font-bold uppercase tracking-[.22em] text-white/65">Loading</p>
      </div>
      <span className="sr-only">Please wait while the page loads.</span>
    </main>
  );
}
