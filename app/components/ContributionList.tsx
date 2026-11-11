export default function ContributionList({
  contributions,
}: {
  contributions: readonly string[];
}) {
  return (
    <ul
      aria-label="Key Contributions"
      style={{ listStyleType: "disc", paddingLeft: 20, margin: "12px 0" }}
    >
      {contributions.map((contribution) => (
        <li key={contribution} style={{ marginBottom: 8 }}>
          <p>{contribution}</p>
        </li>
      ))}
    </ul>
  );
}
