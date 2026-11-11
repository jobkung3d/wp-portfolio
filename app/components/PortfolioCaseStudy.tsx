import type { Project } from "../data/content";
import ContributionList from "./ContributionList";

// This compact presentation is used only by the portfolio's own case study.
export default function PortfolioCaseStudy({ project }: { project: Project }) {
  return (
    <>
      <h3>{project.title}</h3>
      <h4>My Role</h4>
      <p>{project.role}</p>
      <h4>Overview</h4>
      {project.overview.split("\n\n").map((paragraph) => (
        <p key={paragraph} style={{ marginBottom: 12 }}>
          {paragraph}
        </p>
      ))}
      <h4>Key Contributions</h4>
      <ContributionList contributions={project.contributions} />
      <h4>Key Features</h4>
      <ul style={{ listStyleType: "disc", paddingLeft: 20, margin: "12px 0" }}>
        {project.features?.map((feature) => (
          <li key={feature} style={{ marginBottom: 8 }}>
            <p>{feature}</p>
          </li>
        ))}
      </ul>
      <h4>Tech Stack</h4>
      <div className="project-tags">
        {project.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
      <h4>Development Tools</h4>
      <div className="project-tags">
        {project.buildTools?.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
      <h4>Outcome</h4>
      <p>{project.outcome}</p>
    </>
  );
}
