function TrustedResources() {
  const resources = [
    {
      name: 'National Kidney Foundation',
      description: 'Patient education, kidney disease basics, and downloadable resources.',
      url: 'https://www.kidney.org/kidney-topics/patient-education-library-brochures',
    },
    {
      name: 'NIDDK / NIH',
      description: 'Government-backed kidney disease education and prevention resources.',
      url: 'https://www.niddk.nih.gov/health-information/community-health-outreach/information-clearinghouses/nkdep',
    },
    {
      name: 'American Kidney Fund',
      description: 'Kidney education, financial resources, and patient support information.',
      url: 'https://www.kidneyfund.org/',
    },
    {
      name: 'DaVita Kidney Education',
      description: 'Dialysis education, diet resources, videos, and Kidney Smart classes.',
      url: 'https://www.davita.com/education/',
    },
    {
      name: 'AAKP',
      description: 'Patient-centered brochures and education for people living with kidney disease.',
      url: 'https://aakp.org/center-for-patient-research-and-education/educational-brochures-and-resources/',
    },
  ];

  return (
    <div className="resources-page">
      <h1>Trusted Kidney Resources</h1>

      <p className="resources-intro">
        Browse trusted kidney education websites for more information. These links
        are for learning only and do not replace advice from your care team.
      </p>

      <div className="resources-grid">
        {resources.map((resource) => (
          <div className="resource-card" key={resource.name}>
            <h2>{resource.name}</h2>
            <p>{resource.description}</p>

            <a href={resource.url} target="_blank" rel="noreferrer">
              Visit Resource →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrustedResources;