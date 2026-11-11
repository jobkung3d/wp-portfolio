"use client";

import { useEffect, useRef, useState } from "react";
import { Code2 } from "lucide-react";
import { distributeTechnologies } from "../data/content";

function TechnologyRow({
  items,
  index,
}: {
  items: readonly string[];
  index: number;
}) {
  const row = useRef<HTMLDivElement>(null);
  const badgeSet = useRef<HTMLDivElement>(null);
  const [repetitions, setRepetitions] = useState(1);

  useEffect(() => {
    const measure = () => {
      const width = badgeSet.current?.getBoundingClientRect().width ?? 0;
      const viewport = row.current?.clientWidth ?? 0;
      if (width > 0) setRepetitions(Math.max(1, Math.ceil(viewport / width)));
    };
    const observer = new ResizeObserver(measure);
    if (row.current) observer.observe(row.current);
    if (badgeSet.current) observer.observe(badgeSet.current);
    measure();
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="technology-row" ref={row} data-row={index + 1}>
      <div className="technology-track">
        {[0, 1].map((copy) => (
          <div
            className="technology-sequence"
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
          >
            {Array.from({ length: repetitions }, (_, repeat) => (
              <div
                className="stack-tags technology-set"
                key={repeat}
                ref={copy === 0 && repeat === 0 ? badgeSet : undefined}
                aria-hidden={repeat > 0 ? true : undefined}
              >
                {items.map((technology, i) => (
                  <span key={technology}>
                    <Code2
                      size={14}
                      style={{
                        color: ["#c8e998", "#91b8fb", "#e7aa7c"][i % 3],
                      }}
                    />
                    {technology}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechnologyMarquee({
  items,
  paused,
  label,
}: {
  items: readonly string[];
  paused: boolean;
  label: string;
}) {
  const rows = distributeTechnologies(items);
  return (
    <div
      className={"technology-marquee" + (paused ? " is-paused" : "")}
      tabIndex={0}
      role="region"
      aria-label={label}
    >
      {rows.map((row, index) => (
        <TechnologyRow key={index} items={row} index={index} />
      ))}
    </div>
  );
}
